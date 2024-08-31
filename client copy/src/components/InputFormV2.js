import clsx from 'clsx'
import React from 'react'

const InputFormV2 = ({ label, type, text, value, infor, unit }) => {
    return (
        <div className='text-sm flex flex-col gap-1 '>
            <label htmlFor={text} className='font-medium'>{label}</label>
            <div className={clsx('', unit && 'flex items-center justify-center')}>
                <input
                    type={type || 'text'}
                    id='phone'
                    className={clsx('border outline-none p-2 bg-white w-full',
                        infor && 'disabled:true !bg-[#e9ecef] !text-[#495057]',
                        unit ? 'flex-auto rounded-l-md' : 'rounded-md')}
                    value={value}
                />
                {unit && <span className={clsx('w-16 bg-[#e9ecef] flex items-center justify-center h-full', unit && 'rounded-r-md')}>{unit}</span>}
            </div>
        </div>
    )
}

export default InputFormV2