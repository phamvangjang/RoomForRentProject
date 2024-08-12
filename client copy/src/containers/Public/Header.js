import React, { useCallback, useEffect, useRef } from 'react'
import logo from '../../assets/logo.png'
import { Button } from '../../components'
import { AiOutlinePlusCircle } from "react-icons/ai";
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { path } from '../../ultils/constant';
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'

const Header = () => {
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
                <small>Phongtro123.com Xin chao</small>
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
                {isLoggedIn && <div className='flex items-center gap-1'>
                    <small>name</small>
                    <Button
                        text={'Sign Out'}
                        textColor='text-white'
                        bgColor='bg-secondary2'
                        onClick={() => dispatch(actions.SignOut())} />
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