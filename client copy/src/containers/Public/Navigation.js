import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { apiGetCategories } from '../../services/category'
import { formatSlug } from '../../ultils/constant'


const Navigation = () => {
    const [categories, setCategories] = useState([])
    useEffect(() => {
        const fetchCategories = async () => {
            const response = await apiGetCategories()
            // console.log(response)
            if (response?.data?.success) {
                setCategories(response.data.response)
            }
        }
        fetchCategories()
    }, [])

    const noActive = 'hover:bg-secondary2 px-4 h-full items-center flex '
    const active = 'hover:bg-secondary2 px-4 h-full items-center flex  bg-secondary2'
    return (
        <div className='w-full bg-secondary1 text-white flex items-center h-10'>
            <div className='container mx-auto flex items-center text-sm font-medium h-full'>
                <NavLink
                    className={({ isActive }) => isActive ? active : noActive}
                    to={`/`}>Trang chủ</NavLink>
                {categories?.length > 0 && categories.map(item => {
                    return (
                        <div
                            className='h-full flex justify-center items-center'
                            key={item.code}>
                            <NavLink
                                className={({ isActive }) => isActive ? active : noActive}
                                to={`/${formatSlug(item.value)}`}>{item.value}</NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Navigation