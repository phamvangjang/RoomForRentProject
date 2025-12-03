import React, { useState } from 'react'
import { InputForm, Button } from '../../components'
import Swal from 'sweetalert2';

const Contacts = () => {
  const [payload, setPayload] = useState({
    name: '',
    phone: '',
    content: ''
  });
  const handleSubmit = () => {
    Swal.fire(`Cảm ơn ${payload.name}`, 'Cảm ơn bạn đã liên hệ với chúng tôi!', '', 'success');
    setPayload({
      name: '',
      phone: '',
      content: ''
    });
  }
  return (
    <div className='w-full p-3'>
      <h1 className='text-3xl font-semibold mb-6'>Liên hệ với chúng tôi</h1>
      <div className='flex gap-4'>
        <div className='flex-1 flex flex-col gap-2 h-fit text-white rounded-3xl p-4 bg-gradient-to-br from-blue-500 to-purple-600'>
          <h4 className='font-semibold'>Thông tin liên hệ</h4>
          <span>Chúng tôi biết bạn có nhiều lựa chọn khi tìm kiếm dịch vụ cho thuê phòng trọ.</span>
          <span>Điện thoại: 0123456789</span>
          <span>Email: contact@example.com</span>
          <span>Zalo: 0123456789</span>
          <span>Viber: 0123456789</span>
          <span>Địa chỉ: 123 Đường ABC, Quận XYZ, Thành phố HCM</span>
        </div>
        <div className='flex-1 bg-white rounded-3xl p-6 shadow-lg'>
          <h4 className='text-xl font-semibold mb-4'>Gửi tin nhắn cho chúng tôi</h4>
          <div className='flex flex-col gap-6'>
            <InputForm label={'HỌ VÀ TÊN CỦA BẠN'} value={payload.name} setValue={setPayload} keyPayload={'name'} />
            <InputForm label={'SỐ ĐIỆN THOẠI'} value={payload.phone} setValue={setPayload} keyPayload={'phone'} />
            <div>
              <label className='text-xs mb-2 block'>NỘI DUNG LIÊN HỆ</label>
              <textarea
                id='desc'
                cols={'30'}
                rows={'5'}
                value={payload.content}
                onChange={(e) => setPayload(prev => ({ ...prev, content: e.target.value }))}
                className='w-full p-2 rounded-md bg-[#e8f0fe] outline-none resize-none'
              ></textarea>
            </div>
            <Button onClick={handleSubmit} text={'Gửi liên hệ'} textColor='text-white' bgColor={'bg-blue-500'} fullWidth />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contacts