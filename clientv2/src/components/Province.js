import React from 'react'
import ProvinceBtn from './ProvinceBtn'
import { location } from '../ultils/constant'

const Province = () => {
    return (
        <div className='flex items-center gap-5 justify-center py-5 '>
            {location.map(item => {
                return (
                    <ProvinceBtn
                        key={item.id}
                        name={item.name}
                        image={item.image}
                        provinceCode={item.provinceCode}
                    />
                )
            })}
        </div>
    )
}

export default Province