import React, { useEffect, useState } from 'react'
import Sitem from './Sitem'
import * as actions from '../store/actions'
import { useDispatch, useSelector } from 'react-redux'

const RelatedPost = ({ newPost }) => {
    const [posts, setPosts] = useState([]);
    const { newPosts, outStandingPosts } = useSelector(state => state.post)
    const dispatch = useDispatch()
    useEffect(() => {
        newPosts ? dispatch(actions.getNewPosts()) : dispatch(actions.getOutStandingPosts())
    }, [])
    useEffect(() => {
        newPosts ? setPosts(newPosts) : setPosts(outStandingPosts)
    }, [newPosts, outStandingPosts])

    return (
        <div className='bg-white w-full p-5 rounded-md'>
            <h3 className='text-lg font-semibold mb-3'>{newPost ? 'Tin mới đăng' : 'Tin nổi bật'}</h3>
            <div className='flex flex-col gap-2'>
                {posts?.map(item => {
                    return (
                        <Sitem
                            image={JSON.parse(item?.images?.image) || ''}
                            key={item?.id}
                            title={item?.title}
                            price={item?.attributes?.price}
                            createAt={item?.createdAt}
                            star={item?.star} />
                    )
                })}
            </div>
        </div>
    )
}

export default RelatedPost