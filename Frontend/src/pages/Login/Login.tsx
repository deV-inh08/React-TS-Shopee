import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Schema, schema } from '../../utils/rules';
import { useMutation } from '@tanstack/react-query';
import authAPI from '../../apis/auth.api';
import { isAxiosUnprocessableEntityError } from '../../utils/utils';
import { ErrorResponse } from '../../types/utils.type';
import Input from '../../components/Input';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app.context';
import Button from '../../components/Button';

type FormData = Omit<Schema, "confirm_password">

const loginSchema = schema.omit(["confirm_password"])

const Login = () => {
    const {setIsAuthenticated, setProfile} = useContext(AppContext)
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}, setError} = useForm<FormData>(
        {
            resolver: yupResolver(loginSchema)
        }
    );

    const loginAccountMutation = useMutation({
        mutationFn: (body: Omit<FormData, "confirm_password">) => authAPI.loginAccount(body)
    });

    const onSubmit = handleSubmit((data) => {
        loginAccountMutation.mutate(data, {
            onSuccess: (data) => {
                setIsAuthenticated(true)
                setProfile(data.data.data.user)
                navigate("/")
            },
            onError: (errors) => {
                if(isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(errors)) {
                    const formError = errors.response?.data.data
                    if(formError) {
                        Object.keys(formError).forEach((key) => {
                            setError(key as keyof FormData, {
                                message: formError[key as keyof FormData],
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
            <div className="max-w-7xl mx-auto px-4 container">
                <div className='grid grid-cols-1 py-12 lg:grid-cols-5 lg:py-32 lg:pr-10'>
                    <div className='lg:col-span-2 lg:col-start-4'>
                        <form action="" className='p-10 rounded bg-white shadow-sm' autoComplete='off' method='post' onSubmit={onSubmit}>
                            <p className='text-2xl'>Đăng nhập</p>
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
                            <div className='mt-3'>
                                <Button 
                                    type='submit'
                                    className='flex justify-center gap-4 items-center hover:opacity-60 transition-all w-full mt-3 text-center py-4 px-2 uppercase bg-orange text-white text-lg '
                                    isLoading={loginAccountMutation.isPending}
                                    disabled={loginAccountMutation.isPending}
                                >
                                    Đăng nhập
                                </Button>
                            </div>
                            <div className='flex items-center justify-center mt-8'>
                                <span className='text-gray-400'>Bạn chưa có tài khoảng ?</span>
                                <Link to="/register" className="text-red-400 ml-3">Đăng ký</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;