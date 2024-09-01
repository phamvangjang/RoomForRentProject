import React, { useState } from 'react'
import { Address, ChooseImages, Overview } from '../../components'

const CreatePost = () => {
    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        image: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    console.log(payload)
    return (
        <div className='p-10 h-full'>
            <h1 className='text-4xl border-b-[1px] border-[#dee2e6] pb-8 font-semibold'>New post</h1>
            <div className='flex gap-8 w-full h-full'>
                <div className='flex flex-col gap-5 border-orange-400 border flex-auto h-full'>
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <ChooseImages payload={payload} setPayload={setPayload} />
                </div>
                <div className='w-[30%] flex-none'>map</div>
            </div>
        </div>
    )
}

export default CreatePost