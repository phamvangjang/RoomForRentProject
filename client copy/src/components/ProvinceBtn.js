import React from 'react'

const ProvinceBtn = ({ name, image }) => {
    return (
        <div className='shadow-md rounded-bl-md rounded-br-md text-blue-700 hover:text-[#ff6600] cursor-pointer'>
            <img
                src={image}
                alt={name}
                className='w-[190px] h-[110px] object-cover rounded-tl-md rounded-tr-md'
            />
            <div className='font-medium p-2  text-center'>{name}</div>
        </div>
    )
}

export default ProvinceBtn