import actionTypes from "../actions/actionTypes";
const initState = {
    posts: [],
    newPosts: [],
    msg: '',
    postOfCurrent: [],
    count: 0,
    dataEdit: {}
}

const postReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_POSTS:
        case actionTypes.GET_POSTS_LIMIT:
            return {
                ...state,
                posts: action.posts || [],
                msg: action.msg || '',
                count: action.count || 0
            }
        case actionTypes.GET_NEW_POSTS:
            return {
                ...state,
                msg: action.msg || '',
                newPosts: action.newPosts || []
            }
        case actionTypes.GET_POSTS_LIMIT_ADMIN:
            return {
                ...state,
                msg: action.msg || '',
                postOfCurrent: action.posts || [],
                count: action.count || 0
            }
        case actionTypes.DATAEDIT:
            return {
                ...state,
                dataEdit: action.dataEdit || {}
            }

        default:
            return state;
    }
}

export default postReducer