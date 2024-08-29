import React, { memo } from 'react'

const SelectAddress = ({ label }) => {
    return (
        <div className='text-sm flex flex-col gap-1'>
            <label
                className='font-medium'
                htmlFor='select-addreess'>
                {label}
            </label>
            <select
                id='select-addreess'
                className='outline-none border border-gray-300 p-2 rounded-md w-full'>
                <option
                    value={''}>
                    {`--Choose ${label}--`}
                </option>
            </select>
        </div>
    )
}

export default memo(SelectAddress)