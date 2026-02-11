import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { toast } from 'sonner';

function CanvasSizeSetting() {
  const { canvasEditor } = useCanvasHook();
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    if (canvasEditor) {
      setWidth(Math.round(canvasEditor.getWidth()));
      setHeight(Math.round(canvasEditor.getHeight()));
    }
  }, [canvasEditor]);

  const updateCanvasSize = () => {
    if (!canvasEditor) return;
    
    const newWidth = parseInt(width);
    const newHeight = parseInt(height);
    
    if (isNaN(newWidth) || isNaN(newHeight)) {
      toast.error('Please enter valid numbers');
      return;
    }
    
    if (newWidth < 100 || newHeight < 100) {
      toast.error('Canvas size must be at least 100x100 px');
      return;
    }
    
    if (newWidth > 10000 || newHeight > 10000) {
      toast.error('Canvas size cannot exceed 10000x10000 px');
      return;
    }
    
    canvasEditor.setDimensions({ width: newWidth, height: newHeight });
    canvasEditor.renderAll();
    toast.success(`Canvas resized to ${newWidth}x${newHeight} px`);
  };

  return (
    <div className='p-4'>
      <h2 className='text-lg font-bold mb-4'>Canvas Size</h2>
      
      <div className='space-y-4'>
        <div>
          <label className='text-sm font-medium'>Width (px)</label>
          <Input 
            type='number' 
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            placeholder='Width in pixels'
            min='100'
            max='10000'
          />
        </div>
        
        <div>
          <label className='text-sm font-medium'>Height (px)</label>
          <Input 
            type='number' 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder='Height in pixels'
            min='100'
            max='10000'
          />
        </div>
        
        <Button 
          onClick={updateCanvasSize}
          className='w-full'
        >
          Update Canvas Size
        </Button>
      </div>
    </div>
  );
}

export default CanvasSizeSetting;
