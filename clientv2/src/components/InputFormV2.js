import clsx from 'clsx'
import React from 'react'

const InputFormV2 = ({
    label,
    type,
    text,
    value,
    unit,
    setValue,
    name,
    small,
    invalidFields,
    setInvalidFields,
    direction }) => {
    return (
        <div className={`text-sm flex gap-1 w-full ${direction ? direction : 'flex-col'}`}>
            <label htmlFor={text} className='font-medium w-48 flex-none'>{label}</label>
            <div className={clsx('flex flex-auto flex-col items-center', unit && 'flex items-center justify-center ')}>
                <div className='flex w-full items-center'>
                    <input
                        type={type || 'text'}
                        id='title'
                        className={clsx('border outline-none p-2 w-full bg-white',
                            unit ? 'flex-auto rounded-l-md' : 'rounded-md')}
                        value={value}
                        onFocus={() => setInvalidFields && setInvalidFields([])}
                        onChange={(e) => setValue(prev => ({ ...prev, [name]: e.target.value }))}
                    />
                    {unit && <span className={clsx('w-16 bg-[#e9ecef] flex items-center justify-center h-full', unit && 'rounded-r-md')}>{unit}</span>}
                </div>
                {invalidFields?.some(item => item.name === name) &&
                    <small className='text-red-500 italic w-full block'>
                        {invalidFields?.find(item => item.name === name)?.messages}
                    </small>}
            </div>
            {small && <small className='text-[#6c757d] text-xs whitespace-nowrap'>{small}</small>}
        </div>
    )
}
export default InputFormV2