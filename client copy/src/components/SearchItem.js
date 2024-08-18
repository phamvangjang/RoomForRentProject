import clsx from 'clsx'
import React, { memo } from 'react'

const SearchItem = ({ IconBefore, IconAfter, text, fontWeight, defaultText }) => {
    return (
        <div
            className='bg-white py-2, px-4 w-full rounded-md text-gray-400 text-sm flex items-center justify-between h-full cursor-pointer '>
            <div
                className='flex items-center gap-1 h-full w-full'>
                {IconBefore}
                <span
                    // className={clsx(`${fontWeight && 'font-medium text-black'}`)}>
                    className={clsx(fontWeight && 'font-medium text-black'
                        , text && 'font-medium text-black')}>
                    {text || defaultText}
                </span>
            </div>
            <span >
                {IconAfter}
            </span>
        </div>
    )
}

export default memo(SearchItem)