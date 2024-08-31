import React, { memo } from 'react'

const Select = ({ label, options }) => {
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
                    value=''>
                    {`--Chọn ${label}--`}
                </option>
                {options.length > 0 && options?.map(item => {
                    return (
                        <option
                            key={item?.id}
                            value={item?.id}>
                            {item?.value}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default memo(Select)