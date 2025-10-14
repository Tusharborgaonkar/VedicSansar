'use client'
import Loading from '@/components/Application/Loading'
import UserPanelLayout from '@/components/Website/UserPanelLayout'
import WebsiteBreadcrumb from '@/components/Website/WebsiteBreadcrumb'
import useFetch from '@/hooks/useFetch'
import { WEBSITE_ORDER_DETAILS } from '@/routes/WebsiteRoute'
import Link from 'next/link'
import React from 'react'
const breadCrumbData = {
  title:'Orders',
  links:[{label : 'Orders'}]

}
const Orders = () => {
  const {data: orderData , loading} = useFetch('/api/user-order');

  return (
    <div>
      <WebsiteBreadcrumb props={breadCrumbData}/>

      <UserPanelLayout>
        <div className='shadow rounded'>

          <div className='p-5 text-xl font-semibold border-b'>
            Orders
          </div>

          <div className='p-5'>

              {loading ? 
              
                <div className='text-center py-5'>
                  Loading...
                </div>

                :


                <div className='overflow-auto'>

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
                    {orderData &&orderData?.data?.map((order , i)=>(
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
              }


          </div>

        </div>
      </UserPanelLayout>
    </div>
  )
}

export default Orders
