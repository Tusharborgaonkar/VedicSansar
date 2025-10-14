'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Img1 from "@/public/assets/images/header1.png"
import Img2 from "@/public/assets/images/header2.png"


// import Img3 from "@/public/assets/images/header3.png"
import Image from 'next/image';
import { IoChevronForward } from "react-icons/io5";
import { IoChevronBackOutline } from "react-icons/io5";
const ArrowNext = (props)=>{
    const {onClick} = props;
    return(
        <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2  bg-amber-700 text-white right-10'>
            <IoChevronForward  size={25} />
        </button>
    )
}

const ArrowPrev = (props)=>{
    const {onClick} = props;
    return(
        <button onClick={onClick} type='button' className='w-14 h-14 flex justify-center items-center rounded-full absolute z-10 top-1/2 -translate-y-1/2 bg-amber-700 text-white left-10'>
            <IoChevronBackOutline  size={25} />
        </button>
    )
}
const MainSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    nextArrow: <ArrowNext />,
    prevArrow: <ArrowPrev />,
    responsive:[
    {
        breakpoint: 480,
        settings: {
          dots: true,
          arrow: false,
          nextArrow: '',
          prevArrow: '',
        }
    },
    ]

};
  return (
   <div>
     <Slider {...settings}>
      <div>
        <Image src={Img2.src} width={Img2.width} height={Img2.height} className='w-full' alt='slider 1' />
      </div>
      <div>
        <Image src={Img1.src} width={Img1.width} height={Img1.height} className='w-full' alt='slider 2'  />
      </div>
  
      
    </Slider>
   </div>
  )
}

export default MainSlider
