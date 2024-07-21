import React from 'react'
import { NavLink } from 'react-router-dom'

const nav = [
    { name: 'Trang chu', path: 'home' },
    { name: 'CTCH', path: 'CTCH' },
    { name: 'CTPT', path: 'CTPT' },
    { name: 'CTMB', path: 'CTMB' },
    { name: 'NCT', path: 'NCT' },
]
const Navigation = () => {
    const noActive = 'hover:bg-secondary2 px-4 h-full items-center flex '
    const active = 'hover:bg-secondary2 px-4 h-full items-center flex  bg-secondary2'
    return (
        <div className='w-full bg-secondary1 text-white flex items-center h-10'>
            <div className='container mx-auto flex items-center text-sm font-medium h-full'>
                {nav?.length > 0 && nav.map((item, index) => {
                    return (
                        <div 
                        className='h-full flex justify-center items-center'
                        key={index}>
                            <NavLink
                                className={({ isActive }) => isActive ? active : noActive}
                                to={item.path}>{item.name}</NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navigation