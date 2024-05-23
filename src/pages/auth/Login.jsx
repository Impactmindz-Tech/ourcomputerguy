import React from 'react'
import { Link, redirect, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import { profileValidation } from '../../utils/validation/Validation'
import { useLoginApiMutation } from '../../store/service/AuthService';
import { setLocalStorage } from '../../utils/LocalStorageUtills';

const Login = () => {
    const [formData] = useLoginApiMutation()
    const navigate = useNavigate()
    const onSubmit = async (data) => {
        try {
            const responce = await formData(data)
            if (responce?.data?.status) {
                console.log(responce)
                sessionStorage.setItem('user' , JSON.stringify(responce))
                setLocalStorage('user' , responce?.data?.user_data)
                navigate('/home')
            }
        } catch (error) {
            console.log(error)
        }
    }

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(profileValidation) })
    return (
        <div className='2xl:max-w-[335px] w-full max-w-[270px] mx-auto h-full flex flex-col gap-2'>
            <h2 className="font-bold text-base heading">Log In</h2>
            <h4 className="2xl:text-base font-semibold text-xs">Welcome back!</h4>
            <p className="text-[12px] 2xl:text-base text-input-placeholder">Please enter your email and password to sign in</p>
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="2xl:p-4 border border-input-placeholder border-[#000E2F70] flex items-center gap-x-2 rounded-xl p-3 relative mt-2">
                    <label className="2xl:text-sm absolute bg-white text-input-label -top-2 left-5 text-[11px] px-1" htmlFor="email">Email</label>
                    <input placeholder="michellejohnson125@gmail.com" className="w-full outline-none text-[12px] text-input-placeholder" type="email" id="email" {...register('email')} />
                </div>
                <p className='text-[red]'>{errors?.email?.message}</p>
                <div className="2xl:p-4 border border-input-placeholder border-[#000E2F70] flex gap-x-2 rounded-xl p-3 relative mt-4">
                    <label className="2xl:text-sm absolute bg-white text-input-label -top-2 left-5 text-[11px] px-1" htmlFor="password">Password</label>
                    <input placeholder="********" className="w-full outline-none text-[12px] text-input-placeholder" type='password' id="password" {...register('password')} />
                </div>
                <p className='text-[red]'>{errors?.password?.message}</p>
                <p className="text-[11px] my-2 mr-2 text-input-placeholder w-max ml-auto" >Forgot Password ?</p>
                <button type="submit" className="sign-in text-center mt-3 bg-blue-900 text-white text-xs font-semibold px-12 py-3 rounded-lg flex items-center gap-x-2">
                    <span className='w-full'>Sign In</span>
                </button>
            </form>
            {/* <div className='mt-5'>
                <div className='flex items-center'>
                    <span className='w-[28%] h-[1px] bg-blue-900'></span>
                    <p className='w-[44%] text-xs'>New to Our Computer guy?</p>
                    <span className='w-[28%] h-[1px] bg-blue-900'></span>
                </div>
                <Link to='/signup'>
                    <div className='border mt-5 text-center border-blue-900 rounded-md py-1'>
                        <button className='text-xs font-semibold'>Sign Up</button>
                    </div>
                </Link>
            </div> */}
        </div>
    )
}

export default Login