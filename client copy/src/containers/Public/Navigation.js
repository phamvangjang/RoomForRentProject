import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { formatSlug } from '../../ultils/constant'
import { useDispatch, useSelector } from 'react-redux'
import * as actions from '../../store/actions'


const Navigation = () => {
    const { categories } = useSelector(state => state.app)
    const dispatch = useDispatch()
    // const [categories, setCategories] = useState([])
    useEffect(() => {
        dispatch(actions.getCategories())
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