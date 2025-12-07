import React from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '../ultils/constant'

const ProvinceBtn = ({ name, image, provinceCode }) => {
    const navigate = useNavigate()
    const handleOnClick = () => {
        const titleSearch = `Cho thuê ${name}, phòng trọ giá rẻ`
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams({ provinceCode }).toString()
        }, { state: { titleSearch } })
    }
    return (
        <div className='shadow-md rounded-bl-md rounded-br-md text-blue-700 hover:text-[#ff6600] cursor-pointer'
            onClick={handleOnClick}>
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