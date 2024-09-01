import React, { useState } from 'react'
import { MdPhotoCamera } from "react-icons/md";
import { apiUploadImages } from '../services';

const ChooseImages = ({ setPayload }) => {
    const [imagesPreview, setImagesPreview] = useState([])
    const handleFiles = async (e) => {
        e.stopPropagation()
        let images = []
        let files = e.target.files
        let formData = new FormData()
        for (let i of files) {
            formData.append('file', i)
            formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME)
            const response = await apiUploadImages(formData)
            if (response.status === 200) {
                images = [...images, response?.data?.secure_url]
            }
        }
        setImagesPreview(images)
        setPayload(prev => ({ ...prev, images: JSON.stringify(images) }))
    }
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
                    onChange={handleFiles}
                    multiple
                    className='hidden w-full'
                    type='file'
                    id='file' />
            </div>
            <div className='flex gap-2 w-full'>
                {imagesPreview?.map(item => {
                    return (
                        <div 
                        key={item}
                        className='flex flex-col gap-2 justify-center items-center rounded-md shadow-md border w-44 h-44'>
                            <img
                                alt='preview'
                                src={item}
                                className='w-32 h-32 object-cover' />
                            <span>Xóa</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChooseImages