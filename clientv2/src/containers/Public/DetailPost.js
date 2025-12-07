import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getPostsLimit } from '../../store/actions/post';
import { Boxinfor, SliderCustom, RelatedPost } from '../../components';
import moment from 'moment';
import { Map } from '../../components';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';

const DetailPost = () => {
    const [coords, setCoords] = useState(null);
    const { postId } = useParams();
    const dispatch = useDispatch();
    const { posts } = useSelector(state => state.post);
    useEffect(() => {
        if (postId) {
            dispatch(getPostsLimit({ id: postId }));
        }
    }, [postId]);

    // useEffect(() => {
    //     const getCoords = async () => {
    //         const results = await geocodeByAddress(posts[0]?.address);
    //         const latLng = await getLatLng(results[0]);
    //         setCoords(latLng);
    //     }
    //     posts && getCoords();
    // }, [posts]);
    return (
        <div className='w-full flex gap-4'>
            <div className='w-[70%]'>
                <SliderCustom images={posts && posts.length > 0 && JSON.parse(posts[0]?.images?.image)} />
                <div className='p-4 rounded-md shadow-sm bg-white my-3'>
                    <div className='w-full mb-5'>
                        <h1 className='font-semibold text-[#fb2c36] text-xl mb-2'>{posts[0]?.title}</h1>
                        <div className='flex items-center justify-between'>
                            <span className='flex gap-4 items-center'>
                                <span className='text-green-500 text-base font-bold'>{posts[0]?.attributes?.price}</span>
                                <span className='text-xs'>{posts[0]?.attributes?.acreage}</span>
                            </span>
                            <span className='flex text-sm'>Cập nhật: {posts[0]?.attributes?.published}</span>
                        </div>
                        <div className='flex gap-2 my-4 text-sm w-full items-center'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Quận huyện:</td>
                                        <td className='py-1 flex-auto text-blue-500 underline cursor-pointer'>{posts[0]?.overviews?.area}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Gói tin:</td>
                                        <td className='py-1 flex-auto '>{posts[0]?.overviews?.bonus}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Địa chỉ:</td>
                                        <td className='py-1 flex-auto '>{posts[0]?.address}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Mã tin:</td>
                                        <td className='py-1 flex-auto '>{posts[0]?.overviews?.code}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Ngày đăng:</td>
                                        <td className='py-1 flex-auto '>{moment(posts[0]?.overviews?.createdAt).format('HH:mm DD/MM/YYYY')}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 flex-2 font-semibold'>Ngày hết hạn:</td>
                                        <td className='py-1 flex-auto '>{moment(posts[0]?.overviews?.expire).format('HH:mm DD/MM/YYYY')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h1 className='font-bold'>Thông tin liên hệ</h1>
                        <div className='flex gap-2 mt-1 text-sm w-full items-center'>
                            <table>
                                <tbody>
                                    <tr>
                                        <td className='py-1 pr-4 font-semibold'>Liên hệ:</td>
                                        <td className='py-1 '>{posts[0]?.user?.name}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 font-semibold'>Điện thoại:</td>
                                        <td className='py-1 '>{posts[0]?.user?.phone}</td>
                                    </tr>
                                    <tr>
                                        <td className='py-1 pr-4 font-semibold'>Zalo:</td>
                                        <td className='py-1 '>{posts[0]?.user?.zalo}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className='border-t'>
                        <h2 className='font-semibold text-lg mb-2 mt-4'>Thông tin mô tả</h2>
                        <div className='text-sm text-justify leading-7 flex flex-col gap-2'>
                            {posts[0]?.description && JSON.parse(posts[0]?.description).map((item, index) => {
                                return (
                                    <span key={index}>{item}</span>
                                )
                            })}
                        </div>
                    </div>

                    <div className='border-t mt-4 pt-4'>
                        map
                    </div>
                </div>
            </div>
            <div className='w-[30%] flex flex-col gap-4'>
                <Boxinfor userData={posts[0]?.user} />
                <RelatedPost />
            </div>
        </div>
    )
}

export default DetailPost