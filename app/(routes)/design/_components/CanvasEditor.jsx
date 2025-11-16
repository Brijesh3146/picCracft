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
        console.log("designInfo",DesignInfo);
        if(canvasRef.current && DesignInfo)
        {
            const initCanvas=new Canvas(canvasRef.current,{
                width:DesignInfo?.width/2,
                height:DesignInfo?.height/2,
                backgroundColor:'#fff',
                preserveObjectStacking:true
            })

           // set High Resolution Canvas
           const scaleFactor= window.devicePixelRatio || 1;
           initCanvas.set({
            width:DesignInfo?.width * scaleFactor,
            height:DesignInfo?.height * scaleFactor,
            zoom: 1 / scaleFactor
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
            return () => {
                initCanvas.dispose();
            }
        }
        }, [DesignInfo])

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
