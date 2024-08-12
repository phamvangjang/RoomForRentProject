import React, { memo } from 'react'
import { createSearchParams, useNavigate } from 'react-router-dom'
const notActive = 'w-[46px] h-[48px] flex items-center justify-center text-main bg-white hover:bg-[#ddd] rounded-md cursor-pointer'
const active = 'w-[46px] h-[48px] flex items-center justify-center text-white bg-[#E13427] rounded-md'
const PageNumber = ({ text, currentPage, icon, setCurrentPage }) => {
    const navigate = useNavigate()
    const handleChangPage = () => {
        if (!(text === '...')) {
            setCurrentPage(+text)
            navigate({
                pathname: '/',
                search: createSearchParams({
                    page: text
                }).toString()
            });
        }
    }
    return (
        <div
            onClick={handleChangPage}
            className={+text === +currentPage ? active : notActive}
        >{icon || text}
        </div>
    )
}

export default memo(PageNumber)