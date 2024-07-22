import React from 'react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className='shadow-md rounded-bl-md rounded-br-md hover:text-[#ff6600] cursor-pointer'>
            <img
                src={image}
                alt={name}
                className='w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
            />
            <div className='font-medium p-2 text-blue-700 text-center hover:text-[#ff6600]'>{name}</div>
        </div>
    )
}

export default ProvinceBtn