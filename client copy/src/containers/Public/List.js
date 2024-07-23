import React from 'react'
import { Button, Item } from '../../components'

const List = () => {
    return (
        <div className='w-full py-5 bg-white shadow-md rounded-md text-main '>
            <div className='px-5'>
                <h1 className='text-lg font-bold '>Tổng 129.972 kết quả</h1>
            </div>
            <div className='flex items-center gap-2 my-3 px-5'>
                <span>Sắp xếp</span>
                <Button bgColor='bg-gray-200' text={'Mặc định'} />
                <Button bgColor='bg-gray-200' text={'Mới nhất'} />
                <Button bgColor='bg-gray-200' text={'Có Video'} />
            </div>
            <div ><Item /></div>
        </div>
    )
}

export default List