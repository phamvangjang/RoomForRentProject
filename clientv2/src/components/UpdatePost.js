import React from 'react'
import { CreatePost } from '../containers/System'

const UpdatePost = ({ setIsEdit }) => {
    return (
        <div className='absolute left-0 right-0 top-0 bottom-0 bg-overlay70 flex items-center justify-center'
            onClick={e => {
                e.stopPropagation()
                setIsEdit(false)
            }}>
            <div className='bg-white overflow-y-auto w-[60%] h-[80%] rounded-md p-5'
                onClick={e => e.stopPropagation()}>
                <CreatePost isEdit />
            </div>
        </div>
    )
}

export default UpdatePost