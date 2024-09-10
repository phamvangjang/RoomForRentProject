import React from 'react'
import { text } from '../ultils/dataContact'
import Button from './Button'

const Contact = () => {
    return (
        <div className='container mx-auto bg-white rounded-md shadow-md p-8 text-[#233762] mt-8'>
            <div className='flex items-center justify-center'>
                <img
                    alt='thumnail'
                    src={text.images}
                    className='h-[150px] object-contain'
                />
            </div>
            <div className='px-3 mt-8'>
                <p className='text-center text-base mb-5'>{text.content}</p>
                <div className='flex justify-around items-center'>
                    {text.contacts.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className='flex flex-col items-center justify-center font-bold text-sm uppercase gap-1'>
                                <span className='text-title'>{item.text}</span>
                                <span className='text-lg'>{`Điện thoại: ${item.phone}`}</span>
                                <span className='text-lg'>{`Zalo: ${item.zalo}`}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div className='flex justify-center items-center mt-3'>
                <Button
                    bgColor='bg-[#3961fb]'
                    text={'Gửi liên hệ'}
                    textColor='text-white'
                />
            </div>
        </div>
    )
}

export default Contact