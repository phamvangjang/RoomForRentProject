import * as apis from '../../services'
import actionTypes from './actionTypes'

export const getCategories = () => async (dispatch) => {
    try {
        const response = await apis.apiGetCategories()
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
export const getPrices = () => async (dispatch) => {
    try {
        const response = await apis.apiGetPrices()
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_PRICES,
                prices: response.data.response.sort((a,b)=>{return +a.order - +b.order})
            })
        } else {
            dispatch({
                type: actionTypes.GET_PRICES,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_PRICES,
            prices: null
        })
    }
}

export const getAreas = () => async (dispatch) => {
    try {
        const response = await apis.apiGetAreas()
        // console.log(response)
        if (response?.data.success) {
            dispatch({
                type: actionTypes.GET_AREAS,
                areas: response.data.response.sort((a,b)=>{return +a.order - +b.order})
            })
        } else {
            dispatch({
                type: actionTypes.GET_AREAS,
                msg: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.GET_AREAS,
            areas: null
        })
    }
}