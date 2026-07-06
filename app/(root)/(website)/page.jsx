import MainSlider from '@/components/Website/MainSlider'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import banner1 from "@/public/assets/images/hero_section1.png"
import banner2 from "@/public/assets/images/hero_section2.jpg"
import FeaturedProduct from '@/components/Website/FeaturedProduct'
import footerBanner from '@/public/assets/images/footersection1.jpg'
import Testimonial from '@/components/Website/Testimonial'
import { MdOutlinePayment } from "react-icons/md";
import { FaShippingFast } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";
import { MdOutlineLocalShipping } from "react-icons/md";

const Home = () => {
  return (
    <>

      <section>
      <MainSlider />
      </section>  

      {/* Banner section */}
      <section className='lg:px-32 px-4 pt-5 sm:pt-20 pb-10'>

        <div className='grid grid-cols-2 gap-2 sm:gap-6'>

          <div className='border rounded-lg overflow-hidden aspect-[4/3]'>
            <Link href="" >
              <Image 
                src={banner1.src}
                width={banner1.width}
                height={banner1.height}
                alt='banner 1'
                className='w-full h-full object-cover transition-all hover:scale-110'
              />
            </Link>
          </div>

          <div className='border rounded-lg overflow-hidden aspect-[4/3]'>
            <Link href="" >
              <Image 
                src={banner2.src}
                width={banner2.width}
                height={banner2.height}
                alt='banner 2'
                className='w-full h-full object-cover transition-all hover:scale-110'
              />
            </Link>
          </div>

        </div>

      </section>

      <FeaturedProduct />


      <section className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
        <Image
          src={footerBanner.src}
          width={footerBanner.width}
          height={footerBanner.height}
          alt='Footer-banner'
          className='w-full transition-all hover:scale-105 cursor-pointer'
        />
      </section>

      <Testimonial />

      {/* service section */}

      <section className=' lg:px-32 px-4 border-t-amber-800 py-10 mb-5 border border-b-amber-800'>

        <div className='grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-10'>
          <div className='text-center'>
            <p className='flex justify-center items-center mb-3'>
                <MdOutlinePayment size={40}/>
            </p>
            <h3 className='text-xl font-semibold'>COD Available.</h3>
            <p>Pay cash on delivery, no prepayment needed.</p>

          </div>
          <div className='text-center'>
            <p className='flex justify-center items-center mb-3'>
                <FaShippingFast  size={40}/>
            </p>
            <h3 className='text-xl font-semibold'>Free Shipping.</h3>
            <p>No extra cost, pay only for product.</p>

          </div>
          <div className='text-center'>
            <p className='flex justify-center items-center mb-3'>
                <BiSupport  size={40}/>
            </p>
            <h3 className='text-xl font-semibold'>24/7 Support.</h3>
            <p>24/7 support,always here for you.</p>

          </div>
          <div className='text-center'>
            <p className='flex justify-center items-center mb-3'>
                <MdOutlineLocalShipping size={40}/>
            </p>
            <h3 className='text-xl font-semibold'>Fast Delivery.</h3>
            <p>Within 4 to 6 working days.</p>

          </div>
          
        </div>

      </section>
    </>
  )
}

export default Home
