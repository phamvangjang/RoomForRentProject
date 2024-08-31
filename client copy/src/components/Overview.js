import React from 'react'
import Select from './Select'
import InputFormV2 from './InputFormV2'
import { useSelector } from 'react-redux'

const targets = [
    {
        id: 'all',
        value: 'Tất cả'
    },
    {
        id: 'male',
        value: 'Nam'
    },
    {
        id: 'female',
        value: 'Nữ'
    },
]
const Overview = () => {
    const { currentData } = useSelector(state => state.user)
    const { categories } = useSelector(state => state.app)
    console.log(categories)
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Overview description</h2>
            <div className='flex flex-col gap-4'>
                <div className='w-[50%]'>
                    <Select
                        options={categories}
                        label={'Loại chuyên mục'}
                    />
                </div>
                <div>
                    <InputFormV2
                        label={'Tiêu đề'}
                    />
                </div>
                <div>
                    <label
                        htmlFor='text-desc'
                        className='text-sm font-medium'
                    >
                        Nội dung mô tả
                    </label>
                    <textarea className='w-full min-h-[220px] border rounded-md p-2'>

                    </textarea>
                </div>
                <div className='flex flex-col gap-4 w-[50%]'>
                    <InputFormV2
                        info
                        label={'Thông tin liên hệ'}
                        value={currentData?.name}
                    />
                    <InputFormV2
                        info
                        label={'Điện thoại'}
                        value={currentData?.phone}
                    />
                    <InputFormV2
                        unit={'Đồng'}
                        label={'Giá cho thuê'}
                    />
                    <InputFormV2
                        unit={'m2'}
                        label={'Diện tích'}
                    />
                    <Select
                        options={targets}
                        label={'Đối tượng cho thuê'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Overview