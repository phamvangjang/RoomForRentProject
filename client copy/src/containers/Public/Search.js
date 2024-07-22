import React from 'react'
import { Button, SearchItem } from '../../components'
import { FaHotel, FaChevronRight, FaMoneyBill, FaCrop, FaSearch } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";

const Search = () => {
    return (
        <div className='h-[55px] container mx-auto my-4 py-[10px] px-[10px] bg-[#febb02] rounded-md flex items-center justify-around gap-2' >
            <SearchItem IconAfter={<FaChevronRight />} fontWeight IconBefore={<FaHotel />} text='Phong tro, nha tro' />
            <SearchItem IconAfter={<FaChevronRight />} IconBefore={<CiLocationOn />} text='Toan quoc' />
            <SearchItem IconAfter={<FaChevronRight />} IconBefore={<FaMoneyBill />} text='Chon gia' />
            <SearchItem IconAfter={<FaChevronRight />} IconBefore={<FaCrop />} text='Chon dien tich' />
            <Button
                text={'Search'}
                textColor='text-white'
                bgColor='bg-secondary1'
                IcBefore={FaSearch}
            />
        </div>
    )
}

export default Search