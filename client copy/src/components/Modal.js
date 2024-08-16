import React, { memo } from 'react'
import { GrLinkPrevious } from "react-icons/gr";

const Modal = ({ setIsShowModal, content, name }) => {
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
                </div>
            </div>
        </div>
    )
}

export default memo(Modal)