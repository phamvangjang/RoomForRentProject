import React, { useCallback, useEffect, useState } from 'react'
import { Button, Modal, SearchItem } from '../../components'
import { FaHotel, FaChevronRight, FaMoneyBill, FaCrop, FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import * as actions from '../../store/actions'
import { createSearchParams, useNavigate } from 'react-router-dom';
import { path } from '../../ultils/constant';

const Search = () => {
    const navigate = useNavigate()
    const [defaultText, setDefaultText] = useState('')
    const dispatch = useDispatch()
    const [arrMinMax, setArrMinMax] = useState({})
    const [queries, setQueries] = useState({})
    const [name, setName] = useState('')
    const [content, setContent] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const { areas, prices, categories, provinces } = useSelector(state => state.app)

    useEffect(() => {
        if (!location.pathname.includes(path.SEARCH)) {
            setArrMinMax({})
            setQueries({})
        }
    }, [location])

    const handleShowModal = (content, name, defaultText) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
        setDefaultText(defaultText)
    }

    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, arrMaxMin }))
    }, [isShowModal, queries])

    const handleSearch = () => {
        const queryCodes = Object.entries(queries).filter(item => item[0].includes('Number') || item[0].includes('Code')).filter(item => item[1])
        let queryCodesObj = {}
        queryCodes.forEach(item => { queryCodesObj[item[0]] = item[1] })
        const queryText = Object.entries(queries).filter(item => !item[0].includes('Code') || !item[0].includes('Number'))
        let queryTextObj = {}
        queryText.forEach(item => { queryTextObj[item[0]] = item[1] })
        let titleSearch = `${queryTextObj.category
            ? queryTextObj.category
            : 'Cho thuê tất cả'} ${queryTextObj.province
                ? `tỉnh/thành ${queryTextObj.province}`
                : ''} ${queryTextObj.price
                    ? `giá ${queryTextObj.price}`
                    : ''} ${queryTextObj.area
                        ? `diện tích ${queryTextObj.area}`
                        : ''}`
        // console.log(titleSearch)
        navigate({
            pathname: path.SEARCH,
            search: createSearchParams(queryCodesObj).toString()
        }, { state: { titleSearch } })
    }
    return (
        <>
            <div
                className='h-[55px] container mx-auto my-4 py-[10px] px-[10px] bg-[#febb02] rounded-md flex items-center justify-around gap-2' >
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(categories, 'category', 'Tìm tất cả')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        fontWeight
                        IconBefore={<FaHotel />}
                        text={queries.category}
                        defaultText={'Tìm tất cả'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(provinces, 'province', 'Toàn quốc')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<CiLocationOn />}
                        text={queries.province}
                        defaultText={'Toàn quốc'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(prices, 'price', 'Chọn giá')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaMoneyBill />}
                        text={queries.price}
                        defaultText={'Chọn giá'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(areas, 'area', 'Chọn diện tích')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaCrop />}
                        text={queries.area}
                        defaultText={'Chọn diện tích'} />
                </span>
                <Button
                    onClick={handleSearch}
                    className={'flex-1'}
                    text={'Search'}
                    textColor='text-white'
                    bgColor='bg-secondary1'
                    IcBefore={FaSearch}
                />
            </div>
            {isShowModal && <Modal
                arrMinMax={arrMinMax}
                setIsShowModal={setIsShowModal}
                name={name}
                content={content}
                handleSubmit={handleSubmit}
                queries={queries}
                defaultText={defaultText} />}
        </>
    )
}

export default Search