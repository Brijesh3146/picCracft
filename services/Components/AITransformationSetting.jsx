import React, { useState } from 'react'
import { AITransformationSettings } from '../Options'
import Image from 'next/image'
import CustomImageUpload from '../Sharable/CustomImageUpload'


function AITransformationSetting() {

  const [selectedAi, setSelectedAi]=useState();
  
  return (
    <div>
      <CustomImageUpload selectedAi={selectedAi}/>
      <h2 className='my-2 font-bold'>AI Transformation By ImageKit.io </h2>
    <div className='grid grid-cols-2 gap-3'>
      {AITransformationSettings.map((option, index) => (
        <div key={index} onClick={()=>setSelectedAi(option)}>
            <Image src={option.image} alt={option.name}
            width={500}
            height={500}
            className='w-full h-[70px] object-cover rounded-xl'
            />
            <h2 className='text-xs text-center'>{option.name}</h2>
        </div>
      ))}

    </div>
    </div>
  )
}

export default AITransformationSetting
