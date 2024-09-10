import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'auth/register',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})

export const apiSignIn = (payload) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'post',
            url: 'auth/signIn',
            data: payload
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})