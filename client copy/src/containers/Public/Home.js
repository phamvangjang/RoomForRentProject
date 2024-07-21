import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'

const Home = () => {
    return (
        <div className=' border border-red-500 w-full h-full'>
            <Header className='container mx-auto' />
            <Navigation />
            <div className='w-full flex flex-col items-center justify-start'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home