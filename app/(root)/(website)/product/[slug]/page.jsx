import axios from 'axios';
import React from 'react'
import ProductDetails from './ProductDetails';

const ProductPage = async({params, searchParams}) => {
  const {slug} = await params;
  const {color, size} = await searchParams;

  let url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/details/${slug}`

  if(color && size){
    url += `?color=${color}&size=${size}`
  }

  try {
    const {data: getProduct} = await axios.get(url);

    if(!getProduct.success){
      return (
        <div className='flex justify-center items-center py-10 h-[300px]'>
          <h1 className='text-4xl text-primary font-semibold'>Product Not Found!</h1>
        </div>
      )
    }
    
    return (
      <ProductDetails 
        product={getProduct?.data?.product}
        variant={getProduct?.data?.variant}
        colors={getProduct?.data?.colors}
        sizes={getProduct?.data?.sizes}
        reviewCount={getProduct?.data?.reviewCount}
      />
    )
  } catch (error) {
    // Handle 404 and other errors
    if (error.response?.status === 404) {
      return (
        <div className='flex justify-center items-center py-10 h-[300px]'>
          <h1 className='text-4xl text-primary font-semibold'>Product Not Found!</h1>
        </div>
      )
    }

    return (
      <div className='flex justify-center items-center py-10 h-[300px]'>
        <div className='text-center'>
          <h1 className='text-4xl text-primary font-semibold mb-4'>Something went wrong!</h1>
          <p className='text-gray-600'>Unable to load product details.</p>
        </div>
      </div>
    )
  }
}

export default ProductPage