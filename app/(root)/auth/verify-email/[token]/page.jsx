'use client'
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import React, { use, useEffect, useState } from 'react'
import { MailX } from "lucide-react";
import { MailCheck } from "lucide-react";
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { WEBSITE_HOME } from '@/routes/WebsiteRoute';
const Emailverification = ({params}) => {

  const {token} = use(params);
  const [isVerified , setIsVerified] = useState(false);

  useEffect(()=>{
    const verify = async () => {
        const {data: verificationResponse} = await axios.post('/api/auth/verify-email', {token} , {
          withCredentials:true
        });

        if(verificationResponse.success){
            setIsVerified(true);
        }
    }

    verify();

  }, [token]);
  return (
    <Card className="w-[400px]">
        <CardContent>
            {isVerified ? 
            
                 <div className="flex flex-col items-center justify-center gap-5 ">
                  <MailCheck className="w-12 h-12 " />
                  <span className='font-bold text-center text-2xl text-green-600'>Email Verified successfully!</span>
                  <Button asChild>
                    <Link href={WEBSITE_HOME}>
                      Continue Shopping
                    </Link>
                  </Button>
                </div>
                :

                <div className="flex flex-col items-center justify-center gap-5 ">
                  <MailX className="w-12 h-12 " />
                  <span className='font-bold text-center text-2xl text-red-500'>Email Verification failed!</span>
                </div>
        }
        </CardContent>
    </Card>
  )
}

export default Emailverification
