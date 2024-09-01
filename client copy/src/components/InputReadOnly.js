import React from 'react'

const InputReadOnly = ({ label, value }) => {
    return (
        <div className='text-sm flex flex-col gap-1 '>
            <label
                htmlFor='exactly-address'
                className='font-medium'>
                {label}
            </label>
            <input
                id='exactly-address'
                type='text'
                readOnly
                className='border outline-none p-2 w-full bg-[#e9ecef] rounded-md text-[#495057]'
                value={value || ''}
            />
        </div>
    )
}

export default InputReadOnly