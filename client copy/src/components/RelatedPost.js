import React, { useEffect } from 'react'
import Sitem from './Sitem'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const RelatedPost = () => {
    const { newPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(actions.getNewPosts())
    }, [])
    // console.log(newPosts)
    return (
        <div className='bg-white w-full p-5 rounded-md'>
            <h3 className='text-lg font-semibold mb-3'>Tin mới đăng</h3>
            <div className='flex flex-col gap-2'>
                {newPosts?.map(item => {
                    return (
                        <Sitem
                            image={JSON.parse(item?.images.image)}
                            key={item?.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            createAt={item?.createdAt} />
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedPost