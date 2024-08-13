import React from 'react'
import Header from './Header'
import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Search from './Search'
import { Contact, Intro } from '../../components'

const Home = () => {
    return (
        <div className=' w-full h-full'>
            <Header />
            <Navigation />
            <Search />
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