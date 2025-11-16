"use client"
import { Button } from '@/components/ui/button';
import React, {useContext, useEffect, useState} from 'react';
import Image from 'next/image';
import CustomCanvasDialog from './CustomCanvasDialog';
import { UserDetailContext } from '@/app/context/UserDetailContext';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useRouter } from 'next/navigation';

function RecentDesign() {

  const [designList, setDesignList] = useState([]);
  const {userDetail}=useContext(UserDetailContext);
  const convex=useConvex();
  const router=useRouter();

  useEffect(() => {
    if (userDetail?._id) {
      GetRecentDesigns();
    }
  }, [userDetail])
  
  const GetRecentDesigns=async()=>{
    try {
      const result = await convex.query(api.designs.GetUserDesigns, {
        uid: userDetail?._id
      });
      console.log('Recent designs fetched:', result);
      setDesignList(result || []);
    } catch (error) {
      console.error('Error fetching designs:', error);
      setDesignList([]);
    }
  }

  return (
    <div className='mt-7'>
        <h2 className='font-bold text-2xl'>Recent Designs</h2>
        
     {designList?.length==0 ?
        <div className='flex flex-col gap-4 items-center mt-5'>
            <Image src={'/edittool.png'} alt='edit' width={100} height={100}/>
            <h2 className='text-center'>You don't have any design created, Create New one!</h2> 
            <CustomCanvasDialog>
              <Button>+ Create New</Button>
            </CustomCanvasDialog>

        </div>:
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
            {designList?.map((design, index) => (
              <div key={index} className='bg-secondary rounded-lg p-3'
                   onClick={() => router.push('/design/'+design?._id)}
              >
                <Image src={design?.imagePreview || '/edittool.png'}
                alt={design?.name || 'Design'}
                width={300}
                height={300}
                className='w-full h-[200px] object-contain cursor-pointer rounded-lg'
                onError={(e) => { e.target.src = '/edittool.png' }}
                />
                <div className='mt-2'>
                  <p className='text-sm font-medium truncate'>{design?.name || 'Untitled Design'}</p>
                </div>
              </div>

              ))}
    </div>
    }
   </div>
  )
}

export default RecentDesign
