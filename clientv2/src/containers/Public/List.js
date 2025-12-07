import React, { memo, useEffect, useState } from 'react'
import { Item } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPostsLimit } from '../../store/actions/post'
import { useSearchParams } from 'react-router-dom'

const List = ({ categoryCode }) => {
    const [sort, setSort] = useState(0);
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { posts } = useSelector(state => state.post)
    useEffect(() => {
        let params = []
        for (let entry of searchParams.entries()) {
            params.push(entry);
        }
        let searchParamsObject = {}
        params?.forEach(i => {
            if (Object.keys(searchParamsObject)?.some(item => item === i[0])) {
                searchParamsObject[i[0]] = [...searchParamsObject[i[0]], i[1]]
            } else {
                searchParamsObject = { ...searchParamsObject, [i[0]]: [i[1]] }
            }
        })
        // params?.map(i => { searchParamsObject = { ...searchParamsObject, [i[0]]: i[1] } })
        if (categoryCode) searchParamsObject.categoryCode = categoryCode
        if (sort === 1) searchParamsObject.order = ['createdAt', 'DESC']
        dispatch(getPostsLimit(searchParamsObject))
    }, [searchParams, categoryCode, sort])
    return (
        <div className='w-full py-5 shadow-md rounded-md text-main bg-white'>
            <div className='px-5'>
                <h1 className='text-lg font-bold '>Tổng 129.972 kết quả</h1>
            </div>
            <div className='flex items-center gap-2 my-3 px-5'>
                <span>Sắp xếp</span>
                <span onClick={() => setSort(0)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 0 && 'font-bold'}`}>Mặc định</span>
                <span onClick={() => setSort(1)} className={`bg-gray-200 p-2 rounded-md cursor-pointer hover:underline ${sort === 1 && 'font-bold'}`}>Mới nhất</span>
                {/* <Button bgColor='bg-gray-200' text={'Có Video'} /> */}
            </div>
            <div >
                {posts.length > 0 && posts.map(item => {
                    return (
                        <Item
                            key={item?.id}
                            address={item?.address}
                            attributes={item?.attributes}
                            images={JSON.parse(item?.images?.image)}
                            star={item?.star}
                            description={JSON.parse(item?.description)}
                            title={item?.title}
                            user={item?.user}
                            id={item?.id}
                        />
                    )
                })}
            </div>

        </div>
    )
}

export default memo(List)