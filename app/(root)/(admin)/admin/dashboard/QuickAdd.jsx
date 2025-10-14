import Link from 'next/link'
import React from 'react'
import { MdCategory } from "react-icons/md";
import { GiPrayerBeads } from "react-icons/gi";
import { MdOutlinePermMedia } from "react-icons/md";
import { RiCoupon2Line } from "react-icons/ri";
import { ADMIN_CATEGORY_ADD, ADMIN_COUPON_ADD, ADMIN_MEDIA_SHOW, ADMIN_PRODUCT_ADD } from '@/routes/AdminPanelRoute';

const QuickAdd = () => {
  return (
    <div className='grid lg:grid-cols-4 sm:grid-cols-2 sm:gap-10 gap-5 mt-10'>
      <Link href={ADMIN_CATEGORY_ADD}>
        <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-green-400 via-green-500  to-green-600'>
            <h4 className='font-medium text-white dark:text-gray-200'>Add Category</h4>
            <span className='w-12 h-12 border dark:border-white flex justify-center items-center rounded-full text-white'>
                <MdCategory size={20} />
            </span>
        </div>
      </Link>

      <Link href={ADMIN_PRODUCT_ADD}>
        <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-r from-blue-400  to-blue-600'>
            <h4 className='font-medium text-white dark:text-gray-200'>Add Product</h4>
            <span className='w-12 h-12 border dark:border-white flex justify-center items-center rounded-full text-white'>
                <GiPrayerBeads size={20} />
            </span>
        </div>
      </Link>

      <Link href={ADMIN_COUPON_ADD}>
        <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-amber-500 via-amber-600 to-amber-600'>
            <h4 className='font-medium text-white dark:text-gray-200'>Add Coupon</h4>
            <span className='w-12 h-12 border dark:border-white flex justify-center items-center rounded-full text-white'>
                <RiCoupon2Line size={20} />
            </span>
        </div>
      </Link>

      <Link href={ADMIN_MEDIA_SHOW}>
        <div className='flex items-center justify-between p-3 rounded-lg shadow bg-white dark:bg-card bg-gradient-to-tr from-cyan-400  to-cyan-600'>
            <h4 className='font-medium text-white dark:text-gray-200'>Upload Media</h4>
            <span className='w-12 h-12 border dark:border-white flex justify-center items-center rounded-full text-white'>
                <MdOutlinePermMedia size={20} />
            </span>
        </div>
      </Link>
    </div>
  )
}

export default QuickAdd
