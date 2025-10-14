import Image from 'next/image'
import React from 'react'
import usericon from "@/public/assets/images/user-img.png"
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { IoIosStarHalf } from "react-icons/io";
import { IoIosStar } from "react-icons/io";
import { IoIosStarOutline } from "react-icons/io";
dayjs.extend(relativeTime);
const ReviewList = ({review}) => {
  return (
    <div className='flex gap-5'>

        <div className='w-[60px]'>
            <Image
                src={review?.avatar?.url || usericon.src}
                width={55}
                height={55}
                alt="user icon"
                className='rounded-lg'
            />
        </div>

        <div className='w-[calc(100%-100px)]'>
            <div>
                <h4 className='text-xl font-semibold text-amber-800'>{review?.title}</h4>

                
           {/* Star Rating */}
          {review?.rating && (
            <div className='flex items-center gap-2 my-1'>
              <div className='flex text-xl'>
                {[...Array(5)].map((_, i) => {
                  const starValue = i + 1;
                  if (starValue <= Math.floor(review.rating)) {
                    return <span key={i} className="text-yellow-500"><IoIosStar size={20} /></span>;
                  } else if (starValue === Math.ceil(review.rating) && review.rating % 1 !== 0) {
                    return <span key={i} className="text-yellow-500"><IoIosStarHalf size={20} /></span>;
                  } else {
                    return <span key={i} className="text-gray-500"><IoIosStarOutline size={20} /></span>;
                  }
                })}
              </div>
              <span className='text-sm text-gray-600'>({review.rating})</span>
            </div>
          )}
                <p className='flex gap-2 items-center'>
                    <span className='font-medium'>{review?.reviewedBy}</span>
                    -

                    <span className='text-gray-600'>{dayjs(review?.createdAt).fromNow()}</span>
                </p>

                <p className='mt-3 text-gray-700'>{review?.review}</p>
            </div>
        </div>
      
    </div>
  )
}

export default ReviewList
