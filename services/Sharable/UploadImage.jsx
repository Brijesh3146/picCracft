import React, { useState } from 'react'
import { useParams } from 'next/navigation';
import { FabricImage } from 'fabric';
import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { Loader2Icon } from 'lucide-react';

function UploadImage() {
  const {designId}=useParams();
  const [loading, setLoading]=useState();
  const {canvasEditor}=useCanvasHook();

    const onFileUpload = async (event) =>{
      setLoading(true);
      const file=event.target.files[0];
      
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result;
        
        const response = await fetch('/api/upload-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            file: base64, 
            fileName: `${designId}-${Date.now()}.png` 
          })
        });

        const data = await response.json();
        console.log(data.url);

        const canvasImageRef=await FabricImage.fromURL(
          data.url,
          {
            crossOrigin:'anonymous'
          }
        )
        canvasEditor.add(canvasImageRef);
        setLoading(false);
      };
    }
  return (
    <div>
      <div>
      <label htmlFor='uploadImage'>
       <h2 className='p-2 bg-primary text-white rounded-md text-center text-sm'>
           { loading ? <Loader2Icon className='animate-spin'/> : 'Upload Image'}
       </h2>
      </label>
      </div>
      <input type='file' id='uploadImage'
      className='hidden'
      multiple={false}
      onChange={onFileUpload}/>
    </div>
  )
}

export default UploadImage
