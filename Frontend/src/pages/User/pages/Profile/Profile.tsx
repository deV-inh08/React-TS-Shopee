import React from 'react'
import Input from '../../../../components/Input';
const Profile = () => {
    return (
        <div className='rounded-sm bg-white md:px-7 px-2 pb-10 md:pb-20 shadow'>
            <div className='border-b border-b-gray-200 py-6'>
                <h1 className='text-lg font-medium capitalize text-gray-900'>
                    Hồ sơ của tôi
                </h1>
                <p className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</p>
            </div>
            <div className='mt-8 flex flex-col-reverse md:flex-row md:items-start'>
                <form className='mt-6 flex-grow md:pr-12 md:mt-0'>
                    <div className='flex flex-wrap flex-col sm:flex-row'>
                        <p className='w-[20%] text-right truncate pt-3 capitalize'>
                            Email
                        </p>
                        <div className='w-[80%] sm:pl-5'>
                            <div className='pt-3 text-gray-700'>
                                abc*******@gmail.com
                            </div>
                        </div>
                    </div>
                    <div className='mt-4 flex flex-wrap'>
                        <p className='w-[20%] text-right truncate pt-3 capitalize'>
                            Tên
                        </p>
                        <div className='w-[80%] sm:pl-5'>
                            <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
                        </div>
                    </div>
                    <div className='mt-2 flex flex-wrap'>
                        <p className='w-[20%] text-right truncate pt-3 capitalize'>
                            Điện thoại
                        </p>
                        <div className='w-[80%] sm:pl-5'>
                            <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
                        </div>
                    </div>
                    <div className='mt-2 flex flex-wrap'>
                        <p className='w-[20%] text-right truncate pt-3 capitalize'>
                            Địa chỉ
                        </p>
                        <div className='w-[80%] sm:pl-5'>
                            <Input classNameInput='w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm'></Input>
                        </div>
                    </div>
                    <div className='mt-2 flex flex-wrap'>
                        <p className='w-[20%] text-right truncate pt-3 capitalize'>
                            Ngày sinh
                        </p>
                        <div className='w-[80%] sm:pl-5'>
                            <div className='flex justify-between'>
                                <select 
                                    name="" 
                                    id=""
                                    className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
                                >
                                    <option disabled>Ngày</option>
                                </select>
                                <select 
                                    name="" 
                                    id=""
                                    className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
                                >
                                    <option disabled>Tháng</option>
                                </select>
                                <select 
                                    name="" 
                                    id=""
                                    className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
                                >
                                    <option disabled>Năm</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </form>
                <div className='flex justify-center md:w-72 md:border-l md:border-l-gray-200'>
                    <div className='flex flex-col items-center'>
                        <div className='my-5 h-24 w-24'>
                            <img
                                src="https://plus.unsplash.com/premium_photo-1728579090264-5ba3706a5652?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8"
                                alt="avatar"
                                className='h-full w-full object-cover rounded-full'
                            />
                        </div>
                        <input className='hidden' type="file" name="" id="" accept='.jpg,.png,.jpeg'/>
                        <button className='flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm'>
                            Chọn ảnh
                        </button>
                        <div className='mt-3 text-gray-400'>
                            <p>Dung lượng file tối đa 1MB</p>
                            <p>Định dạng:.PNG, .JPG</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Profile;
