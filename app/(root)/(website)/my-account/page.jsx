'use client'
import UserPanelLayout from '@/components/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Website/WebsiteBreadcrumb'
import React from 'react'
import { HiMiniShoppingBag } from "react-icons/hi2";
import { RiShoppingBag3Fill } from "react-icons/ri";
import { IoMdCart } from "react-icons/io";
import useFetch from '@/hooks/useFetch';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import { WEBSITE_ORDER_DETAILS } from '@/routes/WebsiteRoute';
const breadCrumbData = {
  title:'Dashboard',
  links:[{label : 'Dashboard'}]

}
const MyAccount = () => {
  const {data: dashboardData} = useFetch('/api/dashboard/user');
  const cartStore = useSelector(store=> store.cartStore);
  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData} />

      <UserPanelLayout>
        <div className='shadow rounded'>

          <div className='p-5 text-xl font-semibold border'>
            Dashboard
          </div>

          <div className='p-5'>

            <div className='grid lg:grid-cols-2 grid-cols-1 gap-10'>
              <div className='flex items-center justify-between gap-5 border rounded p-3'>

                <div>
                  <h4 className='font-semibold text-lg mb-1'>Total Orders</h4>
                  <span className='font-semibold text-amber-800'>{dashboardData?.data?.totalOrder || 0}</span>
                </div>

                <div className='w-14 h-14 bg-amber-800 rounded-full flex justify-center items-center'>
                  <HiMiniShoppingBag className='text-white' size={25} />
                </div>

              </div>
              
              <div className='flex items-center justify-between gap-5 border rounded p-3'>

                <div>
                  <h4 className='font-semibold text-lg mb-1'>Items In Cart</h4>
                  <span className='font-semibold text-amber-800'>{cartStore?.count}</span>
                </div>

                <div className='w-14 h-14 bg-amber-800 rounded-full flex justify-center items-center'>
                  <IoMdCart className='text-white' size={25} />
                </div>

              </div>
            </div>

            <div className='mt-5'>
              <h4 className='text-lg font-semibold mb-3'>Recent Orders</h4>

              <table className='w-full'>
                <thead>
                  <tr>
                    <th className='text-start p-2 text-sm border-b text-nowrap text-amber-800'>
                      Sr.No.
                    </th>
                    <th className='text-start p-2 text-sm border-b text-nowrap text-amber-800'>
                      Order id
                    </th>
                    <th className='text-start p-2 text-sm border-b text-nowrap text-amber-800'>
                      Total Item
                    </th>
                    <th className='text-start p-2 text-sm border-b text-nowrap text-amber-800'>
                      Amount
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {dashboardData && dashboardData?.data?.recentOrders?.map((order , i)=>(
                    <tr key={order._id}>
                      <td className='text-start text-sm text-gray-700 p-2 font-bold'> 
                      {i+1}
                      </td>

                      <td className='text-start text-sm text-gray-700 p-2 '> 
                       <Link className='font-semibold text-blue-500 underline underline-offset-2' href={WEBSITE_ORDER_DETAILS(order.order_id)}>
                       {order.order_id}

                       </Link>
                      </td>

                      <td className='text-start text-sm text-gray-900 p-2 '> 
                      {order.products.length}
                      </td>

                      <td className='text-start text-sm text-gray-900 p-2 font-semibold'> 
                      {order.totalAmount.toLocaleString('en-IN', {style: 'currency', currency: 'INR'})}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>
      </UserPanelLayout>
    </div>
  )
}

export default MyAccount
