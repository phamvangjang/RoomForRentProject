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
export const apiGetPostsLimit = (page) => new Promise(async (resolve, reject) => {
    try {
        const response = await axiosConfig({
            method: 'get',
            url: `post/limit?page=${page}`
        })
        resolve(response)
    } catch (error) {
        reject(error)
    }
})