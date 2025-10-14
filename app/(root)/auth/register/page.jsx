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
import { WEBSITE_LOGIN} from '@/routes/WebsiteRoute'
import axios from 'axios'
import { showToast } from '@/lib/showToast'
const RegisterPage = () => {

  const [loading, setLoading] = useState(false);
  // const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
    name:true, email: true, password:true,
  }).extend({
    confirmPassword: z.string()
  }).refine((data)=> data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ['confirmPassword']
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const handleRegisterSubmit = async(values)=>{
     try{
      setLoading(true);
      const {data: registerResponse} = await axios.post('/api/auth/register' , values, {
        withCredentials: true
      });
      if(!registerResponse.success)
      {
        throw new Error(registerResponse.message);
      }

      // registration success

      form.reset();

      showToast('success',registerResponse.message);

     } catch(error){
      showToast('error',error.message)
     } finally {
      setLoading(false);
     }
  }

  return (
    <Card className='w-[400px]'>
      <CardContent>
          <div className='flex justify-center'>

            <Image src={Logo.src} width={Logo.width} height={Logo.height} alt='img-logo' className='max-w-[250px]' style={{marginTop : "-4rem" , marginBottom : "-3rem"}}/>

          </div>

          <div className='text-center mb-5'>
            <h1 className='text-3xl font-bold mb-2'>Create Account</h1>
            <p className='text-amber-800'>Join us to explore the world of authentic rudraksh, gems, and spiritual energy.</p>
          </div>

          <div className='mt-3'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleRegisterSubmit)} >

                  {/* name */}

                    <div className='mb-5'>
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input type="text" placeholder="Enter your name" {...field}  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                  </div>


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
                        <FormItem className='relative'>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Enter your password" {...field}  
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* confirm password */}

                      <div className='mb-5'>
                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem className='relative'>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Confirm your password" {...field}  
                            />
                          </FormControl>

                            {/* <button className='absolute top-1/2 right-2 cursor-pointer' type='submit' onClick={()=> setIsTypePassword(!isTypePassword)}>
                                  {isTypePassword ? 
                                    
                                    <FaRegEyeSlash />
                                    :

                                    <FaRegEye />
                                }
                            </button> */}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='mb-3'>
                    <ButtonLoading type="submit" text = "Sign Up" className='w-full text-xl font-semibold cursor-pointer' />
                  </div>

                  <div className='text-center'>
                      <div className='flex items-center justify-center gap-1'>
                        <p>Already have an account?</p>
                        <Link href={WEBSITE_LOGIN} className='text-primary underline'>Login!</Link>
                      </div>
                  </div>

              </form>
            </Form>
          </div>
      </CardContent>
    </Card>
  )
}

export default RegisterPage
