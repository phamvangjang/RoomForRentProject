import React from 'react'
import { text } from '../ultils/Common/dataIntro'
import { FaStar } from 'react-icons/fa'
import Button from './Button'

const stars = [1, 2, 3, 4, 5]
const Intro = () => {
    return (
        <div className='container mx-auto bg-white rounded-md shadow-md text-main p-5'>
            <div className='pt-5 px-12 pb-12'>
                <h3 className='font-bold text-lg items-center justify-center flex'>{text.title}</h3>
                <p className='text-sm text-center my-3'>{text.description}</p>
                <div className='flex items-center justify-around'>
                    {text.statistic.map((item, index) => {
                        return (
                            <div
                                className='flex flex-col items-center justify-center gap-1'
                                key={index}
                            >
                                <h4 className='text-xl font-bold'>{item.value}</h4>
                                <p className='text-sm'>{item.name}</p>
                            </div>
                        )
                    })}
                </div>
                <h3 className='text-center text-lg font-bold mt-3'>{text.price}</h3>
                <div className='flex justify-center items-center gap-2 flex-row my-1'>
                    {stars.map(item => {
                        return (
                            <span
                                className=''
                                key={item}>
                                <FaStar color='#ffd454' size={24} />
                            </span>
                        )
                    })}
                </div>
                <div className='flex flex-col justify-center items-center text-sm my-3'>
                    <p className='text-center italic'>{text.comment}</p>
                    <div className='text-center mt-2'>{text.author}</div>
                </div>
                <h3 className='text-center text-lg font-bold'>{text.question}</h3>
                <p className='text-sm text-center my-3'>{text.answer}</p>
                <div className='flex justify-center items-center'>
                    <Button
                        text={'Đăng ký ngay'}
                        bgColor='bg-secondary2'
                        textColor='text-white'
                    />
                </div>
            </div>
        </div>
    )
}

export default Intro