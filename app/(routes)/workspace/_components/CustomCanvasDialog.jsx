import React, { useContext, useState } from 'react';
import { Input } from "@/components/ui/input";
import { api } from '@/convex/_generated/api';
import { useMutation } from 'convex/react';
import { UserDetailContext } from '@/app/context/UserDetailContext';
import { Button } from '@/components/ui/button';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';



import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from 'next/navigation';

//import { useState } from "react";

function CustomCanvasDialog({children}) {

  const [name, setName]=useState();
  const [height, setHeight]=useState();
  const [width, setWidth]=useState();
  const {userDetail} = useContext(UserDetailContext);
  const [loading, setLoading]= useState();
  const createDesignRecord=useMutation(api.designs.CreateNewDesign);
  const router=useRouter();
 /*
 * Used to create new design and save to db
 * 
 */
  const OnCreate=async ()=>{

    toast('Loading....')
    setLoading(true);
    const result= await createDesignRecord({
      name: name,
      width:  Number(width),
      height: Number(height),
      uid:userDetail?._id
    });
    console.log(result);
    setLoading(false);
    //navigate to Editor Screen
    router.push('/design/'+result);
  }

  return (
    
      <Dialog>
  <DialogTrigger asChild>{children}</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Create Custom Canvas</DialogTitle>
      <DialogDescription asChild>
       <div>
            <h2 className='text-sm'>Provide Canvas Width and height</h2>

            <div className='mt-5'>
                <label>Design Name</label>
                <Input placeholder="Design Name" onChange={(e) => setName(e.target.value)}/>
               <div className='mt-1 flex gap-5 w-full'>
                   <div className='w-full'>
                     <label>Width</label>
                     <Input className='mt-1 ' type='number' placeholder={500} onChange={(e) => setWidth(e.target.value)}/>
                   </div>
                   <div className='w-full'>
                     <label>Height</label>
                     <Input className='mt-1 ' type='number' placeholder={500} onChange={(e) => setHeight(e.target.value)}/>
                   </div>
                </div>
            </div>
            <div className='flex justify-end mt-6'>

                <Button className='w-full' 
                disabled={ loading || !name || !width || !height}
                onClick={OnCreate}>
                    {loading? <Loader2Icon className='animate-spin'/> : 'Create'}
                </Button>

            </div>
       </div>

      </DialogDescription>
    </DialogHeader>
  </DialogContent>
      </Dialog>

  )
}

export default CustomCanvasDialog
