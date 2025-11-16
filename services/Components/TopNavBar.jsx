import React, { useEffect } from 'react';
import { useState } from 'react';
import ShapesSetting from '../Sharable/ShapesSetting'
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'

import TextSettingsNavbar from './TextSettingsNavbar';

function TopNavBar() {
    const {canvasEditor}=useCanvasHook();
    const [showShapeSettings, setShowShapeSettings]=useState(false);
    const [enableTextsettings, setEnableTextSettings]=useState(false);

    useEffect(() => {
        if(canvasEditor){
            const activeObject=canvasEditor.getActiveObject();
            console.log(activeObject, canvasEditor);
        }
    }, [canvasEditor])

    if(canvasEditor){
        canvasEditor.on('selection:created', function(e){
            const activeObject=canvasEditor.getActiveObject();
            if(!activeObject.text){
                setShowShapeSettings(true);
                setEnableTextSettings(false);
            }
            if(activeObject.text){
                setEnableTextSettings(true);
                setShowShapeSettings(false);
            }
            
        } )

        canvasEditor.on('selection:updated', function(e){
            const activeObject=canvasEditor.getActiveObject();
            if(!activeObject.text){
                setShowShapeSettings(true);
                setEnableTextSettings(false);
            }
            if(activeObject.text){
                setEnableTextSettings(true);
                setShowShapeSettings(false);
            }
            
        } )

        canvasEditor.on('selection:cleared', function(){
            setShowShapeSettings(false);
            setEnableTextSettings(false);
        })
    }
  return (
    <div className='p-3 bg-white'>
      { showShapeSettings && <ShapesSetting/> }
      { enableTextsettings && <TextSettingsNavbar/>}
    </div>
  )
}

export default TopNavBar
