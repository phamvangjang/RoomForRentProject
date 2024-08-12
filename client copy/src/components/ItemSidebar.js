import React from 'react'
import { FaChevronRight } from "react-icons/fa";

const ItemSidebar = ({ title, content }) => {
    return (
        <div className='bg-white w-full p-5 rounded-md'>
            <h3 className='text-lg font-semibold mb-3'>{title}</h3>
            <div className='flex flex-col gap-2 justify-center'>
                {content?.length > 0 && content.map(item => {
                    return (
                        <div
                            key={item.code}
                            className='flex gap-2 items-center text-main cursor-pointer hover:text-[#ff6600] border-b pb-2 border-gray-300 border-dashed'>
                            <FaChevronRight color='#aaa' />
                            <p>{item.value}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ItemSidebar