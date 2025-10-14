import axios from 'axios';
import Link from 'next/link'
import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";
import ProductBox from './ProductBox';
import { WEBSITE_SHOP } from '@/routes/WebsiteRoute';
const FeaturedProduct = async() => {
    const {data:productData} = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/product/get-featured-product`);

    if(!productData ) return null;
  return (
    //  Featured Products section
    
    <section className='lg:px-32 px-4 sm:py-10'>
        <div className='flex justify-between items-center mb-5'>
                <h2 className='sm:text-4xl text-2xl font-semibold text-amber-800'>Featured Products</h2>
                <Link href={WEBSITE_SHOP} className='flex gap-2 items-center underline underline-offset-4 hover:text-primary'>View All
                
                 <IoIosArrowRoundForward size={25} />
                </Link>
        </div>

        <div className='grid md:grid-cols-4 grid-cols-2 sm:gap-10 gap-2'>
            {!productData.success && 
                <div className='text-center py-5'>
                    Images are not loaded...Reload Page again!
                </div>
            }

            {productData.success && productData.data.map((product)=>(
                <ProductBox key={product._id} product={product}/>
            ))}
        </div>
    </section>
  )
}

export default FeaturedProduct
