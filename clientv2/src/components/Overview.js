import React, { useEffect, useState } from 'react'
import Select from './Select'
import InputFormV2 from './InputFormV2'
import { useSelector } from 'react-redux'
import InputReadOnly from './InputReadOnly'

const targets = [
    {
        code: 'all',
        value: 'Tất cả'
    },
    {
        code: 'Nam',
        value: 'Nam'
    },
    {
        code: 'Nữ',
        value: 'Nữ'
    },
]
const Overview = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
    const { currentData } = useSelector(state => state.user)
    const { categories } = useSelector(state => state.app)
    const [typeOverview, setTypeOverview] = useState('')
    useEffect(() => {
        setTypeOverview(categories?.find(index => index.code === payload?.categoryCode)?.value)
    }, [typeOverview])
    // setPayload(prev => ({ ...prev, typeOverview }))
    // console.log(typeOverview)
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Overview description</h2>
            <div className='flex flex-col gap-4'>
                <div className='w-[50%]'>
                    <Select
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                        name='categoryCode'
                        setValue={setPayload}
                        value={payload.categoryCode}
                        options={categories}
                        label={'Loại chuyên mục'}
                    />
                </div>
                <div className='flex flex-col gap-1 w-full'>
                    <InputFormV2
                        value={payload.title}
                        setValue={setPayload}
                        label='Tiêu đề'
                        name='title'
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                </div>
                <div>
                    <label
                        htmlFor='desc'
                        className='text-sm font-medium'>
                        Nội dung mô tả
                    </label>
                    <textarea
                        id='desc'
                        cols='30'
                        rows='10'
                        className='w-full border rounded-md p-2'
                        value={payload.description}
                        onChange={(e) => setPayload(prev => ({ ...prev, description: e.target.value }))}
                        onFocus={() => setInvalidFields([])}>
                    </textarea>
                    <small className='text-red-500 italic text-xs'>
                        {invalidFields?.some(item => item.name === 'description') && invalidFields?.find(item => item.name === 'description')?.message}
                    </small>
                </div>
                <div className='flex flex-col gap-4 w-[50%]'>
                    <InputReadOnly
                        label={'Thông tin liên hệ'}
                        value={currentData?.name}
                    />
                    <InputReadOnly
                        label={'Điện thoại'}
                        value={currentData?.phone}
                    />
                    <InputFormV2
                        value={+payload.priceNumber}
                        setValue={setPayload}
                        name='priceNumber'
                        small='Nhập đầy đủ số, ví dụ 1 triệu thì nhập là 1000000'
                        unit={'Đồng'}
                        label={'Giá cho thuê'}
                        onFocus={() => setInvalidFields([])}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <small className='text-red-500 italic text-xs'>
                        {invalidFields?.some(item => item.name === 'priceNumber') && invalidFields?.find(item => item.name === 'priceNumber')?.message}
                    </small>
                    <InputFormV2
                        value={+payload.areaNumber}
                        setValue={setPayload}
                        name='areaNumber'
                        unit={'m2'}
                        label={'Diện tích'}
                        onFocus={() => setInvalidFields([])}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                    <small className='text-red-500 italic text-xs'>
                        {invalidFields?.some(item => item.name === 'areaNumber') && invalidFields?.find(item => item.name === 'areaNumber')?.message}
                    </small>
                    <Select
                        value={payload.target}
                        setValue={setPayload}
                        name='target'
                        options={targets}
                        label={'Đối tượng cho thuê'}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields}
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview