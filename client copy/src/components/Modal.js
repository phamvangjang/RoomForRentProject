import React, { useEffect, useState } from 'react'
import { GrLinkPrevious } from "react-icons/gr";
import clsx from 'clsx'

const Modal = ({ setIsShowModal, content, name, handleSubmit, queries }) => {
    const [activedEl, setActivedEl] = useState('')
    const [percent1, setPercent1] = useState(0);
    const [percent2, setPercent2] = useState(100);
    useEffect(() => {
        const activedTrackEl = document.getElementById('track-active')
        if (activedEl) {
            if (percent2 <= percent1) {
                activedTrackEl.style.left = `${percent2}%`
                activedTrackEl.style.right = `${100 - percent1}%`
            } else {
                activedTrackEl.style.left = `${percent1}%`
                activedTrackEl.style.right = `${100 - percent2}%`
            }
        }
    }, [percent1, percent2])

    const handleClickTrack = (e, value) => {
        const stackE1 = document.getElementById('track')
        const stackRect = stackE1.getBoundingClientRect()
        let percent = value ? value : Math.round((e.clientX - stackRect.left) * 100 / stackRect.width, 0)
        if (Math.abs(percent - percent1) <= (Math.abs(percent - percent2))) {
            setPercent1(percent)
        } else {
            setPercent2(percent)
        }
    }
    const convert100toTarget = percent => {
        return name === 'price'
            ? (Math.ceil(Math.round((percent * 1.5)) / 5) * 5) / 10
            : name === 'area'
                ? (Math.ceil(Math.round((percent * 0.9)) / 5) * 5)
                : 0
    }
    const convertTo100 = percent => {
        let target = name === 'price' ? '15' : name === 'area' ? 90 : 1
        return Math.floor((percent / target) * 100)
    }
    const getNumbers = (string) => string.split(' ').map(item => +item).filter(item => !item === false)
    const getNumbersArea = (string) => string.split(' ').map(item => +item.match(/\d+/)).filter(item => item !== 0)
    const handleActive = (code, value) => {
        setActivedEl(code)
        let arrMaxMin = name === 'price'
            ? getNumbers(value)
            : getNumbersArea(value)
        if (arrMaxMin.length === 1) {
            if (arrMaxMin[0] === 1) {
                setPercent1(0)
                setPercent2(convertTo100(1))
            }
            if (arrMaxMin[0] === 20) {
                setPercent1(0)
                setPercent2(convertTo100(20))
            }
            if (arrMaxMin[0] === 15 || arrMaxMin[0] === 90) {
                setPercent1(100)
                setPercent2(100)
            }
        }
        if (arrMaxMin.length === 2) {
            setPercent1(convertTo100(arrMaxMin[0]))
            setPercent2(convertTo100(arrMaxMin[1]))
        }
    }
    return (
        <div
            onClick={() => setIsShowModal(false)}
            className='fixed top-0 bottom-0 right-0 left-0 bg-overlay70 z-10 flex justify-center items-center'>
            <div
                onClick={(e) => {
                    e.stopPropagation()
                    setIsShowModal(true)
                }}
                className='w-[50%] rounded-md bg-white'>
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
                        className='p-4 flex flex-col gap-4'>
                        {content?.map(item => {
                            return (
                                <span
                                    key={item.code}
                                    className='flex items-center gap-3 border-b border-gray-200'>
                                    <input
                                        checked={item.code === queries[`${name}Code`] ? true : false}
                                        type='radio'
                                        id={item.code}
                                        value={item.code}
                                        name={name}
                                        onClick={(e) => handleSubmit(e, {
                                            [name]: item.value,
                                            [`${name}Code`]: item.code
                                        })}
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
                                {(percent1 === 100 && percent2 === 100)
                                    ? `Trên ${convert100toTarget(percent1)} ${name === 'price' ? 'triệu' : 'm2'} +`
                                    : `Từ ${percent1 <= percent2
                                        ? convert100toTarget(percent1)
                                        : convert100toTarget(percent2)} - ${percent2 > percent1
                                            ? convert100toTarget(percent2)
                                            : convert100toTarget(percent1)} ${name === 'price'
                                                ? 'triệu'
                                                : 'm2'}`}
                            </h2>
                            <div
                                id='track'
                                onClick={handleClickTrack}
                                className='slider-track h-[5px] absolute top-0 bottom-0 w-full bg-gray-400 rounded-full'>
                            </div>
                            <div
                                id='track-active'
                                onClick={handleClickTrack}
                                className='slider-track-active h-[5px] absolute top-0 bottom-0 bg-[#ff6600] rounded-full'>
                            </div>
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type='range'
                                value={percent1}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => {
                                    setPercent1(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}
                            />
                            <input
                                max='100'
                                min='0'
                                step='1'
                                type='range'
                                value={percent2}
                                className='absolute top-0 bottom-0 w-full appearance-none pointer-events-none'
                                onChange={(e) => {
                                    setPercent2(+e.target.value)
                                    activedEl && setActivedEl('')
                                }}
                            />
                            <div className='absolute z-30 top-6 left-0 right-0 w-full flex justify-between'>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 0)
                                    }}
                                    className='mx-3'>
                                    0
                                </span>
                                <span
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        handleClickTrack(e, 100)
                                    }}
                                    className='mr-[-14px]'>
                                    {(name === 'price' && '15 triệu +') || (name === 'area' && 'Trên 90 m2')}
                                </span>
                            </div>
                        </div>
                        <div
                            className='mt-20'>
                            <h3
                                className='text-main text-sm my-4 font-semibold'>
                                Chọn nhanh:
                            </h3>
                            <div
                                className='flex items-center gap-2 flex-wrap w-full'>
                                {content?.map(item => {
                                    return (
                                        <button
                                            onClick={() => handleActive(item.code, item.value)}
                                            key={item.code}
                                            className={clsx(`px-4 py-2 rounded-md text-sm cursor-pointer bg-[#f1f1f1] text-main`,
                                                (item.code === activedEl) && 'bg-secondary4 text-white'
                                            )}
                                        >
                                            {item.value}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>}
                {(name === 'area' || name === 'price') &&
                    <button
                        type='button'
                        className='w-full bg-[#faa500] text-black text-sm cursor-pointer font-semibold py-3 rounded-b-md uppercase '
                        // onClick={(e) => handleSubmit(e, { [name]: item.code })}
                        >
                        Áp dụng
                    </button>}
            </div>
        </div >
    )
}

export default Modal