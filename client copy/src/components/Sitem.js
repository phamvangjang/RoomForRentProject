import React from 'react'

const Sitem = ({ title, price, image, createAt }) => {
    return (
        <div className='flex items-center justify-between border-b-2 border-[#eee] py-3'>
            <img
                src='https://pt123.cdn.static123.com/images/thumbs/450x300/fit/2024/08/13/6d2570a1-0285-44bd-b790-ee60cf78e46c_1723526433.jpg'
                alt='thumnail'
                className='w-[65px] h-[65px] object-cover rounded-md'
            />
            <div className='flex flex-col items-center justify-center ml-4 gap-2'>
                <h4 className='text-base text-[#055699] font-normal'>{`${title?.slice(0,50)}...`}</h4>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-base font-bold text-price'>{price}</span>
                    <span className='text-sm text-[#aaa]'>{createAt}</span>
                </div>
            </div>
        </div>
    )
}

export default Sitem