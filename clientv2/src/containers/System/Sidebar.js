import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import userIcon from '../../assets/user-icon.png'
import { menuSidebar } from '../../ultils/Common/menuSidebar'
import { NavLink } from 'react-router-dom'
import { FaSignOutAlt } from "react-icons/fa";
import * as actions from '../../store/actions';
import { blobToBase64 } from '../../ultils/Common/toBase64'

const activeStyle = 'font-bold cursor-pointer hover:bg-[#f1f1f1] flex items-center gap-2 text-main text-base p-2'
const noActiveStyle = 'cursor-pointer hover:bg-[#f1f1f1] flex items-center gap-2 text-main text-base p-2'
const Sidebar = () => {
    const dispatch = useDispatch()
    const { currentData } = useSelector(state => state.user)
    return (
        <div className='w-[246px] flex-none bg-[#f8f9fa] h-screen p-3 flex flex-col gap-3'>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                    <img
                        src={blobToBase64(currentData?.avatar) || userIcon}
                        alt='avatar'
                        className='h-[50px] w-[50px] object-cover rounded-full border-2 border-white'
                    />
                    <div className='flex flex-col gap-1'>
                        <span className='font-semibold'>{currentData?.name}</span>
                        <small className='text-[#555555]'>{currentData?.phone}</small>
                    </div>
                </div>
                <div>
                    <span className='text-sm gap-2 flex'>Mã thành viên:
                        <span className='font-bold'>
                            {currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}
                        </span>
                    </span>
                </div>
            </div>

            <div className='flex flex-col gap-1'>
                {menuSidebar.map(item => {
                    return (
                        <NavLink
                            className={({ isActive }) => isActive ? activeStyle : noActiveStyle}
                            key={item?.id}
                            to={item?.path}>
                            {item?.icon}
                            {item?.text}
                        </NavLink>
                    )
                })}
                <span
                    className={noActiveStyle}
                    onClick={() => {
                        dispatch(actions.SignOut())
                    }}>
                    <FaSignOutAlt />
                    Sign out
                </span>
            </div>
        </div>
    )
}

export default Sidebar