import React from 'react'
import LocationSelector from './LocationSelector'

const Address = ({ payload, setPayload, invalidFields, setInvalidFields }) => {
    return (
        <div className='flex flex-col gap-5'>
            <h2 className='text-2xl font-semibold pb-4'>Address for rent</h2>
            <div className='flex gap-2'>
                <div className='w-full flex items-center justify-between gap-2'>
                    <LocationSelector
                        payload={payload}
                        setPayload={setPayload}
                        invalidFields={invalidFields}
                        setInvalidFields={setInvalidFields} />

                </div>
            </div>
        </div>
    )
}

export default Address