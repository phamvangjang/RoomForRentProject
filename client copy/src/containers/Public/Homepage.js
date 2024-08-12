import React, { useEffect } from 'react'
import { text, location } from '../../ultils/constant'
import Province from '../../components/Province'
import List from './List'
import Pagination from './Pagination'
import { useSearchParams } from 'react-router-dom'
import { ItemSidebar } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Homepage = () => {
  const dispatch = useDispatch()
  const { categories, prices, areas } = useSelector(state => state.app)
  // console.log(categories)
  const [parmas] = useSearchParams()
  useEffect(() => {
    dispatch(actions.getPrices())
    dispatch(actions.getAreas())
  }, [])
  // console.log(prices)
  return (
    <div className='w-full flex flex-col gap-3'>

      <div className='flex flex-col gap-1'>
        <h1 className='text-3xl font-bold'>{text.HOME_TITLE}</h1>
        <p className='text-sm'>{text.HOME_DESCRIPTION}</p>
      </div>
      <Province />
      <div className='flex w-full gap-4'>
        <div className='w-[70%] '>
          <List page={parmas.get('page')} />
          <Pagination page={parmas.get('page')} />
        </div>
        <div className='w-[30%] flex justify-start items-center flex-col gap-5'>
          <ItemSidebar
            content={categories}
            title={'Danh mục cho thuê'}
          />
          <ItemSidebar
            content={prices}
            isDouble={true}
            title={'Xem theo giá'}
          />
          <ItemSidebar
            content={areas}
            isDouble={true}
            title={'Xem theo diện tích'}
          />
        </div>
      </div>
    </div>
  )
}

export default Homepage