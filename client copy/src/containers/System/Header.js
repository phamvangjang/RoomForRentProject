import React from 'react'
import { Navigation } from '../Public'

const Header = () => {
    return (
        <div className='px-3 w-full flex bg-[#055699]'>
            <div className='flex justify-start items-center font-bold text-white w-[246px] flex-none'>
                phongtro123.com
            </div>
            <div className='flex-auto h-full bg-[#055699]'>
                <Navigation isSystem={true}/>
            </div>
        </div>
    )
}

export default Header