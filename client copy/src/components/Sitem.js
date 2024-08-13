import React from 'react'
import moment from 'moment'

const Sitem = ({ title, price, image, createAt }) => {
    return (
        <div className='flex items-center justify-between border-b-2 border-[#eee] py-3'>
            <img
                src={image[0]}
                alt='thumnail'
                className='w-[65px] h-[65px] object-cover rounded-md flex-none'
            />
            <div className='flex flex-col flex-auto items-center justify-center ml-4 gap-2'>
                <h4 className='text-base text-[#055699] font-normal'>{`${title?.slice(0, 50)}...`}</h4>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-base font-bold text-price'>{price}</span>
                    <span className='text-sm text-[#aaa]'>{moment(createAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default Sitem