import {
    apiGetNewPosts,
    apiGetPosts,
    apiGetPostsLimit,
    apiGetPostsLimitAdmin
} from '../../services/post'
import actionTypes from './actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        const response = await apiGetPosts()
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_POSTS,
                posts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS,
            posts: null
        })
    }
}
export const getPostsLimit = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimit(query)
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT,
            posts: null
        })
    }
}
export const getNewPosts = () => async (dispatch) => {
    try {
        const response = await apiGetNewPosts()
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_NEW_POSTS,
                newPosts: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_NEW_POSTS,
                msg: response.data.msg,
                newPosts: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_NEW_POSTS,
            newPosts: null
        })
    }
}

export const getPostsLimitAdmin = (query) => async (dispatch) => {
    try {
        const response = await apiGetPostsLimitAdmin(query)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_ADMIN,
                posts: response.data.response?.rows,
                count: response.data.response?.count
            })
        } else {
            dispatch({
                type: actionTypes.GET_POSTS_LIMIT_ADMIN,
                msg: response.data.msg,
                posts: null
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_POSTS_LIMIT_ADMIN,
            posts: null
        })
    }
}

export const editData = (dataEdit) => ({
    type: actionTypes.DATAEDIT,
    dataEdit
})

export const resetDataEdit = () => ({
    type: actionTypes.RESET_DATAEDIT
})