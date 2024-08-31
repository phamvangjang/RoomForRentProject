import React from 'react'
import { MdPhotoCamera } from "react-icons/md";

const ChooseImages = () => {
    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-semibold pb-4'>Hình ảnh</h2>
                <small className='text-sm'>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            </div>
            <div className='w-full'>
                <label
                    className='w-full cursor-pointer border-2 border-dashed h-[200px] my-2 flex flex-col gap-2 justify-center items-center rounded-md'
                    htmlFor='file'>
                    <MdPhotoCamera size={48} />
                    <span>Thêm ảnh</span>
                </label>
                <input
                    className='hidden w-full'
                    type='file'
                    id='file' />
            </div>
        </div>
    )
}

export default ChooseImages