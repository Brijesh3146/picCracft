"use client"
import { useMutation, useQuery } from 'convex/react'
import {api} from '@/convex/_generated/api'
import React, { useContext } from 'react'
import { UserDetailContext } from '@/app/context/UserDetailContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

function PreTemplatesList() {

    const templateList=useQuery(api.Templates.GetAllTemplates);
    const createNewDesignFromTemplate=useMutation(api.designs.CreateDesignFromTemplate);
    const {userDetail}=useContext(UserDetailContext);
    const router=useRouter();
    
    const onTemplateSelect = async(template) => {
       try {
         if (!userDetail?._id) {
           console.error('User not logged in');
           return;
         }
         
         const id = await createNewDesignFromTemplate({
           imagePreview: template?.imagePreview || null,
           jsonTemplate: template?.jsonData,
           name: template?.name || 'Untitled Design',
           uid: userDetail._id,
           width: template?.width || 500,
           height: template?.height || 500
         });

         console.log('Design created:', id);
         router.push('/design/' + id);
       } catch (error) {
         console.error('Error creating design from template:', error);
       }
    }
  return (
    <div>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-5'>
                  {templateList?.map((design, index) => (
                    <div key={index} className='bg-secondary rounded-lg p-3'
                         onClick={() => onTemplateSelect(design)}
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
    </div>
  )
}

export default PreTemplatesList
