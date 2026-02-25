"use client"
import {api} from '@/convex/_generated/api'
import { useMutation } from 'convex/react'
import { canvasSizeOptions } from '@/services/Options'
import Image from 'next/image'
import React, { useContext } from 'react'
import { UserDetailContext } from '@/app/context/UserDetailContext'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

function IntroOptions() {

  const createDesignRecord=useMutation(api.designs.CreateNewDesign);
  const {userDetail}= useContext(UserDetailContext)
  const router=useRouter();

/**
 * Used to create new design and save to db
 * @param {*} option 
 */
  const OnCanvasOptionSelect=async (option)=>{
    console.log('userDetail:', userDetail);
    
    if(!userDetail || !userDetail._id){
      toast.warning('Login to save designs');
      // Pass design info in URL for guest users
      router.push(`/design/guest-${Date.now()}?width=${option.width}&height=${option.height}&name=${option.name}`);
      return;
    }
    // Only call mutation for logged-in users
    toast('Loading....')
    const result= await createDesignRecord({
      name:option.name,
      width:option.width,
      height:option.height,
      uid:userDetail._id
    });
    console.log(result);
    //navigate to Editor Screen
    router.push('/design/'+result);

  }
  return (
    <div>
    <div className='relative'>
      <Image src={'/banner.png'} alt='banner' width={1800} height={300}
      className='w-full h-[200px] rounded-2xl object-cover'
      />
      <h2 className='text-3xl absolute bottom-5 left-10 text-white'>Workspace</h2>
    </div>
    <div className='flex flex-wrap gap-3 md:gap-6 items-center mt-10 justify-center'>
        {canvasSizeOptions.map((option,index)=>(
            <div key={index} className='flex flex-col items-center cursor-pointer p-2 md:p-3'
            onClick={()=>OnCanvasOptionSelect(option)}>
                <Image src={option.icon} alt={option.name} width={60} height={60}
                className='hover:scale-115 transition-all w-[40px] h-[40px] md:w-[60px] md:h-[60px] object-contain'
                />
                <h2 className='text-[10px] md:text-xs mt-2 font-medium text-center max-w-[80px] md:max-w-none'> {option.name} </h2>
            </div>
        ))}

    </div>
    </div>
  )
}

export default IntroOptions
