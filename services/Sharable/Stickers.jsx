import { useCanvasHook } from '@/app/(routes)/design/[designId]/page'
import { FabricImage } from 'fabric';
import React from 'react'
import { StickerList } from '../Options';
import Image from 'next/image';

function Stickers() {

    const {canvasEditor}=useCanvasHook();
    const onAddSticker=async(imageUrl) => {
        if(canvasEditor){
            const canvasImageRef=await FabricImage.fromURL(
                imageUrl,
                {
                  crossOrigin:'anonymous'
                }
            )

            canvasEditor.add(canvasImageRef);
        }
    }
  return (
   <div className='max-h-[400px] overflow-y-auto p-2 border rounded-xl'>
           <div className='grid grid-cols-3 gap-3 '>
               {StickerList.map((sticker, index) => (
                   <div key={index} className='p-2 border rounded-xl hover:bg-gray-100 cursor-pointer' onClick={()=> onAddSticker(sticker)}>
                       <Image src={sticker} alt={sticker}
                          width={100}
                          height={100}
                       />
                   </div>
               ))}
           </div>
         
       </div>
  )
}

export default Stickers
