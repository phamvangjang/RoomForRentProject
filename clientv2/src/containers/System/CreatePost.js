import React, { useState } from 'react'
import { Address, Button, ChooseImages, Overview } from '../../components'
import { useSelector } from 'react-redux'
import { getCodes, getCodesAreas } from '../../ultils/Common/getCodes'
import { apiCreateNewPost } from '../../services'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'

const CreatePost = () => {
    const [invalidFields, setInvalidFields] = useState([])
    const { currentData } = useSelector(state => state.user)
    const { prices, areas, categories, provinces } = useSelector(state => state.app)
    const [payload, setPayload] = useState({
        categoryCode: '',
        title: '',
        priceNumber: 0,
        areaNumber: 0,
        images: '',
        address: '',
        //priceCode: '',
        //areaCode: '',
        description: '',
        target: '',
        province: ''
    })
    const handleSubmit = async () => {
        let priceCodeArr = getCodes(+payload.priceNumber / Math.pow(10, 6), prices, 1, 15)
        let priceCode = priceCodeArr[0]?.code

        let areaCodeArr = getCodesAreas(+payload.areaNumber, areas, 20, 90)
        let areaCode = areaCodeArr[0]?.code
        let finalPayload = {
            ...payload,
            priceCode,
            areaCode,
            areaNumber: +payload.areaNumber,
            priceNumber: +payload.priceNumber / Math.pow(10, 6),
            userId: currentData?.id,
            label: `${categories?.find(item => item.code === payload?.categoryCode)?.value}${payload?.address?.split(',')[1]}`,
            area: `${categories?.find(item => item.code === payload?.categoryCode)?.value}${payload?.address?.split(',')[2]}`,
        }

        //console.log('finalPayload\n',finalPayload)

        const result = validate(finalPayload, setInvalidFields)

        if (result > 0) {
            Swal.fire('Oops!', 'Please check the form again', 'error')
            return;
        } else {
            const response = await apiCreateNewPost(finalPayload)
            console.log('response\n', response)
            if (response?.data?.success) {
                Swal.fire('Successfully', response?.data?.msg, response?.data?.success.toString()).then(() => {
                    setPayload({
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
                })
            } else {
                Swal.fire('Oops!', 'Somethings was wrong', 'error')
            }
        }
    }
    return (
        <div className='p-10 h-full'>
            <h1 className='text-4xl border-b-[1px] border-[#dee2e6] pb-8 font-semibold'>New post</h1>
            <div className='flex gap-8 w-full h-full'>
                <div className='flex flex-col gap-5 flex-auto h-full'>
                    <Address
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <Overview
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <ChooseImages
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        payload={payload}
                        setPayload={setPayload}
                    />
                    <Button
                        text='Create new'
                        bgColor={'bg-green-600'}
                        onClick={handleSubmit}
                        textColor={'text-white'} />
                </div>
                <div className='w-[30%] flex-none h-full'>
                    map
                </div>
            </div>
        </div>
    )
}

export default CreatePost