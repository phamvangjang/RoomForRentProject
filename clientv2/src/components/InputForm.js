import React, { memo } from 'react'

const InputForm = ({ label, value, setValue, keyPayload, invalidFields, setInvalidFields, type }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label htmlFor='phone' className='text-xs'>{label}</label>
            <input
                type={type || 'text'}
                id='phone'
                className='outline-none p-2 rounded-md bg-[#e8f0fe] w-full'
                value={value}
                onChange={(e) => setValue(prev => ({ ...prev, [keyPayload]: e.target.value }))}
                onFocus={() => invalidFields && setInvalidFields([])}
            />
            {invalidFields?.some(i => i.name === keyPayload) && <small className='text-red-500 italic'>{invalidFields.find(i => i.name === keyPayload)?.message}</small>}
        </div>
    )
}

export default memo(InputForm)