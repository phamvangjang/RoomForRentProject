import React, { useCallback, useEffect, useRef, useState } from 'react'
import logo from '../../assets/logo.png'
import { Button } from '../../components'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { menuManage } from '../../ultils/Common/menuManage';
import { FaSignOutAlt } from "react-icons/fa";

const Header = () => {
    const [isShowMenu, setIsShowMenu] = useState()
    const { currentData } = useSelector(state => state.user)
    const [searchParams] = useSearchParams()
    const headerRef = useRef()
    const dispatch = useDispatch()
    const { isLoggedIn } = useSelector(state => state.auth)
    const navigate = useNavigate();
    const goLogin = useCallback((flag) => {
        navigate(path.LOGIN, { state: { flag } });
    }, [])
    useEffect(() => {
        headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, [searchParams.get('page')])
    return (
        <div
            ref={headerRef}
            className='container mx-auto flex items-center justify-between'>
            <Link to={'/'}>
                <img
                    src={logo}
                    alt='logo'
                    className='w-[240px] h-[70px] object-contain'
                />
            </Link>

            <div className='flex gap-2 items-center'>
                <small>{`Phongtro123.com Xin chao`}</small>
                {!isLoggedIn && <>
                    <Button
                        text={'Sign In'}
                        textColor='text-white'
                        bgColor='bg-secondary1'
                        onClick={() => { goLogin(false) }} />
                    <Button
                        text={'Sign Up'}
                        textColor='text-white'
                        bgColor='bg-secondary1'
                        onClick={() => { goLogin(true) }} />
                </>}
                {isLoggedIn && <div className='flex items-center gap-1 relative'>
                    <small>{currentData?.name}</small>
                    <Button
                        text={'Manage Account'}
                        textColor='text-white'
                        bgColor='bg-secondary1'
                        onClick={() => setIsShowMenu(prev => !prev)} />
                    {isShowMenu && <div
                        className='absolute top-full right-0 bg-white shadow-md rounded-md  px-5 py-4 w-[200px] flex flex-col gap-2 text-[#1266dd] text-sm'>
                        {menuManage.map(item => {
                            return (
                                <Link
                                    className='cursor-pointer hover:text-[#f60] border-b border-[#eee] pb-2 flex items-center gap-2'
                                    key={item?.id}
                                    to={item?.path}>
                                    {item?.icon}
                                    {item?.text}
                                </Link>
                            )
                        })}
                        <span
                            className='cursor-pointer hover:text-[#f60] flex items-center gap-2'
                            onClick={() => {
                                dispatch(actions.SignOut())
                                setIsShowMenu(false)
                            }}>
                            <FaSignOutAlt />
                            Sign out
                        </span>
                    </div>}
                </div>}
                <Button
                    text={'Sign Up new'}
                    textColor='text-white'
                    bgColor='bg-secondary2'
                    IcAfter={AiOutlinePlusCircle} />
            </div>
        </div>
    )
}

export default Header