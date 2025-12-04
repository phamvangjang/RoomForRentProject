import React from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { apiGetPostsLimit } from '../../services/post';
import { useEffect } from 'react';

const DetailPost = () => {
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { post } = useSelector(state => state.post);
    console.log(post);
    useEffect(() => {
        if (postId) dispatch(apiGetPostsLimit({ id: postId }))
    }, [postId])
    console.log(post)
    return (
        <div>DetailPost</div>
    )
}

export default DetailPost