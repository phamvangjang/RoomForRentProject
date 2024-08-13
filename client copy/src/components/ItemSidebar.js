import React from 'react'
import { FaChevronRight } from "react-icons/fa";
import { createSearchParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { formatVietnameseToString } from '../ultils/Common/formatVnToString';
import *as actions from '../store/actions'
import { useDispatch } from 'react-redux';

const ItemSidebar = ({ title, content, isDouble, type }) => {
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const formatContent = () => {
        const oddEl = content?.filter((item, index) => index % 2 !== 0)
        const evenEl = content?.filter((item, index) => index % 2 === 0)
        const formatContent = oddEl?.map((item, index) => {
            return {
                right: item,
                left: evenEl?.find((item2, index2) => index2 === index)
            }
        })
        return formatContent
    }
    // console.log(formatContent())
    const handleFilterPosts = (code) => {
        // dispatch(actions.getPostsLimit({ [type]: code }))
        navigate({
            pathname: location.pathname,
            search: createSearchParams({
                'priceCode': code
            }).toString()
        });
    }
    return (
        <div className='bg-white w-full p-5 rounded-md'>
            <h3 className='text-lg font-semibold mb-3'>{title}</h3>
            {!isDouble && <div className='flex flex-col gap-2 justify-center'>
                {content?.length > 0 && content.map(item => {
                    return (
                        <Link
                            to={`${formatVietnameseToString(item.value)}`}
                            key={item.code}
                            className='flex gap-2 items-center text-main cursor-pointer hover:text-[#ff6600] border-b pb-2 border-gray-300 border-dashed'>
                            <FaChevronRight color='#aaa' />
                            <p>{item.value}</p>
                        </Link>
                    )
                })}
            </div>}
            {isDouble && <div className='flex flex-col gap-2 justify-center'>
                {content?.length > 0 && formatContent(content).map((item, index) => {
                    return (
                        <div

                            key={index}
                            className=''>
                            <div className='flex items-center justify-around'>
                                <div
                                    onClick={() => handleFilterPosts(item.left.code)}
                                    className='flex flex-1 gap-2 items-center text-main cursor-pointer hover:text-[#ff6600] border-b pb-2 border-gray-300 border-dashed'>
                                    <FaChevronRight
                                        color='#aaa' />
                                    <p>{item.left.value}</p>
                                </div>
                                <div
                                    onClick={() => handleFilterPosts(item.right.code)}
                                    className='flex flex-1 gap-2 items-center text-main cursor-pointer hover:text-[#ff6600] border-b pb-2 border-gray-300 border-dashed'>
                                    <FaChevronRight
                                        color='#aaa' />
                                    <p>{item.right.value}</p>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>}
        </div>
    )
}

export default ItemSidebar