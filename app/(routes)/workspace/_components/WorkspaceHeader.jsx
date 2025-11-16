import { UserButton } from '@stackframe/stack'
import Image from 'next/image'
import React from 'react'

function WorkspaceHeader() {
  return (
    <div className='p-2  flex justify-between items-center shadow-sm'>
      <Image src={'/logo.png'} alt='logo' width={100} height={100}
      className='w-[70px] h-[70px]'/>
      <UserButton/>
    </div>
  )
}

export default WorkspaceHeader
