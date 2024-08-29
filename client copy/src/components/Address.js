import React from 'react'
import SelectAddress from './SelectAddress'

const Address = () => {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Address for rent</h2>
            <div className='flex gap-2'>
                <div className='flex-1'>
                    <SelectAddress label={'Province/City'} />
                </div>
                <div className='flex-1'>
                    <SelectAddress label={'District'} />
                </div>
            </div>
            <div>
                <input
                    type='text'
                    readOnly
                    className='border border-gray-300 rounded-md p-2 w-full bg-[#e9ecef] outline-none' />
            </div>
        </div>
    )
}

export default Address