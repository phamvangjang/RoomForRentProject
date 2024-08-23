import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from './List'
import Pagination from './Pagination'
import { ItemSidebar, RelatedPost } from '../../components'

const SearchDetail = () => {
    const { prices, areas } = useSelector(state => state.app)

    return (
        <div className='w-full flex flex-col gap-3'>

            <div className='flex flex-col gap-1'>
                {/* <h1 className='text-3xl font-bold'>{categoryCurrent?.header}</h1>
                <p className='text-sm'>{categoryCurrent?.subheader}</p> */}
            </div>
            <div className='flex w-full gap-4'>
                <div className='w-[70%] '>
                    <List />
                    <Pagination />
                </div>
                <div className='w-[30%] flex justify-start items-center flex-col gap-5'>
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

export default SearchDetail