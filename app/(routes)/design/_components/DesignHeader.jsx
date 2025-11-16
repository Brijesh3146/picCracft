import { UserButton } from '@stackframe/stack'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, Save } from 'lucide-react'
import { useCanvasHook } from '../[designId]/page'
import { useMutation } from 'convex/react'
import { useParams } from 'next/navigation'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'
import ImageKit from 'imagekit'


function DesignHeader({DesignInfo}) {

  const [designName, setDesignName] = useState('');
  const {canvasEditor}=useCanvasHook();
  const SaveDesign=useMutation(api.designs.SaveDesign);

  useEffect(() => {
    if (DesignInfo?.name) {
      setDesignName(DesignInfo.name);
    }
  }, [DesignInfo?.name]);
  const {designId}=useParams();

  var imagekit= new ImageKit({
        publicKey:process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
        privateKey:process.env.NEXT_PUBLIC_IMAGEKIT_PRIVATE_KEY,
        urlEndpoint:process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT_KEY
    });

 function getCroppedDataURL(canvas) {
  const objs = canvas.getObjects();
  if (objs.length === 0) return canvas.toDataURL({ format: 'png', quality: 1 });

  // Compute bounding box
  const bounds = objs.reduce(
    (acc, obj) => {
      const rect = obj.getBoundingRect(true);
      acc.left = Math.min(acc.left, rect.left);
      acc.top = Math.min(acc.top, rect.top);
      acc.right = Math.max(acc.right, rect.left + rect.width);
      acc.bottom = Math.max(acc.bottom, rect.top + rect.height);
      return acc;
    },
    { left: Infinity, top: Infinity, right: -Infinity, bottom: -Infinity }
  );

  const width = bounds.right - bounds.left;
  const height = bounds.bottom - bounds.top;

  return canvas.toDataURL({
    format: 'png',
    quality: 1,
    left: bounds.left,
    top: bounds.top,
    width,
    height,
  });
}


  /**
   * Used to save Design in JSON format in Database
   * 
   */
  const onSave=async()=>{
    if (!canvasEditor) return;

  // Ensure latest render
  canvasEditor.renderAll();

  // Get perfectly cropped image
  const base64Image = getCroppedDataURL(canvasEditor);

  try {
    // Check if file already exists
    const existingFiles = await imagekit.listFiles({
      searchQuery: `name="${designId}.png"`
    });

    if (existingFiles?.length > 0 && existingFiles[0]?.fileId) {
      await imagekit.deleteFile(existingFiles[0].fileId);
    }

    // Upload new cropped image
    const imageRef = await imagekit.upload({
      file: base64Image,
      fileName: `${designId}.png`,
      isPublished: true,
      useUniqueFileName: false
    });

    const updatedUrl = `${imageRef.url}?t=${Date.now()}`;

    // Save design JSON + preview
    const JsonDesign = canvasEditor.toJSON();
    await SaveDesign({
      id: designId,
      jsonDesign: JsonDesign,
      imagePreview: updatedUrl
    });
    console.log('image',updatedUrl);  
    toast('Design saved!');
  } catch (err) {
    console.error('Save error:', err);
    toast('Failed to save design.');
  }
};

  const onExport=()=>{
    //Base64 Image
    if (!canvasEditor) return;
  const dataUrl = getCroppedDataURL(canvasEditor);
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = 'piccraftDesign.png';
  link.click();
  }
    
  return (
    <div className='p-3 flex justify-between 
    bg-gradient-to-r from-sky-500 via-blue-400 to-purple-600'
    >
      <Image src={'/logo.png'} alt='logo' height={35} width={90} className="w-[90px] h-[35px] " />
      <input placeholder='Design Name' className='text-white border-none outline-none' 
       value={designName}
       onChange={(e) => setDesignName(e.target.value)}
       />
       <div className='flex gap-5'>
        <Button onClick={onSave}> <Save/> Save </Button>
        <Button onClick={()=>onExport()}> <Download/> Export </Button>
      <UserButton/>
      </div>
    </div>
  )
}

export default DesignHeader
