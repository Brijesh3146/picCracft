import  Shapes  from '../Sharable/Shapes'
import React from 'react'
import Stickers from '../Sharable/Stickers'

function Elements() {
  return (
    <>
    <div>
      <Shapes/>
    </div>
    <div>
      <h2 className='font-bold'>Stikers</h2>
      <Stickers/>
    </div>
    </>
  )
}

export default Elements
