import React from 'react'
import { InputReadOnly, InputFormV2, Button } from '../../components'
import { useState } from 'react'
import userIcon from '../../assets/user-icon.png'
import { useSelector } from 'react-redux'
import { apiUploadImages, apiUpdateUser } from '../../services'
import Swal from 'sweetalert2'

const EditProfile = () => {
  const { currentData } = useSelector(state => state.user);
  const [payoad, setPayload] = useState({
    name: currentData?.name || '',
    zalo: currentData?.zalo || '',
    fbUrl: currentData?.fbUrl || '',
    avatar: currentData?.avatar || '',
  });
  const handleSubmit = async () => {
    const response = await apiUpdateUser(payoad);
    if (response.status === 200) {
      Swal.fire({
        icon: 'success',
        title: response?.data?.msg,
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: response?.data?.msg,
      });
    }
  }
  const handleUploadAvatar = async (e) => {
    const image = e.target.files[0];
    const formData = new FormData();
    formData.append('file', image)
    formData.append('upload_preset', process.env.REACT_APP_UPLOAD_ASSETS_NAME);
    const response = await apiUploadImages(formData);
    console.log(response);
    if (response?.status === 200) {
      setPayload(prev => ({
        ...prev,
        avatar: response?.data?.secure_url
      }))
    }
  }
  return (
    <div className='flex flex-col items-center h-full p-10'>
      <h1 className='text-4xl py-8 font-semibold'>
        Chỉnh sửa thông tin tài khoản
      </h1>
      <div className='w-3/5 flex items-center justify-center flex-auto'>
        <div className='py-6 flex flex-col gap-4 w-full'>
          <InputReadOnly
            value={`#${currentData?.id?.match(/\d/g).join('')?.slice(0, 6)}`}
            direction='flex-row'
            label='Mã thành viên' />
          <InputReadOnly
            value={currentData?.phone}
            editPhone
            direction='flex-row'
            label='Số điện thoại' />
          <InputFormV2
            setValue={setPayload}
            name='name'
            value={payoad?.name}
            direction='flex-row'
            label='Tên hiển thị' />
          <InputFormV2
            setValue={setPayload}
            name='zalo'
            direction='flex-row'
            value={payoad?.zalo}
            label='Zalo' />
          <InputFormV2
            setValue={setPayload}
            name='fbUrl'
            value={payoad?.fbUrl}
            direction='flex-row'
            label='Facebook' />
          <div className='flex items-center'>
            <label className='w-48 flex-none' htmlFor='password'>Mật khẩu</label>
            <small className='text-[#6c757d] h-12'>Để bảo mật tài khoản, vui lòng thay đổi mật khẩu tại trang <span className='text-blue-500 cursor-pointer'>Đổi mật khẩu</span></small>
          </div>
          <div className='flex items-center'>
            <label className='w-48 flex-none' htmlFor='password'>Ảnh đại diện</label>
            <div className='flex flex-col items-start gap-4'>
              <img
                src={currentData?.avatar || userIcon}
                alt='Ảnh đại diện'
                className='w-24 h-24 rounded-full object-cover' />
              <input type='file' id='avatar' className='appearance-none' onChange={handleUploadAvatar} />
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            text='Lưu thay đổi'
            bgColor={'bg-green-600'}
            textColor={'text-white'} />
        </div>
      </div>
    </div>
  )
}

export default EditProfile