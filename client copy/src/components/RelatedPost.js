import React from 'react'
import Sitem from './Sitem'

const RelatedPost = () => {
    return (
        <div className='bg-white w-full p-5 rounded-md'>
            <h3 className='text-lg font-semibold mb-3'>Tin mới đăng</h3>
            <div className='flex flex-col gap-2'>
                <Sitem title={'Phòng Tâng lửng Tân Bình full nội thất gia siêu rẻ full nội thất gia siêu rẻ'} price={'5 triệu/tháng'} createAt={'1 giờ trước'} />
                <Sitem />
                <Sitem />
            </div>
        </div>
    )
}

export default RelatedPost