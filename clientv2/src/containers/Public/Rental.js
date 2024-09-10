import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import List from './List'
import Pagination from './Pagination'
import { ItemSidebar, RelatedPost, Province } from '../../components'
import { useLocation } from 'react-router-dom'
import { formatVietnameseToString } from '../../ultils/Common/formatVnToString'

const Rental = () => {
    const [categoryCurrent, setCategoryCurrent] = useState({})
    const [categoryCode, setCategoryCode] = useState('none')
    const location = useLocation()
    const { categories, prices, areas } = useSelector(state => state.app)

    useEffect(() => {
        const category = categories?.find(item => `/${formatVietnameseToString(item.value)}` === location.pathname)
        setCategoryCurrent(category)
        if (category) {
            setCategoryCode(category.code)
        }
    }, [location])
    return (
        <div className='w-full flex flex-col gap-3'>

            <div className='flex flex-col gap-1'>
                <h1 className='text-3xl font-bold'>{categoryCurrent?.header}</h1>
                <p className='text-sm'>{categoryCurrent?.subheader}</p>
            </div>
            <Province />
            <div className='flex w-full gap-4'>
                <div className='w-[70%] '>
                    <List  categoryCode={categoryCode}/>
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

export default Rental