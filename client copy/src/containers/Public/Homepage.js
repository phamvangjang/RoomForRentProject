import React from 'react'
import Search from './Search'
import { text } from '../../ultils/constant'

const Homepage = () => {
  return (
    <div className='w-full flex flex-col gap-3'>
      <Search />
      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm'>{text.HOME_DESCRIPTION}</p>
      </div>
    </div>
  )
}

export default Homepage