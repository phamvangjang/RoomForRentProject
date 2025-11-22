import React, { useState } from 'react'
import { Address, Button, ChooseImages, Overview } from '../../components'
import { useSelector } from 'react-redux'
import { getCodes, getCodesAreas } from '../../ultils/Common/getCodes'
import { apiCreateNewPost, apiUpdatePost } from '../../services'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import { useDispatch } from 'react-redux'
import { resetDataEdit } from '../../store/actions/post'

const CreatePost = ({ isEdit }) => {
    const dispatch = useDispatch();
    const dataEdit = useSelector(state => state.post.dataEdit);
    const [invalidFields, setInvalidFields] = useState([]);
    const { currentData } = useSelector(state => state.user);
    const { prices, areas, categories, provinces } = useSelector(state => state.app);
    const [payload, setPayload] = useState(() => {
        const initData = {
            categoryCode: dataEdit?.overviews?.type || '',
            title: dataEdit?.title || '',
            priceNumber: dataEdit ? +dataEdit?.priceNumber * Math.pow(10, 6) : 0,
            areaNumber: dataEdit ? +dataEdit?.areaNumber : 0,
            images: dataEdit?.images?.image ? JSON.parse(dataEdit?.images?.image) : '',
            address: dataEdit?.address || '',
            priceCode: dataEdit?.priceCode || '',
            areaCode: dataEdit?.areaCode || '',
            description: dataEdit?.description ? JSON.parse(dataEdit?.description) : '',
            target: dataEdit?.overviews?.target || '',
            province: dataEdit?.overviews?.province || ''
        }
        return initData
    });

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

        const result = validate(finalPayload, setInvalidFields)
        if (dataEdit) {
            finalPayload.postId = dataEdit.id
            finalPayload.attributesId = dataEdit.attributesId
            finalPayload.imagesId = dataEdit.imagesId
            finalPayload.overviewId = dataEdit.overviewId
        }
        console.log(finalPayload);

        if (result !== 0) {
            Swal.fire('Oops!', 'Please check the form again', 'error')
        } else {
            if (isEdit && dataEdit) {
                console.log('Final payload: ', finalPayload);
                const response = await apiUpdatePost(finalPayload);
                if (response?.data?.success) {
                    Swal.fire('Updated Post Successfully', response?.data?.msg, 'success').then(() => {
                        resetPayload();
                        dispatch(resetDataEdit());
                    })
                } else {
                    Swal.fire('Oops!', 'Somethings was wrong', 'error')
                }
            } else {
                const response = await apiCreateNewPost(finalPayload)
                if (response?.data?.success) {
                    Swal.fire('Successfully', response?.data?.msg, 'success').then(() => {
                        resetPayload();
                    })
                } else {
                    Swal.fire('Oops!', 'Somethings was wrong', 'error')
                }
            }
        }
    }

    const resetPayload = () => {
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
    }


    return (
        <div className='p-10 h-full'>
            <h1 className='text-4xl border-b-[1px] border-[#dee2e6] pb-8 font-semibold'>
                {isEdit ? 'Cập nhật bài viết' : 'Tạo bài viết mới'}
            </h1>
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
                        text={isEdit ? 'Cập nhật' : 'Tạo bài viết mới'}
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