import React, { useState } from 'react'
import { Button, Modal, SearchItem } from '../../components'
import { FaHotel, FaChevronRight, FaMoneyBill, FaCrop, FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { useSelector } from 'react-redux';

const Search = () => {
    const [name, setName] = useState('')
    const [content, setContent] = useState([])
    const [isShowModal, setIsShowModal] = useState(false)
    const { areas, prices, categories, provinces } = useSelector(state => state.app)
    const handleShowModal = (content, name) => {
        setContent(content)
        setName(name)
        setIsShowModal(true)
    }
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
                        text='Phòng trọ, nhà trọ' />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(provinces, 'province')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<CiLocationOn />}
                        text='Toàn quốc' />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(prices, 'price')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaMoneyBill />}
                        text='Chọn giá' />
                </span>
                <span
                    className='h-full flex-1 cursor-pointer'
                    onClick={() => handleShowModal(areas, 'area')}>
                    <SearchItem
                        IconAfter={<FaChevronRight />}
                        IconBefore={<FaCrop />}
                        text='Chọn diện tích' />
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
                setIsShowModal={setIsShowModal}
                name={name}
                content={content} />}
        </>
    )
}

export default Search