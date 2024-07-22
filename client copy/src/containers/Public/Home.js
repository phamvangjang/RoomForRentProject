import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'

const Home = () => {
    return (
        <div className=' w-full h-full'>
            <Header />
            <Navigation />
            <Search />
            <div className='container mx-auto w-full flex flex-col items-start justify-start mt-3'>
                <Outlet />
            </div>
        </div>
    )
}

export default Home