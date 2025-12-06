import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPostsLimit } from '../../store/actions/post';
import { SliderCustom } from '../../components';

const DetailPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);
    useEffect(() => {
        if (postId) {
            dispatch(getPostsLimit({ id: postId }));
        }
    }, [postId])
    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
            </div>
            <div className='w-[30%]'>
                content
            </div>
        </div>
    )
}

export default DetailPost