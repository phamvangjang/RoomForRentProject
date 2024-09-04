import React, { useState } from 'react'
import { Address, Button, ChooseImages, Overview } from '../../components'
import { useSelector } from 'react-redux'
import { getCodes, getCodesAreas } from '../../ultils/Common/getCodes'

const CreatePost = () => {
    const { prices, areas } = useSelector(state => state.app)
    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        priceCode: '',
        areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const handleSubmit = () => {
        let priceCodeArr = getCodes(+payload.priceNumber, prices, 1, 15)
        let priceCode = priceCodeArr[0]?.code
        let areaCodeArr = getCodesAreas(+payload.areaNumber, areas, 0, 90)
        let areaCode = areaCodeArr[0]?.code
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode
        }
        console.log(finalPayload)
    }
    // console.log({prices,areas})
    return (
        <div className='p-10 h-full'>
            <h1 className='text-4xl border-b-[1px] border-[#dee2e6] pb-8 font-semibold'>New post</h1>
            <div className='flex gap-8 w-full h-full'>
                <div className='flex flex-col gap-5 border-orange-400 border flex-auto h-full'>
                    <Address payload={payload} setPayload={setPayload} />
                    <Overview payload={payload} setPayload={setPayload} />
                    <ChooseImages payload={payload} setPayload={setPayload} />
                    <Button
                        text={'Create new'}
                        bgColor={'bg-green-600'}
                        onClick={handleSubmit}
                        textColor={'text-white'} />
                    <div className='h-[500px]'></div>
                </div>
                <div className='w-[30%] flex-none'>
                    map
                </div>
            </div>
        </div>
    )
}

export default CreatePost