import axiosConfig from "../axiosConfig";
import axios from "axios";

export const apiGetPosts = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `post/`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})
export const apiGetPostsLimit = (query) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `post/limit`,
            params: query
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})