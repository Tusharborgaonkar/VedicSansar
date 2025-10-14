'use client'
import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { FaStar } from "react-icons/fa6";
import { BsChatQuote } from "react-icons/bs";
const testimonials = [
  {
    name:"Dsharma",
    review: "I am amazed by the authenticity and quality of the gemstones from VedicSansar. Each piece has a unique spiritual energy that I truly feel when wearing them. The craftsmanship is impeccable and makes me feel connected to my culture.",
    rating: 5
  },
  {
    name:"Dsharma",
    review: "The bracelets and pendants I bought are beautiful and resonate deeply with my spiritual practices. VedicSansar's service was excellent, and delivery was prompt. I highly recommend their gemstone jewellry to anyone seeking genuine products.",
    rating: 5
  },
  {
    name:"Diwakar",
    review: "VedicSansar offers an amazing collection of gemstone jewelry with great attention to detail. The stones are vibrant and true to their descriptions. I am very pleased with my purchase and will shop here again.",
    rating: 5
  },
  {
    name:"Raj",
    review: "My experience with VedicSansar was wonderful. The customer support guided me to select the right gemstone for my needs. The jewelry arrived safely packaged and exceeded my expectations in quality.",
    rating: 5
  },
  {
    name:"Rahul",
    review: "I love the spiritual essence that VedicSansar's products bring into my daily life. Their authentic gemstones and unique designs create a powerful connection, making the jewelry more than just an accessory.",
    rating: 5
  },
  {
    name:"Mukesh Ambani",
    review: "Great quality and authentic gemstone jewelry at reasonable prices. It's rare to find such dedication to spiritual significance combined with artistry. VedicSansar is my go-to place for meaningful jewelry.",
    rating: 4
  },
  {
    name:"Mark",
    review: "The black tourmaline bracelet I purchased from VedicSansar is absolutely stunning and feels very protective. I appreciate the detailed information they provide about each stone's properties.",
    rating: 5
  },
  {
    name:"Elon",
    review: "I was impressed by the elegant packaging and quick delivery. The gemstones used are genuine, and the designs are inspired by sacred traditions, which makes each piece so special.",
    rating: 5
  },
  {
    name:"Aditya Sharma",
    review: "Beautiful craftsmanship and high-quality gemstones that really stand out. I have recommended VedicSansar to many friends who seek authentic spiritual jewelry and quality assurance.",
    rating: 5
  },
  {
    name:"Neeta",
    review: "VedicSansar's collection is carefully curated with spiritual meaning in mind. The products are both aesthetically pleasing and energetically powerful. I'm very happy with my purchase experience overall.",
    rating: 4
  }
];

const Testimonial = () => {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    responsive:[
    {
        breakpoint: 1024,
        settings: {
          dots: true,
          infinite: true,
          slidesToShow: 2,
          slidesToScroll: 1,
        }
    },
     {
        breakpoint: 768,
        settings: {
          dots: true,
          slidesToShow: 1,
          slidesToScroll: 1,
        }
    },
    ]

};
   return (
   <div className='lg:px-32 px-4 sm:pt-20 pt-5 pb-10'>
    <h2 className='text-center sm:text-4xl text-2xl mb-5 font-semibold text-amber-800'>Customer Review</h2>
     <Slider {...settings}>
      
      {testimonials.map((item,index)=>(
        <div key={index} className='p-5 '>
            <div className='border rounded-lg p-5'>
                <BsChatQuote size={25} className='mb-3' />
                <p className='mb-5'>{item.review}</p>
                <h4 className='font-semibold '>{item.name}</h4>
                <div className='flex mt-1'>
                    {
                    Array.from({length:item.rating}).map((_,i)=>(
                        <FaStar key={`star${i}`} className='text-yellow-400' size={20}/>
                    ))
                    }
                </div>
            </div>
        </div>
      ))}
    </Slider>
   </div>
  )
}

export default Testimonial
