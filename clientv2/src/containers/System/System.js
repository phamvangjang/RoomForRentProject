import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '../../ultils/constant'
import Header from './Header'
import Sidebar from './Sidebar'

const System = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    if (!isLoggedIn) return <Navigate to={`/${path.LOGIN}`} replace={true} />
    return (
        <div className='w-full flex flex-col items-start justify-start'>
            <Header />
            <div className='flex w-full'>
                <Sidebar />
                <div className='flex-auto bg-white'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default System