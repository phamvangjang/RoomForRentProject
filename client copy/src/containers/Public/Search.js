import React, { useCallback, useState } from 'react'
import { Button, Modal, SearchItem } from '../../components'
import { FaHotel, FaChevronRight, FaMoneyBill, FaCrop, FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from 'react-redux';
import { getNumbersArea, getNumbersPrice } from '../../ultils/Common/getNumbers';
import { getCodes, getCodesAreas } from '../../ultils/Common/getCodes';

const Search = () => {
    const [arrMinMax, setArrMinMax] = useState({})
    const [queries, setQueries] = useState({})
    const [name, setName] = useState('')
    const [content, setContent] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const { areas, prices, categories, provinces } = useSelector(state => state.app)
    // console.log(getNumbersPrice(prices))
    // console.log(getNumbersArea(areas))
    const handleShowModal = (content, name) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
    }

    const handleSubmit = useCallback((e, query, arrMaxMin) => {
        e.stopPropagation()
        setQueries(prev => ({ ...prev, ...query }))
        setIsShowModal(false)
        arrMaxMin && setArrMinMax(prev => ({ ...prev, arrMaxMin }))
    }, [isShowModal, queries])
    // console.log(queries)
    // console.log(getCodesAreas([20, 80], areas))
    return (
        <>
            <div
                className='h-[55px] container mx-auto my-4 py-[10px] px-[10px] bg-[#febb02] rounded-md flex items-center justify-around gap-2' >
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(categories, 'category')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        fontWeight
                        IconBefore={<FaHotel />}
                        text={queries.category}
                        defaultText={'Phòng trọ, nhà trọ'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(provinces, 'province')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<CiLocationOn />}
                        text={queries.province}
                        defaultText={'Toàn quốc'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(prices, 'price')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaMoneyBill />}
                        text={queries.price}
                        defaultText={'Chọn giá'} />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(areas, 'area')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaCrop />}
                        text={queries.area}
                        defaultText={'Chọn diện tích'} />
                </span>
                <Button
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
                queries={queries} />}
        </>
    )
}

export default Search