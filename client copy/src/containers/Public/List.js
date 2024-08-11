import React, { useEffect } from 'react'
import { Button, Item } from '../../components'
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, getPostsLimit } from '../../store/actions/post'

const List = () => {
    const dispatch = useDispatch()
    const { posts,count } = useSelector(state => state.post)
    useEffect(() => {
        dispatch(getPostsLimit())
    }, [])
    // console.log(count)
    return (
        <div className='w-full py-5 shadow-md rounded-md text-main bg-white'>
            <div className='px-5'>
                <h1 className='text-lg font-bold '>Tổng 129.972 kết quả</h1>
            </div>
            <div className='flex items-center gap-2 my-3 px-5'>
                <span>Sắp xếp</span>
                <Button bgColor='bg-gray-200' text={'Mặc định'} />
                <Button bgColor='bg-gray-200' text={'Mới nhất'} />
                <Button bgColor='bg-gray-200' text={'Có Video'} />
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
                        />
                    )
                })}
            </div>
            
        </div>
    )
}

export default List