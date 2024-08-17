import React, { useEffect, useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr";

const Modal = ({ setIsShowModal, content, name }) => {

    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(100);
    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (percent2 <= percent1) {
            activedTrackEl.style.left = `${percent2}%`
            activedTrackEl.style.right = `${100 - percent1}%`
        } else {
            activedTrackEl.style.left = `${percent1}%`
            activedTrackEl.style.right = `${100 - percent2}%`
        }
    }, [percent1, percent2])

    const handleClickStack = (e) => {
        const stackE1 = document.getElementById('track')
        const stackRect = stackE1.getBoundingClientRect()
        let percent = Math.round((e.clientX - stackRect.left) * 100 / stackRect.width, 0)
        if (Math.abs(percent - percent1) <= (Math.abs(percent - percent2))) {
            setPercent1(percent)
        } else {
            setPercent2(percent)
        }
    }
    const convert100to15 = percent => (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
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
                    <div className='p-10 py-12'>
                        <div className='flex items-center justify-center flex-col relative'>
                            <h2
                                className='absolute z-30 top-[-48px] font-bold text-xl text-[#e97e38]'>
                                {`${percent1 <= percent2
                                    ? convert100to15(percent1)
                                    : convert100to15(percent2)} - 
                                    ${percent2 > percent1
                                        ? convert100to15(percent2)
                                        : convert100to15(percent1)} triệu`}
                            </h2>
                            <div
                                id='track'
                                onClick={handleClickStack}
                                className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-400 rounded-full'>
                            </div>
                            <div
                                id='track-active'
                                onClick={handleClickStack}
                                className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-[#ff6600] rounded-full'>
                            </div>
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type='range'
                                value={percent1}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => setPercent1(+e.target.value)}
                            />
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type='range'
                                value={percent2}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => setPercent2(+e.target.value)}
                            />
                            <div className='absolute z-30 top-6 left-0 right-0 w-full flex justify-between'>
                                <span className='mx-3'>0</span>
                                <span className='mr-[-14px]'>15 triệu +</span>
                            </div>
                        </div>
                    </div>}
            </div>
        </div>
    )
}

export default Modal