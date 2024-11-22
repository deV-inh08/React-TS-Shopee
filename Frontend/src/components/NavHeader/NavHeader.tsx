import React, { useContext } from 'react'
import Popover from '../Popover';
import { Link } from 'react-router-dom';
import { AppContext } from '../../contexts/app.context';
import path from '../../constants/path';
import { useMutation } from '@tanstack/react-query';
import authAPI from '../../apis/auth.api'


const NavHeader = () => {
    const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useContext(AppContext);

    const logoutMutation = useMutation({
        mutationFn: authAPI.logout,
        onSuccess: () => {
            setProfile(null)
            setIsAuthenticated(false)
        }
    });

    const handleLogout = () => {
        logoutMutation.mutate()
    };

    const handleSliceName = (email: string) => {
        if(email && !email.includes("@")) {
            throw new Error("Email is not valid")
        } else if(email && email.includes("@")) {
            return email.split("@")[0]
        }
    }

    return (
        <div className='flex justify-end'>
            <Popover
                as="span"
                className='flex items-center py-1 hover:text-gray-300 cursor-pointer mr-5'
                renderPopover={
                    <div className='bg-white relative shadow-sm rounded-sm border border-gray-200 px-2'>
                        <div className='flex flex-col py-2 px-3'>
                            <button className=' hover:text-orange'>Tieng Viet</button>
                        </div>
                        <div className='flex flex-col py-2 px-3'>
                            <button className='hover:text-orange'>English</button>
                        </div>
                    </div>
                }
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
                <span className='mx-1'>Tiếng Việt</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                </svg>
            </Popover>

            {isAuthenticated && (
                <Popover className='flex items-center py-1 hover:text-gray-300 cursor-pointer' renderPopover={
                    <div>
                        <Link to="/user/profile" className='block py-2 px-4 hover:bg-slate-100 bg-white hover:text-orange'>Tài khoảng của tôi</Link>
                        <Link to="/" className='block py-2 px-4 hover:bg-slate-100 bg-white hover:text-orange'>Đơn mua</Link>
                        <button onClick={handleLogout} type="button" className='text-left w-full block py-2 px-3 hover:bg-slate-100 bg-white hover:text-orange'>Đăng xuất</button>
                    </div>
                }>
                    <div className='w-6 h-6 mr-2 flex-shrink-0'>
                        <img className='w-full h-full object-cover rounded-full' src="https://plus.unsplash.com/premium_photo-1728579090264-5ba3706a5652?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw2fHx8ZW58MHx8fHx8" alt="avatar" />
                    </div>
                    <p className='text-white'>{handleSliceName(profile?.email)}</p>
                </Popover>
            )}
            {!isAuthenticated && (
                <div className='flex items-center'>
                    <Link className='mx-3 capitalize hover:text-white-70' to={path.register}>
                        Đăng ký
                    </Link>
                    <div className='border-r-[1px] border-r-white/40 h-4'></div>
                    <Link className='mx-3 capitalize hover:text-white-70' to={path.login}>
                        Đăng nhập
                    </Link>
                </div>
            )}
        </div>
    )
};


export default NavHeader;
