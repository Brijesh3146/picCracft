"use client"
import { useParams, useSearchParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import DesignHeader from '../_components/DesignHeader';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import SideBar from '../_components/SideBar';
import CanvasEditor from '../_components/CanvasEditor';
import { CanvasContext } from '@/app/context/CanvasContext';

function DesignEditor() {
    const {designId}=useParams();
    const searchParams = useSearchParams();
    const [canvasEditor, setCanvasEditor]=useState();
    const isGuestMode = designId?.startsWith('guest-');
    
    const DesignInfo=useQuery(api.designs.GetDesign, 
        isGuestMode ? "skip" : {
        id:designId
    });

    // Get design info from URL params for guest users
    const guestDesignInfo = isGuestMode ? {
        name: searchParams.get('name') ,
        width: Number(searchParams.get('width')) ,
        height: Number(searchParams.get('height'))
    } : null;

    const finalDesignInfo = isGuestMode ? guestDesignInfo : DesignInfo;


  return (
    <div className='flex flex-col h-screen'>
      <CanvasContext.Provider value={{canvasEditor, setCanvasEditor}}>
        <DesignHeader DesignInfo={finalDesignInfo} className='flex-shrink-0'/>
        <div className='flex'>
            <SideBar/>
            <div className='flex-1 overflow-auto'>
            <CanvasEditor DesignInfo={finalDesignInfo} />
            </div>
        </div>
        </CanvasContext.Provider>
    </div>
  )
}

export default DesignEditor

export const useCanvasHook=()=>{
  const context=useContext(CanvasContext);
  if (!context){
    throw new Error('Error')
  }
  return context
}
