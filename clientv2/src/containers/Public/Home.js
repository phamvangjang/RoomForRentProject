import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation, Search } from './index'
import { Contact, Intro } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'
import { path } from '../../ultils/constant'

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth);
    const location = useLocation();
    return (
        <div className=' w-full h-full'>
            <Header />
            <Navigation />
            {isLoggedIn && !location.pathname?.includes(`/${path.DETAIL}`) && <Search />}
            <div className='container mx-auto w-full flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
            <Intro />
            <Contact />
            <div className='h-[500px]'></div>
        </div>
    )
}

export default Home