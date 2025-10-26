import React, { useState, useEffect } from 'react'
import { MdPhotoCamera } from "react-icons/md";
import { apiUploadImages } from '../services';
import { RiDeleteBinFill } from "react-icons/ri";
import Loading from './Loading';
import { useSelector } from 'react-redux';

const ChooseImages = ({ payload, setPayload, invalidFields }) => {
    const { dataEdit } = useSelector(state => state.post);
    const [isLoading, setIsLoading] = useState(false)
    const [imagesPreview, setImagesPreview] = useState([])
    const handleFiles = async (e) => {
        e.stopPropagation()
        setIsLoading(true)
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
        setIsLoading(false)
        setImagesPreview(prev => [...prev, ...images]);
        setPayload(prev => ({
            ...prev,
            images: [...(prev.images), ...images]
        }));
    }
    const handleDeleteImage = (image) => {
        setImagesPreview(prev => prev?.filter(item => item !== image))
        setPayload(prev => ({
            ...prev,
            images: prev.images?.filter(item => item !== image)
        }))
    }

    useEffect(() => {
        if (dataEdit) {
            let images = dataEdit ? JSON.parse(dataEdit?.images?.image) : ''
            setImagesPreview(images)
        }
    }, [dataEdit])
    return (
        <div className='flex flex-col gap-5 w-full'>
            <div className='flex flex-col gap-1'>
                <h2 className='text-2xl font-semibold pb-4'>Hình ảnh</h2>
                <small className='text-sm'>Cập nhật hình ảnh rõ ràng sẽ cho thuê nhanh hơn</small>
            </div>
            <div className='w-full flex flex-col items-center justify-start'>
                <label
                    className='w-full cursor-pointer border-2 border-dashed h-[200px] my-2 flex flex-col gap-2 justify-center items-center rounded-md'
                    htmlFor='file'>
                    {isLoading
                        ? <Loading />
                        : <div
                            className='flex flex-col gap-2 justify-center items-center'>
                            <MdPhotoCamera size={48} />
                            <span>Thêm ảnh</span>
                        </div>}
                </label>
                <input
                    onChange={handleFiles}
                    multiple
                    className='hidden w-full'
                    type='file'
                    id='file' />
                <small className='text-red-500 italic w-full block'>
                    {invalidFields?.some(item => item.name === 'images') && invalidFields?.find(item => item.name === 'images')?.messages}
                </small>
            </div>
            <div className='flex gap-3 w-full h-full'>
                {imagesPreview?.map(item => {
                    return (
                        <div
                            key={item}
                            className='w-[30%] h-full relative'>
                            <img
                                alt='preview'
                                src={item}
                                className='w-full h-full object-cover rounded-md shadow-md' />
                            <div
                                onClick={() => handleDeleteImage(item)}
                                title='Xóa'
                                className='absolute top-1 right-1 bg-gray-200 rounded-full p-2 hover:bg-gray-400 cursor-pointer'>
                                <RiDeleteBinFill />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ChooseImages