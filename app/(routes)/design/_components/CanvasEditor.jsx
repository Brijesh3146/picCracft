import React, {useEffect, useRef, useState} from 'react';
import { Canvas } from 'fabric';
import { useCanvasHook } from '../[designId]/page';
import TopNavBar from '@/services/Components/TopNavBar';

function CanvasEditor({ DesignInfo }) {
    const canvasRef=useRef();
    const [canvas, setCanvas]=useState(null);
    const {canvasEditor, setCanvasEditor}=useCanvasHook();
    /**
     * Used to Init the Canvas with default width and height
     */
     
    useEffect(()=>{
        if (!DesignInfo || !canvasRef.current) return;
        if (!DesignInfo.width || !DesignInfo.height) return;
        console.log("designInfo",DesignInfo);
        
        const initCanvas=new Canvas(canvasRef.current,{
            width:Number(DesignInfo.width),
            height:Number(DesignInfo.height),
            backgroundColor:'#fff',
            preserveObjectStacking:true
        })

       if(DesignInfo?.jsonTemplate)
       {
        initCanvas.loadFromJSON(DesignInfo?.jsonTemplate, ()=>{
          initCanvas?.requestRenderAll();
        })
       }
        initCanvas.renderAll();
        setCanvas(initCanvas)
        setCanvasEditor(initCanvas);
        console.log('Canvas created:', initCanvas.getWidth(), initCanvas.getHeight());

        return () => {
            initCanvas.dispose();
        }
    }, [DesignInfo?.width, DesignInfo?.height, DesignInfo?.jsonTemplate])

        /**
         * Used to Delete the selected Element/Object
         */
        useEffect(() => {
            const handleKeyDown=(event)=>{

    if (!canvasEditor) return;

    const activeObject = canvasEditor.getActiveObject();

    //  Allow typing inside text if editing
    if (activeObject && activeObject.type === 'i-text' && activeObject.isEditing) {
      return;
    }

    //  Delete object only if not editing
    if (event.key === 'Backspace') {
      if (activeObject) {
        canvasEditor.remove(activeObject);
        canvasEditor.renderAll();
      }
    }
  };
            document.addEventListener('keydown', handleKeyDown);

            return ()=>{
                document.removeEventListener('keydown', handleKeyDown)
            }
        }, [canvasEditor])
  return (
    <div className='bg-secondary w-full h-screen'>
        <TopNavBar/>

    <div className=' flex mt-10 items-center justify-center flex-col relatives'>
        <canvas id='canvas' ref={canvasRef} />
    </div>
    </div>
  )
}

export default CanvasEditor
