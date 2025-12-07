import React from 'react'
import moment from 'moment'
import 'moment/locale/vi'
import { FaStar } from "react-icons/fa";

const Sitem = ({ title, price, image, createAt, star }) => {
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<FaStar />)
        return stars
    }
    return (
        <div className='flex items-center justify-between border-b-2 border-[#eee] py-3'>
            <img
                src={image[0] || ''}
                alt='thumnail'
                className='w-[65px] h-[65px] object-cover rounded-md flex-none'
            />
            <div className='flex flex-col flex-auto items-center justify-center ml-4 gap-2'>
                <h4 className='text-base text-[#055699] font-normal flex gap-1'>
                    {handleStar.length > 0 && handleStar(+star).map((star, number) => {
                        return (
                            <span className='text-yellow-500' key={number}>{star}</span>
                        )
                    })}
                    {`${title?.slice(0, 50)}...`}
                </h4>
                <div className='flex justify-between items-center w-full'>
                    <span className='text-base font-bold text-price'>{price}</span>
                    <span className='text-sm text-[#aaa]'>{moment(createAt).fromNow()}</span>
                </div>
            </div>
        </div>
    )
}

export default Sitem