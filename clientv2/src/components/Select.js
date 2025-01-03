import React, { memo } from 'react'

const Select = ({
    label,
    options,
    value,
    setValue,
    name,
    invalidFields,
    setInvalidFields }) => {
    const handleErrorText = () => {
        let nameInvalid = invalidFields?.find(item => item.name === name)
        let addressInvalid = invalidFields?.find(item => item.name === 'address')
        return `${nameInvalid ? nameInvalid.message : ''}` || `${addressInvalid ? addressInvalid.message : ''}`
    }
    return (
        <div className='text-sm flex flex-col gap-1 w-full'>
            <label
                className='font-medium'
                htmlFor='select-addreess'>
                {label}
            </label>

            <select
                id='select-addreess'
                value={value}
                className='outline-none border border-gray-300 p-2 rounded-md w-full'
                onChange={(e) => !name ? setValue(e.target.value) : setValue(prev => ({ ...prev, [name]: e.target.value }))}
                onFocus={() => setInvalidFields([])}>
                <option>
                    {`--Chọn ${label}--`}
                </option>
                {options?.length > 0 && options?.map(item => {
                    return (
                        <option
                            key={item?.code}
                            value={item?.code}>
                            {item?.value}
                        </option>
                    )
                })}
            </select>
            <small
                className='text-red-600 italic cursor-pointer'>
                {handleErrorText()}
            </small>
        </div>
    )
}

export default memo(Select)