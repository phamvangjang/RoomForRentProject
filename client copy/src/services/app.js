import axios from "../axiosConfig";

export const apiGetPrices = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'price/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetAreas = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios({
            method: 'get',
            url: 'area/'
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})