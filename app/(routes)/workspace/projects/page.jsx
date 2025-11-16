import React from 'react'
import Image from 'next/image'
import RecentDesign from '../_components/RecentDesign'

function Projects() {
  return (
<div className='p-10 w-full'>
      <div className='relative'>
            <Image src={'/banner.png'} alt='banner' width={1800} height={300}
            className='w-full h-[200px] rounded-2xl object-cover'
            />
            <h2 className='text-3xl absolute bottom-5 left-10 text-white'>Projects</h2>
          </div>
      <RecentDesign/>
</div>
  )
}

export default Projects
