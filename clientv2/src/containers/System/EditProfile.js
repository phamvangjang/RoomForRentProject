import React from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import { useState } from 'react'
import userIcon from '../../assets/user-icon.png'

const EditProfile = () => {
  const [invalidFields, setInvalidFields] = useState([]);
  return (
    <div className='flex flex-col items-center h-full p-10'>
      <h1 className='text-4xl py-8 font-semibold'>
        Chỉnh sửa thông tin tài khoản
      </h1>
      <div className='w-3/5 flex items-center justify-center flex-auto'>
        <div className='py-6 flex flex-col gap-4 w-full'>
          <InputReadOnly
            direction='flex-row'
            label='Mã thành viên' />
          <InputReadOnly
            editPhone
            direction='flex-row'
            label='Số điện thoại' />
          <InputFormV2
            direction='flex-row'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='Tên hiển thị' />
          <InputFormV2
            direction='flex-row'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='Email' />
          <InputFormV2
            direction='flex-row'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='Zalo' />
          <InputFormV2
            direction='flex-row'
            invalidFields={invalidFields}
            setInvalidFields={setInvalidFields}
            label='Facebook' />
          <div className='flex'>
            <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
            <small className='text-[#6c757d] h-12'>Để bảo mật tài khoản, vui lòng thay đổi mật khẩu tại trang <span className='text-blue-500 cursor-pointer'>Đổi mật khẩu</span></small>
          </div>
          <div className='flex'>
            <label className='w-48 flex-none' htmlFor='password'>Ảnh đại diện</label>
            <img src={userIcon} alt='Ảnh đại diện' className='w-24 h-24 rounded-full object-cover' />
          </div>
          <Button
            text='Lưu thay đổi'
            bgColor={'bg-green-600'}
            textColor={'text-white'} />
        </div>
      </div>
    </div>
  )
}

export default EditProfile