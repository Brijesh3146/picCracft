import { UserButton } from '@stackframe/stack'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Download, Save, Trash2 } from 'lucide-react'
import { useCanvasHook } from '../[designId]/page'
import { useMutation } from 'convex/react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { api } from '@/convex/_generated/api'


function DesignHeader({DesignInfo}) {

  const [designName, setDesignName] = useState('');
  const {canvasEditor}=useCanvasHook();
  const SaveDesign=useMutation(api.designs.SaveDesign);
  const DeleteDesign=useMutation(api.designs.DeleteDesign);
  const router=useRouter();

  useEffect(() => {
    if (DesignInfo?.name) {
      setDesignName(DesignInfo.name);
    }
  }, [DesignInfo?.name]);
  const {designId}=useParams();

 function getCroppedDataURL(canvas) {
  return canvas.toDataURL({ 
    format: 'png', 
    quality: 1,
    multiplier: 1
  });
}


  /**
   * Used to save Design in JSON format in Database
   * 
   */
  const onSave=async()=>{
    if (!canvasEditor) return;

    if (designId?.startsWith('guest-')) {
      toast.warning('Login to save designs');
      return;
    }

  canvasEditor.renderAll();
  const base64Image = getCroppedDataURL(canvasEditor);
  const JsonDesign = canvasEditor.toJSON();
  const currentWidth = canvasEditor.getWidth();
  const currentHeight = canvasEditor.getHeight();

  try {
    const response = await fetch('/api/upload-image', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        file: base64Image, 
        fileName: `${designId}.png` 
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error);

    const updatedUrl = `${data.url}?t=${Date.now()}`;
    
    // Add width and height to JSON
    JsonDesign.width = currentWidth;
    JsonDesign.height = currentHeight;
    
    await SaveDesign({
      id: designId,
      jsonDesign: JsonDesign,
      imagePreview: updatedUrl
    });
    
    toast('Design saved!');
  } catch (err) {
    console.error('Save error:', err);
    toast('Failed to save design.');
  }
};

  const onDelete=async()=>{
    if (!confirm('Are you sure you want to delete this design?')) return;
    
    if (designId?.startsWith('guest-')) {
      toast.warning('Guest designs cannot be deleted');
      return;
    }

    try {
      await DeleteDesign({ id: designId });
      toast.success('Design deleted!');
      router.push('/workspace');
    } catch (err) {
      console.error('Delete error:', err);
      toast.error('Failed to delete design.');
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
        <Button onClick={onDelete} variant='destructive'> <Trash2/> Delete </Button>
        <Button onClick={()=>onExport()}> <Download/> Export </Button>
      <UserButton/>
      </div>
    </div>
  )
}

export default DesignHeader
