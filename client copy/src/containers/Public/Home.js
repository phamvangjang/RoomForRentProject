import React, { useEffect } from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import { Navigation, Search } from './index'
import { Contact, Intro } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'

const Home = () => {
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getPrices())
        dispatch(actions.getAreas())
        dispatch(actions.getProvinces())
    }, [])
    useEffect(() => {
        setTimeout(() => {
            isLoggedIn && dispatch(actions.getCurrent())
        }, 1000)
    }, [isLoggedIn])
    return (
        <div className=' w-full h-full'>
            <Header />
            <Navigation />
            {isLoggedIn && <Search />}
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