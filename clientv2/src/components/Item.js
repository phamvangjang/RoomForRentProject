import React, { memo, useState } from 'react'
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { Button } from '../components'
import { Link, useNavigate } from 'react-router-dom';
import { path } from '../ultils/constant';
import { formatVietnameseToString } from '../ultils/Common/formatVnToString';

const indexs = [0, 1, 2, 3];
const Item = ({ images, user, title, description, star, attributes, address, id }) => {
    // const navigate = useNavigate()
    const [hoverHeart, setHoverHeart] = useState(false)
    const handleStar = (star) => {
        let stars = []
        for (let i = 1; i <= +star; i++) stars.push(<FaStar />)
        return stars
    }
    return (
        <div className='w-full bg-secondary3 border-t-2 border-[#E13427]'>
            <div className='w-full flex py-4 px-5'>
                <Link
                    to={`${path.DETAIL}${formatVietnameseToString(title.replaceAll('/', ''))}/${id}`}
                    className='w-[40%] flex flex-wrap items-center justify-center relative cursor-pointer gap-[2px]'>
                    {images?.length > 0 && images.filter((i, index) => [...Array(4).keys()].some(i => i === index))?.map((i, index) => {
                        return (
                            <img
                                key={index}
                                src={i}
                                alt='preview'
                                className='w-[49%] h-[130px] object-cover'
                            />
                        )
                    })}
                    <span className='px-2 rounded-md bg-overlay70 text-white absolute left-2 bottom-3'>{`${images?.length} ảnh`}</span>
                    <span
                        onMouseEnter={() => setHoverHeart(true)}
                        onMouseLeave={() => setHoverHeart(false)}
                        className='absolute bottom-3 right-2 text-white cursor-pointer'>
                        {hoverHeart ? <FaHeart size={26} color='red' bgColor='red' /> : <FaRegHeart size={26} />}
                    </span>
                </Link>
                <div className='w-[60%] pl-3 flex flex-col gap-4'>
                    <div className='flex items-start'>
                        <span className='flex items-center gap-1 text-yellow-400'>
                            {handleStar.length > 0 && handleStar(+star).map((star, number) => {
                                return (
                                    <span key={number}>{star}</span>
                                )
                            })}
                        </span>
                        <Link
                            to={`${path.DETAIL}${formatVietnameseToString(title.replaceAll('/', ''))}/${id}`}
                            className='text-sm text-title font-semibold whitespace-normal text-ellipsis'>
                            {title}
                        </Link>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-between text-sm gap-1'>
                            <span className=' text-price font-bold'>{attributes?.price}</span>
                            <span className='font-normal text-desc'>{attributes?.acreage}</span>
                            <span className='font-normal text-main hover:underline cursor-pointer'>
                                {`${address.split(',')[address.split(',').length - 2]}${address.split(',')[address.split(',').length - 1]}`}
                            </span>
                        </div>
                        <small className='text-xs text-desc flex justify-end'>{attributes?.published}</small>
                    </div>
                    {/* whitespace-nowrap text-ellipsis*/}
                    <p className='text-desc text-sm w-full text-ellipsis overflow-hidden h-[100px] whitespace-normal'>
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
                        <div className='flex items-center gap-1 text-sm'>
                            <a
                                target='blank'
                                className='p-2 bg-secondary1 text-white rounded-md'
                                href={`tel:${user?.phone}`}>
                                Gọi {user?.phone}

                            </a>
                            <a
                                target='blank'
                                className='p-2 bg-secondary1 text-white rounded-md'
                                href={`https://zalo.me/${user?.zalo}`}>
                                Zalo {user?.zalo}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default memo(Item)