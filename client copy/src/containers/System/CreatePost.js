import React from 'react'
import { Address, ChooseImages, Overview } from '../../components'

const CreatePost = () => {
    return (
        <div className='p-10 h-full'>
            <h1 className='text-4xl border-b-[1px] border-[#dee2e6] pb-8 font-semibold'>New post</h1>
            <div className='flex gap-8 w-full h-full'>
                <div className='flex flex-col gap-5 border-orange-400 border flex-auto h-full'>
                    <Address />
                    <Overview />
                    <ChooseImages/>
                </div>
                <div className='w-[30%] flex-none'>map</div>
            </div>
        </div>
    )
}

export default CreatePost