'use client'
import { Card, CardContent } from '@/components/ui/card'
import React, { useState } from 'react'
import Logo from '@/public/assets/images/logo5.png'
import Image from 'next/image'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { zSchema } from '@/lib/zodSchema'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from '@/components/ui/input'
import ButtonLoading from '@/components/Application/ButtonLoading'
import z from 'zod'
import { FaRegEyeSlash } from 'react-icons/fa'
import { FaRegEye } from 'react-icons/fa'
import Link from 'next/link'
import { USER_DASHBOARD, WEBSITE_REGISTER,  WEBSITE_RESETPASSWORD } from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import OTPVerification from '@/components/Application/OTPVerification'
import { useDispatch } from 'react-redux'
import { login } from '@/store/reducer/authReducer'
import { useRouter, useSearchParams } from 'next/navigation'
import { ADMIN_DASHBOARD } from '@/routes/AdminPanelRoute'



const LoginPage = () => {

  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [otpVerificationLoading, setOtpVerificationLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);
  const [otpEmail, setOtpEmail] = useState()
  const formSchema = zSchema.pick({
    email: true
  }).extend({
    password: z.string().min('3' , 'Password field is required')
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleLoginSubmit = async(values)=>{
      try{
           setLoading(true);
           const {data: loginResponse} = await axios.post('/api/auth/login' , values, {
            withCredentials:true
           });
           if(!loginResponse.success)
           {
             throw new Error(loginResponse.message);
           }
     
           setOtpEmail(values.email);
     
           form.reset();
     
           showToast('success',loginResponse.message);
           
     
          } catch(error){
            console.log(error);
           showToast('error',error.message)
          } finally {
           setLoading(false);
          }
  }

  // otp verificaation

  const handleOtpVerification = async (values)=>{
      try{
           setOtpVerificationLoading(true);
           const {data: otpResponse} = await axios.post('/api/auth/verify-otp' , values, {
              withCredentials: true  
            });
           if(!otpResponse.success)
           {
             throw new Error(otpResponse.message);
           }
     
           setOtpEmail("");     
           showToast('success',otpResponse.message);
           
           dispatch(login(otpResponse.data));

           if(searchParams.has('callback'))
           {
            router.push(searchParams.get('callback'))
           } else{
            otpResponse.data.role === 'admin' ?  router.push(ADMIN_DASHBOARD) : router.push(USER_DASHBOARD);
           }
     
          } catch(error){
            console.log(error);
           showToast('error',error.message)
          } finally {
           setOtpVerificationLoading(false);
          }
  }

  return (
    <Card className='w-[400px]'>
      <CardContent>
          <div className='flex justify-center'>

            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt='img-logo' className='max-w-[250px]' style={{marginTop : "-4rem" , marginBottom : "-3rem"}}/>

          </div>

          { !otpEmail ?

              <>
                    <div className='text-center mb-5'>
                      <h1 className='text-3xl font-bold mb-2'>LogIn To Your Account</h1>
                      <p className='text-amber-800'>Welcome back to your journey of wealth & wellness.</p>
                    </div>

                    <div className='mt-3'>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleLoginSubmit)} >

                            {/* email */}

                            <div className='mb-5'>
                                    <FormField
                                      control={form.control}
                                      name="email"
                                      render={({ field }) => (
                                        <FormItem>
                                          <FormLabel>Email</FormLabel>
                                          <FormControl>
                                            <Input type="email" placeholder="pyrite@gmail.com" {...field}  />
                                          </FormControl>
                                          <FormMessage />
                                        </FormItem>
                                      )}
                                    />
                            </div>

                            {/* password */}


                            <div className='mb-5'>
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <div className='relative'>
                                      <FormControl>
                                        <Input 
                                          type={isTypePassword ? "password" : "text"}
                                          placeholder="Enter your password" {...field}  
                                          className="pr-10"
                                        />
                                      </FormControl>
                                      <button 
                                        className='absolute top-1/2 -translate-y-1/2 right-3 cursor-pointer text-gray-500 hover:text-gray-800' 
                                        type='button' 
                                        onClick={()=> setIsTypePassword(!isTypePassword)}
                                      >
                                        {isTypePassword ? <FaRegEyeSlash /> : <FaRegEye />}
                                      </button>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>

                            <div className='mb-3'>
                              <ButtonLoading loading={loading} type="submit" text = "Sign In" className='w-full text-xl font-semibold cursor-pointer' />
                            </div>

                            <div className='text-center'>
                                <div className='flex items-center justify-center gap-1'>
                                  <p>Don't have account?</p>
                                  <Link href={WEBSITE_REGISTER} className='text-primary underline'>Create account!</Link>
                                </div>

                                <div className='mt-3'>
                                  <Link href={WEBSITE_RESETPASSWORD} className='text-primary underline'>Forgot Password?</Link>

                                </div>
                            </div>

                        </form>
                      </Form>
                    </div>
              </> :

              <>
                  <OTPVerification email={otpEmail} onSubmit={handleOtpVerification} loading={otpVerificationLoading}/>
              </>
          }


      </CardContent>
    </Card>
  )
}

export default LoginPage
