import React from 'react'
import { memo } from 'react'
import userIcon from '../assets/user-icon.png';
import { FaPhoneAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { CiHeart } from "react-icons/ci";
import { CiShare2 } from "react-icons/ci";
import { CiWarning } from "react-icons/ci";

const Boxinfor = ({ userData }) => {
    return (
        <div className='flex flex-col items-center bg-white p-4 rounded-md shadow-sm sticky top-20'>
            <div className='w-full flex items-center justify-center'>
                <img
                    src={userIcon}
                    alt='user-icon'
                    className='w-16 h-16 rounded-full'
                />
            </div>
            <span className='text-xl font-semibold mt-4'>{userData?.name}</span>
            <span className='w-full flex items-center gap-2 justify-center bg-green-500 px-4 py-2 rounded-md text-xl text-white mt-2 cursor-pointer hover:bg-green-600'>
                <span><FaPhoneAlt /></span>
                <a className='' href={`tel:${userData?.phone}`}>{userData?.phone}</a>
            </span>
            <span className='w-full flex items-center gap-2 justify-center bg-blue-500 px-4 py-2 rounded-md text-xl text-white mt-2 cursor-pointer hover:bg-blue-600'>
                <span><SiZalo /></span>
                <a className='' href={`http://zalo.me/${userData?.phone}`}>Nhắn Zalo</a>
            </span>
            <span className='flex justify-between w-full mt-4 text-sm text-gray-500 cursor-pointer'>
                <span className='flex items-center gap-2'>
                    <span><CiHeart /></span>
                    <span>Lưu tin</span>
                </span>
                <span className='flex items-center gap-2'>
                    <span><CiShare2 /></span>
                    <span>Chia sẻ</span>
                </span>
                <span className='flex items-center gap-2'>
                    <span><CiWarning /></span>
                    <span>Báo xấu</span>
                </span>
            </span>
        </div>
    )
}

export default memo(Boxinfor)