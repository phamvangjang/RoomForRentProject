import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as action from '../../store/actions';
import moment from 'moment';
import Button from '../../components/Button';
import UpdatePost from '../../components/UpdatePost';
import { apiDeletePost } from '../../services';
import Swal from 'sweetalert2';
import { use } from 'react';

const ManagePost = () => {
    const [statusValue, setStatusValue] = useState('0');
    const [posts, setPosts] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch();
    const { postOfCurrent, dataEdit } = useSelector(state => state.post);
    const [updateData, setUpdateData] = useState(false);
    useEffect(() => {
        !dataEdit && dispatch(action.getPostsLimitAdmin());
    }, [updateData, dataEdit]);
    useEffect(() => {
        !dataEdit && dispatch(action.getPostsLimitAdmin());
    }, [dataEdit]);
    const currentDate = moment();
    useEffect(() => {
        !dataEdit && setIsEdit(false);
    }, [dataEdit]);
    useEffect(() => {
        setPosts(postOfCurrent);
    }, [postOfCurrent]);
    const handleDeletePost = async (postId) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa bài viết này không?')) {
            const response = await apiDeletePost(postId);
            if (response?.data?.success === true) {
                Swal.fire('Thành công!', response?.data?.msg, 'success');
                setUpdateData(prev => !prev);
            } else {
                Swal.fire('Thất bại!', response?.data?.msg, 'error');
            }
        }
    }

    useEffect(() => {
        if (statusValue === 1) {
            const activePosts = postOfCurrent?.filter(post =>
                moment(post.overviews?.expire).isSameOrAfter(currentDate, 'day')
            );
            setPosts(activePosts);
        } else if (statusValue === 2) {
            const inactivePosts = postOfCurrent?.filter(post =>
                moment(post.overviews?.expire).isBefore(currentDate, 'day')
            );
            setPosts(inactivePosts);
        } else {
            setPosts(postOfCurrent);
        }
    }, [statusValue]);

    return (
        <div className='p-10 h-full'>
            <div className='flex items-center justify-between border-b-[1px] border-[#dee2e6] pb-8'>
                <h1 className='text-4xl font-semibold'>
                    Quản lý bài viết
                </h1>
                <select
                    onChange={e => setStatusValue(+e.target.value)}
                    value={statusValue}
                    className='mt-5 p-2 border-none border-gray-300 rounded-md'>
                    <option value="0">Lọc theo trạng thái</option>
                    <option value="1">Đang hoạt động</option>
                    <option value="2">Hết hiệu lực</option>
                </select>
            </div>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 table-fixed mt-10">
                <thead>
                    <tr>
                        <th className='border text-center p-2'>Mã bài viết</th>
                        <th className='border text-center p-2'>Ảnh đại diện</th>
                        <th className='border text-center p-2'>Tiêu đề</th>
                        <th className='border text-center p-2'>Giá</th>
                        <th className='border text-center p-2'>Ngày bắt đầu</th>
                        <th className='border text-center p-2'>Ngày kết thúc</th>
                        <th className='border text-center p-2'>Trạng thái</th>
                        <th className='border text-center p-2'>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {!posts || posts.length === 0
                        ? (
                            <tr>
                                <td colSpan="6" className='border p-2 text-center'>Chưa có bài viết</td>
                            </tr>)
                        : (
                            posts.map((post, index) => (
                                <tr
                                    key={index}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className='border p-2 h-fit text-center'>{post.overviews.code}</td>
                                    <td className='border p-2 h-fit flex justify-center'>
                                        <img
                                            src={JSON.parse(post.images.image)[0] || ''}
                                            alt={post.title}
                                            className='w-10 h-10 object-cover rounded-md'
                                        />
                                    </td>
                                    <td className='border p-2 h-fit text-center'>{`${post.title?.slice(0, 30)}...`}</td>
                                    <td className='border p-2 h-fit text-center'>{post.attributes.price}</td>
                                    <td className='border p-2 h-fit text-center'>{moment(post.overviews?.createdAt).format('HH:mm DD/MM/YYYY')}</td>
                                    <td className='border p-2 h-fit text-center'>{moment(post.overviews?.expire).format('HH:mm DD/MM/YYYY')}</td>
                                    <td className='border p-2 h-fit text-center'>
                                        {
                                            moment(post.overviews?.expire).isSameOrAfter(currentDate, 'day')
                                                ? <span className='text-green-500'>Còn hiệu lực</span>
                                                : <span className='text-red-500'>Hết hiệu lực</span>
                                        }
                                    </td>
                                    <td className='border p-2 h-fit text-center flex justify-center items-center gap-4'>
                                        <Button
                                            bgColor={'bg-blue-500'}
                                            textColor={'text-white'}
                                            text={'Sửa'}
                                            onClick={() => {
                                                dispatch(action.editData(post))
                                                setIsEdit(true)
                                            }}
                                        />
                                        <Button
                                            bgColor={'bg-red-500'}
                                            textColor={'text-white'}
                                            text={'Xóa'}
                                            onClick={() => handleDeletePost(post.id)}
                                        />
                                    </td>
                                </tr>
                            ))
                        )}
                </tbody>
            </table>
            {isEdit && <UpdatePost setIsEdit={setIsEdit} />}
        </div>
    )
}

export default ManagePost