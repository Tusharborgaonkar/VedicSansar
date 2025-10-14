'use client'
import React, { useState } from 'react'
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
import axios from 'axios'
import { showToast } from '@/lib/showToast'
import { useRouter } from 'next/navigation'
import { WEBSITE_LOGIN } from '@/routes/WebsiteRoute'
const UpdatePassword = ({email}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isTypePassword, setIsTypePassword] = useState(true);

  const formSchema = zSchema.pick({
   email:true, password:true,
  }).extend({
    confirmPassword: z.string()
  }).refine((data)=> data.password === data.confirmPassword, {
    message: "Password and confirm password must be same",
    path: ['confirmPassword']
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email,
      password: "",
      confirmPassword: "",
    },
  })

  const handlePasswordUpdate = async(values)=>{
     try{
      setLoading(true);
      const {data: passwordUpdate} = await axios.put('/api/auth/reset-password/update-password' , values);
      if(!passwordUpdate.success)
      {
        throw new Error(passwordUpdate.message);
      }

      // registration success

      form.reset();

      showToast('success',passwordUpdate.message);
      router.push(WEBSITE_LOGIN);
     } catch(error){
      showToast('error',error.message)
     } finally {
      setLoading(false);
     }
  }

  return (
   
      <div>

          <div className='text-center mb-5'>
            <h1 className='text-3xl font-bold mb-2'>Update Password</h1>
            <p className='text-amber-800'>Secure your spiritual journey with a strong password.</p>
          </div>

          <div className='mt-3'>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handlePasswordUpdate)} >

                  {/* password */}


                  <div className='mb-5'>
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem className='relative'>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type="password"
                              placeholder="Enter your new password" {...field}  
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
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input 
                              type={isTypePassword ? 'password' : 'text'} 
                              placeholder="Confirm your new password" {...field}  
                            />
                          </FormControl>

                            <button className='absolute top-1/2 right-2 cursor-pointer' type='submit' onClick={()=> setIsTypePassword(!isTypePassword)}>
                                  {isTypePassword ? 
                                    
                                    <FaRegEyeSlash />
                                    :

                                    <FaRegEye />
                                }
                            </button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className='mb-3'>
                    <ButtonLoading type="submit" text = "Update Password" className='w-full text-xl font-semibold cursor-pointer' />
                  </div>

              </form>
            </Form>
          </div>
      </div>
    
  )
}

export default UpdatePassword
