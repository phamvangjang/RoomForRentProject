import React from 'react'

const InputReadOnly = ({ label, value, direction, editPhone }) => {
    return (
        <div className={`flex text-sm ${direction ? direction : 'flex-col gap-1'}`}>
            <label
                htmlFor='exactly-address'
                className='font-medium w-48 flex-none'>
                {label}
            </label>
            <div className='flex-auto'>
                <input
                    id='exactly-address'
                    type='text'
                    readOnly
                    className='border outline-none p-2 w-full bg-[#e9ecef] rounded-md text-[#495057]'
                    value={value || ''}
                />
                {editPhone && <small className='text-blue-500 py-4 cursor-pointer'>Đổi số điện thoại</small>}
            </div>
        </div>
    )
}

export default InputReadOnly