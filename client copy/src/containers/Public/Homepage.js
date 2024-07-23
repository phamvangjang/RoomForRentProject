import React from 'react'
import { text, location } from '../../ultils/constant'
import Province from '../../components/Province'
import List from './List'

const Homepage = () => {
  return (
    <div className='w-full flex flex-col gap-3'>

      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='flex w-full gap-4'>
        <div className='w-[70%] '><List /></div>
        <div className='w-[30%] border border-red-400'>sideber</div>
      </div>
    </div>
  )
}

export default Homepage