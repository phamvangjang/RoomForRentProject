import React from 'react'

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight }) => {
    return (
        <div className='bg-white py-2, px-4 w-full rounded-md text-gray-400 text-sm flex items-center justify-between h-full cursor-pointer '>
            <div className='flex items-center gap-1 h-full w-full'>
                {IconBefore}
                <span className={`${fontWeight && 'font-medium text-black'} `}>{text}</span>
            </div>
            <span >{IconAfter}</span>
        </div>
    )
}

export default SearchItem