import { apiGetCategories } from '../../services/category'
import actionTypes from './actionTypes'

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apiGetCategories()
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                categories: response.data.response
            })
        } else {
            dispatch({
                type: actionTypes.GET_CATEGORIES,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_CATEGORIES,
            categories: null
        })
    }
}