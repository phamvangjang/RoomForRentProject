import React, { memo } from 'react'
import { FaStar } from "react-icons/fa";
import { Button } from '../components'

const images = [
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/6310726d-d075-4e35-b1cb-cf5616bf5212_1658240491.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/9c60836e-26b2-4737-a6c8-60cb5187fa4c_1658240485.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/716c753e-8e03-4cc8-9d09-e52ec19ce01b_1658240485.jpg",
    "https://pt123.cdn.static123.com/images/thumbs/900x600/fit/2022/07/19/400e7ebd-5d88-48af-8599-0d074a1ee014_1658240494.jpg",
]
const Item = () => {
    return (
        <div className='w-full bg-secondary3 border-t-2 border-[#E13427]'>
            <div className='w-full flex py-4 px-5'>
                <div className='w-[40%] flex flex-wrap items-center'>
                    <img
                        src={images[0]}
                        className='w-[280px] h-[240px] object-cover'
                    />
                </div>
                <div className='w-[60%] pl-3 flex flex-col gap-4'>
                    <div className='flex items-start'>
                        <span className='flex items-center gap-1 text-yellow-400'><FaStar /><FaStar /><FaStar /><FaStar /><FaStar /></span>
                        <h2 className='text-sm text-title font-semibold'> NHÀ CHO THUÊ 5/99/ Nơ Trang Long P7 Bình Thạnh Nguyên căn, có gác rộng… </h2>
                    </div>

                    <div className='flex flex-col gap-1'>
                        <div className='flex items-center justify-around text-sm'>
                            <span className=' text-price font-bold'>8 triệu/tháng</span>
                            <span className='font-normal text-desc'>40m²</span>
                            <span className='font-normal text-main hover:underline cursor-pointer'>Quận Bình Thạnh, Hồ Chí Minh</span>
                        </div>
                        <small className='text-xs text-desc flex justify-end'>1 ngày trước</small>
                    </div>

                    <p className='text-desc text-sm'>
                        NHÀ CHO THUÊ 5/99/ Nơ Trang Long P7 Bình ThạnhCÓ cổng riêng ko chung chủ ở được 5 6 bạn thỏa mái Nhà mới sơn sửa sạch thoáng mátNguyên căn, có gác…
                    </p>

                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-1 '>
                            <img
                                alt='avatar'
                                src='https://icon-library.com/images/no-user-image-icon/no-user-image-icon-0.jpg'
                                className='w-[30px] h-[30px] rounded-full'
                            />
                            <span className='text-sm text-desc'>Co dung</span>
                        </div>
                        <div className='flex items-center gap-1'>
                            <Button bgColor={'bg-secondary1'} textColor={'text-white'} text={'Gọi 0908777457'} />
                            <Button bgColor={'bg-secondary1'} textColor={'text-white'} text={'Nhắn Zalo'} />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default memo(Item)