import axiosConfig from "../axiosConfig";

export const apiGetCurrent = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `user/getCurrent`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})