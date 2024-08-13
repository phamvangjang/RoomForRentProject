import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { PageNumber } from '../../components'
import { useEffect } from 'react';
import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

const Pagination = ({ page }) => {
    const [isHideEnd, setIsHideEnd] = useState(false)
    const [isHideStart, setIsHideStart] = useState(false)
    const { count, posts } = useSelector(state => state.post)
    const [arrPage, setArrPage] = useState([])
    const [currentPage, setCurrentPage] = useState(+page || 1)
    useEffect(() => {
        let maxPage = Math.ceil(count / process.env.REACT_APP_LIMIT_POSTS)
        let end = (currentPage + 1) > maxPage ? maxPage : (currentPage + 1)
        let start = (currentPage - 1) <= 0 ? 1 : (currentPage - 1)
        let temp = []
        for (let i = start; i <= end; i++) temp.push(i)
        setArrPage(temp)
        currentPage >= (maxPage - 1) ? setIsHideEnd(true) : setIsHideEnd(false)
        currentPage <= 2 ? setIsHideStart(true) : setIsHideStart(false)

    }, [count, posts, currentPage])
    return (
        <div className='flex items-center justify-center gap-1 mt-5 mb-12'>
            {!isHideStart &&
                <PageNumber
                    icon={<FaAngleDoubleLeft />}
                    setCurrentPage={setCurrentPage}
                    text={1}
                />}
            {!isHideStart &&
                <PageNumber
                    text={'...'}
                />}
            {(arrPage.length > 0) && arrPage.map(item => {
                return (
                    <PageNumber
                        key={item}
                        text={item}
                        setCurrentPage={setCurrentPage}
                        currentPage={currentPage || setCurrentPage(1)}
                    />
                )
            })}
            {!isHideEnd && <PageNumber text={'...'} />}
            {!isHideEnd &&
                <PageNumber
                    icon={<FaAngleDoubleRight />}
                    setCurrentPage={setCurrentPage}
                    text={Math.floor(count / posts.length)}
                />}

        </div>
    )
}

export default Pagination