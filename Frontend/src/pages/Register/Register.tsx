import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {schema, Schema } from '../../utils/rules';
import Input from '../../components/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import authAPI from '../../apis/auth.api';
import { omit } from 'lodash';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import { ErrorResponse } from '../../types/utils.type';
import { AppContext } from '../../contexts/app.context';
import Button from '../../components/Button';
import { toast } from 'react-toastify';


type FormData = Pick<Schema, "email" | "password" | "confirm_password">
const registerSchema = schema.pick(['email', 'password', 'confirm_password'])

const Register = () => {
    const {setIsAuthenticated, setProfile} = useContext(AppContext)
    const navigate = useNavigate()
    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormData>(
        {
            resolver: yupResolver(registerSchema)
        }
    );

    const registerAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, "confirm_password">) => authAPI.registerAccount(body)
    });
    
    const onSubmit = handleSubmit((data) => {
        const body = omit(data, ["confirm_password"])
        registerAccountMutation.mutate(body, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                setProfile(data.data.data.user)
                navigate("/")
                toast("Đăng kí thành công", { autoClose: 1000 })
            },
            onError: (error) => {
                if(isAxiosUnprocessableEntityError<ErrorResponse<Omit<FormData, "confirm_password">>>(error)) {
                    const formError = error.response?.data.data
                    if(formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof Omit<FormData, "confirm_password">, {
                                message: formError[key as keyof Omit<FormData, "confirm_password">],
                                type: "Server"
                            })
                        })
                    } 
                }
            }
        })
    });
    return (
        <div className='bg-orange'>
            <div className="container">
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form action="" className='p-10 rounded bg-white shadow-sm' autoComplete='off' method='post' onSubmit={onSubmit} noValidate>
                            <p className='text-2xl'>Đăng ký</p>
                            <Input
                                name='email'
                                register={register}
                                type='email'
                                className='mt-8'
                                errorMessage={errors.email?.message}
                                placeholder='Email'
                                >
                            </Input>
                            <Input
                                name="password"
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.password?.message}
                                placeholder='Password'
                                >
                            </Input>
                            <Input
                                name="confirm_password"
                                register={register}
                                type='password'
                                className='mt-2'
                                errorMessage={errors.confirm_password?.message}
                                placeholder='Confirm Password'
                                >
                            </Input>
                        
                            <div className='mt-3'>
                                <Button
                                    type='submit'
                                    className='flex justify-center items-center gap-4 hover:opacity-60 transition-all w-full mt-3 text-center py-4 px-2 uppercase bg-orange text-white text-lg'
                                    isLoading={registerAccountMutation.isPending}
                                    disabled={registerAccountMutation.isPending}
                                >
                                    Đăng ký
                                </Button>
                            </div>
                            <div className='flex items-center justify-center mt-8'>
                                <span className='text-gray-400'>Bạn đã có tài khoảng ?</span>
                                <Link to="/login" className="text-red-400 ml-3">Đăng nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Register;
