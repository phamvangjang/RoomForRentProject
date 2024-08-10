import React, { memo, useState } from 'react'
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from '../components'

const indexs = [0, 1, 2, 3];
const Item = ({ images, user, title, description, star, attributes, address }) => {
    const [hoverHeart, setHoverHeart] = useState(false)
    return (
        <div className='w-full bg-secondary3 border-t-2 border-[#E13427]'>
            <div className='w-full flex py-4 px-5'>
                <div className='w-[40%] flex flex-wrap items-center justify-center relative cursor-pointer gap-[2px]'>
                    {images.length > 0 && images.filter((i, index) => indexs.some(i => i === index))?.map((i,index) => {
                        return (
                            <img
                                key={index}
                                src={i}
                                alt='preview'
                                className='w-[160px] h-[140px] object-cover'
                            />
                        )
                    })}
                    <span className='px-2 rounded-md bg-overlay70 text-white absolute left-3 bottom-1'>{`${images?.length} ảnh`}</span>
                    <span
                        onMouseEnter={() => setHoverHeart(true)}
                        onMouseLeave={() => setHoverHeart(false)}
                        className='absolute bottom-1 right-5 text-white cursor-pointer'>
                        {hoverHeart ? <FaHeart size={26} color='red' bgColor='red' /> : <FaRegHeart size={26} />}
                    </span>
                </div>
                <div className='w-[60%] pl-3 flex flex-col gap-4'>
                    <div className='flex items-start'>
                        <span className='flex items-center gap-1 text-yellow-400'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                        <h2 className='text-sm text-title font-semibold'>{title}</h2>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-around text-sm gap-1'>
                            <span className=' text-price font-bold'>{attributes?.price}</span>
                            <span className='font-normal text-desc'>{attributes?.acreage}</span>
                            <span className='font-normal text-main hover:underline cursor-pointer'>{address}</span>
                        </div>
                        <small className='text-xs text-desc flex justify-end'>{attributes?.published}</small>
                    </div>
                    {/* whitespace-nowrap */}
                    <p className='text-desc text-sm w-full text-ellipsis overflow-hidden h-[100px]'>
                        {`${description}`}
                    </p>

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-1 '>
                            <img
                                alt='avatar'
                                src='https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg'
                                className='w-[30px] h-[30px] rounded-full'
                            />
                            <span className='text-sm text-desc'>{user?.name}</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Button bgColor={'bg-secondary1'} textColor={'text-white'} text={`Gọi ${user?.phone}`} />
                            <Button bgColor={'bg-secondary1'} textColor={'text-white'} text={`Zalo ${user?.zalo}`} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default memo(Item)