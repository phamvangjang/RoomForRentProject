import { apiRegister, apiSignIn } from '../../services/auth'
import actionTypes from './actionTypes'

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload)
        console.log(response)
        if (response?.data?.success) {
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.REGISTER_FAILED,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.REGISTER_FAILED,
            data: null
        })
    }
}

export const SignIn = (payload) => async (dispatch) => {
    try {
        const response = await apiSignIn(payload)
        // console.log(response)
        if (response?.data?.success) {
            dispatch({
                type: actionTypes.SIGNIN_SUCCESS,
                data: response.data.token
            })
        } else {
            dispatch({
                type: actionTypes.SIGNIN_FAILED,
                data: response.data.msg
            })
        }
    } catch (error) {
        dispatch({
            type: actionTypes.SIGNIN_FAILED,
            data: null
        })
    }
}

export const SignOut = () => ({
    type: actionTypes.LOGOUT
})