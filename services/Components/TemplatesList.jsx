import { useCanvasHook } from '@/app/(routes)/design/[designId]/page';
import { useQuery } from 'convex/react'
import Image from 'next/image';
import React from 'react'
import { api } from '@/convex/_generated/api';

function TemplatesList() {

  const {canvasEditor}=useCanvasHook();
  const templateList=useQuery(api.Templates.GetAllTemplates);

  const onTemplateSelect=(template)=>{
        if(canvasEditor){
          canvasEditor.clear();
          canvasEditor.loadFromJSON(template?.jsonData, () => {
            if(template?.jsonData?.width && template?.jsonData?.height){
              canvasEditor.setWidth(template.jsonData.width);
              canvasEditor.setHeight(template.jsonData.height);
            }
            canvasEditor.renderAll();
          })
        }
  };

 // Handle loading & empty states safely
  if (templateList === undefined) {
    // useQuery returns undefined while loading
    return <p className="text-gray-400 text-center">Loading templates...</p>;
  }

  if (!templateList?.length) {
    return <p className="text-gray-400 text-center">No templates available.</p>;
  }
  console.log('template',templateList);
  return (
    <div>
      <div className='grid grid-cols-2 gap-5'>
        {templateList.map((template, index) => (
            <Image src={template.imagePreview}
            onClick={()=>onTemplateSelect(template)}
            key={index}
              alt={template.name}
              width={500}
              height={500}
              className='w-full h-[150px] rounded-lg object-contain bg-secondary cursor-pointer'
            />
        ))}
      </div>
    </div>
  )
}

export default TemplatesList
