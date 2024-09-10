import React, { memo } from 'react'

const Select = ({ label, options, value, setValue, name }) => {
    return (
        <div className='text-sm flex flex-col gap-1'>
            <label
                className='font-medium'
                htmlFor='select-addreess'>
                {label}
            </label>

            <select
                id='select-addreess'
                value={value}
                className='outline-none border border-gray-300 p-2 rounded-md w-full'
                onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({ ...prev, [name]: e.target.value }))}>
                <option>
                    {`--Chọn ${label}--`}
                </option>
                {options.length > 0 && options?.map(item => {
                    return (
                        <option
                            key={item?.code}
                            value={item?.code}>
                            {item?.value}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default memo(Select)