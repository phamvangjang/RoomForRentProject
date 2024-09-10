import React from 'react'
import { text } from '../../ultils/constant'
import { List, Pagination } from './index'
import { ItemSidebar, Province, RelatedPost } from '../../components'
import { useSelector } from 'react-redux'

const Homepage = () => {
  const { categories, prices, areas } = useSelector(state => state.app)

  return (
    <div className='w-full flex flex-col gap-3'>

      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='flex w-full gap-4'>
        <div className='w-[70%] '>
          <List />
          <Pagination />
        </div>
        <div className='w-[30%] flex justify-start items-center flex-col gap-5'>
          <ItemSidebar
            content={categories}
            title={'Danh mục cho thuê'}
          />
          <ItemSidebar
            content={prices}
            isDouble={true}
            type='priceCode'
            title={'Xem theo giá'}
          />
          <ItemSidebar
            content={areas}
            isDouble={true}
            type='areaCode'
            title={'Xem theo diện tích'}
          />
          <RelatedPost />
        </div>
      </div>
    </div>
  )
}

export default Homepage