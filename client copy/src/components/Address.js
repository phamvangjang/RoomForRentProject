import React, { useState } from 'react'
import Select from './Select'
import LocationSelector from './LocationSelector'

const Address = () => {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Address for rent</h2>
            <div className='flex gap-2'>
                <div className='flex-1'>
                    <LocationSelector />
                </div>
            </div>

        </div>
    )
}

export default Address