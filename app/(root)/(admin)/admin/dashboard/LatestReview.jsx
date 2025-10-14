'use client'
import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import imgPlaceholder from "@/public/assets/images/img-placeholder.webp"
import { IoStar } from "react-icons/io5";
import useFetch from '@/hooks/useFetch';

const LatestReview = () => {
  const [latestReview , setLatestReview] = useState();
  const {data : getLatestReview, loading} = useFetch('/api/dashboard/admin/latest-review');

  useEffect(()=>{
      if(getLatestReview && getLatestReview.success)
      {
        setLatestReview(getLatestReview.data);
      }

  }, [getLatestReview]);

   if(loading) return <div className="h-full w-full flex justify-center items-center">
    Loading...
  </div>

  if(!latestReview || latestReview.length === 0)
  {
    return <div className=" text-amber-900 font-bold text-lg h-full w-full flex justify-center items-center">
      NOT FOUND 404!
    </div>
  }

  return (
    <Table>
          
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
           

            {latestReview.map((review)=>(

              <TableRow key={review._id}>
                <TableCell className='flex items-center gap-3'>
                  <Avatar>
                      <AvatarImage  src={review?.product?.media[0]?.secure_url || imgPlaceholder.src}/>
                  </Avatar>

                  <span className='line-clamp-1 '>{review?.product?.name || 'Not found'}</span>
                </TableCell>
              
                  <TableCell>
                      <div className='flex items-center'>
                          {Array.from({length:review.rating}).map((_,i)=>(
                          
                                <span key={i}>
                                  <IoStar className='text-yellow-400' />
                                </span>
                          ))}
                      </div>
                  </TableCell>
      
                
              </TableRow>
              
            ))}
          </TableBody>
        </Table>
  )
}

export default LatestReview
