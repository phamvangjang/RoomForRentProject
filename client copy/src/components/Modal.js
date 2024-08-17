import React, { memo, useEffect, useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr";

const Modal = ({ setIsShowModal, content, name }) => {

    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(100);
    useEffect(() => {
        const activedTrackE1 = document.getElementById('track-active')
        if (percent2 <= percent1) {
            activedTrackE1.style.left = `${percent2}%`
            activedTrackE1.style.right = `${100 - percent1}%`
        } else {
            activedTrackE1.style.left = `${percent1}%`
            activedTrackE1.style.right = `${100 - percent2}%`
        }
    }, [percent1, percent2])
    return (
        <div
            onClick={() => setIsShowModal(false)}
            className='fixed top-0 bottom-0 right-0 left-0 bg-overlay70 z-10 flex justify-center items-center'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShowModal(true)
                }}
                className='w-[30%] rounded-md bg-white'>
                <div className='h-[45px] border-b-[1px] border-gray-200 flex items-center px-4'>
                    <span
                        className='cursor-pointer hover:text-gray-400'
                        onClick={(e) => {
                            e.stopPropagation()
                            setIsShowModal(false)
                        }}
                    >
                        <GrLinkPrevious size={24} />
                    </span>
                </div>
                {(name === 'category' || name === 'province') &&
                    <div
                        className='p-4 flex flex-col gap-2'>
                        {content?.map(item => {
                            return (
                                <span
                                    key={item.code}
                                    className='flex items-center gap-2 border-b border-gray-200'>
                                    <input
                                        type='radio'
                                        id={item.code}
                                        value={item.code}
                                        name={name}
                                    />
                                    <label
                                        htmlFor={item.code}>
                                        {item.value}
                                    </label>
                                </span>
                            )
                        })}
                    </div>}
                {(name === 'area' || name === 'price') &&
                    <div className='p-10'>
                        <div className='flex items-center justify-center flex-col relative'>
                            <div
                                className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-400 rounded-full'>
                            </div>
                            <div
                                id='track-active'
                                className='slider-track-active h-[5px] absolute top-0 bottom-0 w-full bg-[#ff6600] rounded-full'>
                            </div>
                            <input
                                max='100'
                                min='0'
                                step='5'
                                type='range'
                                value={percent1}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => setPercent1(+e.target.value)}
                            />
                            <input
                                max='100'
                                min='0'
                                step='5'
                                type='range'
                                value={percent2}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => setPercent2(+e.target.value)}
                            />
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default memo(Modal)