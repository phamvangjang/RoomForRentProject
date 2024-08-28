import React from 'react'
import { useSelector } from 'react-redux'
import userIcon from '../assets/user-icon.png'

const User = () => {
    const { currentData } = useSelector(state => state.user)
    return (
        <div className='flex items-center gap-2'>
            <img
                alt='profile'
                src={currentData?.avatar || userIcon}
                className='w-[40px] h-[40px] rounded-full border-[1px] border-[#ddd] shadow-md'
            />
            <div>
                <span className='text-base'>
                    {`Xin chào `}
                    <span className='font-bold'>
                        {currentData?.name}
                    </span>
                </span>
                <span className='flex flex-col gap-1 text-sm text-main'>
                    <span className='flex items-center gap-1'>
                        {`Mã tài khoản: `}
                        <span className='font-semibold'>
                            {` ${currentData?.id?.slice(0, 10)}...`}
                        </span>
                    </span>
                    <span className='flex items-center gap-1'>
                        {`TK Chính: `}
                        <span className='font-semibold'>
                            {` 0 VND`}
                        </span>
                    </span>
                </span>
            </div>
        </div>
    )
}

export default User