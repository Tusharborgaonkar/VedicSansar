"use client";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { WEBSITE_CART, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import Link from "next/link";
import Image from "next/image";
import imgPlaceholder from "@/public/assets/images/img-placeholder.webp";
import { FaStar } from "react-icons/fa6";
import { decode, encode } from "entities";
import { HiMinus, HiPlus } from "react-icons/hi2";
import ButtonLoading from "@/components/Application/ButtonLoading";
import { useDispatch, useSelector } from "react-redux";
import { addIntoCart } from "@/store/reducer/cartReducer";
import { showToast } from "@/lib/showToast";
import { Button } from "@/components/ui/button";
import {  PuffLoader } from "react-spinners";
import ProductReview from "@/components/Website/ProductReview";
import { IoIosStar } from "react-icons/io";
const ProductDetails = ({ product, variant, colors, sizes, reviewCount }) => {

  const dispatch = useDispatch();

  const cartStore = useSelector(store=> store.cartStore);

  const [activeThumb, setActiveThumb] = useState();
  const [qty, setQty] = useState(1);

  const [isAddedIntoCart, setIsAddedIntoCart] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);
  useEffect(() => {
    setActiveThumb(variant?.media[0]?.secure_url);
  }, [variant]);

  useEffect(()=>{
    if(cartStore.count > 0){
      const existingProduct = cartStore.products.findIndex((cartProduct)=> cartProduct.productId === product._id && cartProduct.variantId === variant._id);

      if(existingProduct >= 0){
        setIsAddedIntoCart(true);
      }
      else{
        setIsAddedIntoCart(false);
      }
    }

    setIsProductLoading(false);
  },[variant]);

  const handleThumb = (thumbUrl) => {
    setActiveThumb(thumbUrl);
  };

  const handleQty = (actionType)=>{
    if(actionType === 'inc'){
        setQty(prev => prev + 1);
    }else{
        if(qty !== 1){
            setQty(prev => prev - 1);
        }
    }
  }

  const handleAddToCart = ()=>{
    const cartProduct = {
      productId: product._id,
      variantId: variant._id,
      name: product.name,
      url: product.slug,
      size:variant.size,
      color:variant.color,
      mrp:variant.mrp,
      sellingPrice:variant.sellingPrice,
      media: variant?.media[0]?.secure_url,
      qty: qty,
    }

    dispatch(addIntoCart(cartProduct));
    setIsAddedIntoCart(true);
    showToast('success', 'Product Added into Cart!');
  }
  return (
    <div className="lg:px-32 px-4">
      {isProductLoading && 
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50">
           <div className="p-3 font-semibold text-center">
              <PuffLoader
                color="#8e3d04"
                width={200}
              />
            </div>
        </div>
      }
      {/* breadcrumb */}
      <div className="my-10">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={WEBSITE_SHOP}>Product</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={WEBSITE_PRODUCT_DETAILS(product?.slug)}>
                  {product?.name}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="md:flex justify-between items-start lg:gap-10 gap-5 mb-20">
        <div className="md:w-1/2 xl:flex xl:justify-center xl:gap-5 md:sticky md:top-0">
          <div className="xl:order-last xl:mb-0 mb-5 xl:w-[calc(100%-144px)]">
            <Image
              src={activeThumb || imgPlaceholder}
              width={650}
              height={650}
              alt="product"
              className="border rounded max-w-full"
            />
          </div>

          <div className="flex xl:flex-col items-center xl:gap-5 gap-3 xl:w-36 overflow-auto xl:pb-0 pb-2 max-h-[600px]">
            {variant?.media?.map((thumb) => (
              <Image
                key={thumb._id}
                src={thumb?.secure_url || imgPlaceholder}
                width={100}
                height={100}
                alt="product thumbnail"
                className={`md:max-w-full max-w-16 rounded cursor-pointer ${
                  thumb.secure_url === activeThumb
                    ? "border-2 border-primary"
                    : "border"
                }`}
                onClick={() => handleThumb(thumb.secure_url)}
              />
            ))}
          </div>
        </div>

        <div className="md:w-1/2 md:mt-0 mt-5">
          <h1 className="text-3xl  font-semibold mb-2">{product.name}</h1>

          <div className="flex items-center gap-1 mb-5">
            {Array.from({ length: 5 }).map((_, i) => (
              <IoIosStar key={i} className="text-black" />
            ))}
            <span className="text-sm ps-2 text-amber-900">
              ({reviewCount} Reviews){" "}
            </span>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl text-red-600 font-semibold">
              {variant.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>

            <span className="text-sm text-gray-700 line-through">
              {variant.mrp.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>

            <span className="bg-amber-800 rounded-2xl px-3 py-1 text-white text-xs ms-5">
              -{variant.discountPercentage}% Off
            </span>
          </div>

          <div
            className="line-clamp-3 text-amber-800"
            dangerouslySetInnerHTML={{ __html: decode(product.description) }}
          ></div>

          <div className="mt-5">
              <p className="mb-2">
                <span className="font-semibold">Color : </span>{variant?.color}
              </p>
            <div className="flex gap-5 ">
              {colors.map((color) => (
                <Link onClick={()=>setIsProductLoading(true)} href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${color}&size=${variant.size}`}
                    key={color}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white ${color === variant.color ? 'bg-gray-900 text-white' : ''}`}
                >{color}</Link>
              ))}
            </div>

          </div>
          <div className="mt-5">
              <p className="mb-2">
                <span className="font-semibold">Size : </span>{variant?.size}
              </p>
            <div className="flex gap-5 ">
              {sizes.map((size) => (
                <Link onClick={()=>setIsProductLoading(true)} href={`${WEBSITE_PRODUCT_DETAILS(product.slug)}?color=${variant.color}&size=${size}`}
                    key={size}
                    className={`border py-1 px-3 rounded-lg cursor-pointer hover:bg-gray-700 hover:text-white ${size === variant.size ? 'bg-gray-900 text-white' : ''}`}
                >{size}</Link>
              ))}
            </div>

          </div>

          <div className="mt-5 ">

            <p className="font-bold mb-2" >Quantity</p>
            <div className="flex items-center h-10 border border-amber-700 w-fit rounded-full">
                <button type="button" className="h-full w-10 flex justify-center items-center" onClick={()=>handleQty('desc')}>
                    <HiMinus />
                </button>
                <input type="text" value={qty} className="w-14 text-center border-none outline-offset-0 " readOnly/>
                <button type="button" className="h-full w-10 flex justify-center items-center" onClick={()=>handleQty('inc')}>
                    <HiPlus />
                </button>
            </div>

          </div>

          <div className="mt-5  items-center gap-5">
            {/* <ButtonLoading type="button" text="Buy Now" className="w-full rounded-full py-6 px-6 text-md bg-gray-900 hover:bg-gray-700 cursor-pointer" /> */}

            {!isAddedIntoCart ? 
              <ButtonLoading type="button" onClick={handleAddToCart} text="Add to Cart" className="w-full rounded-full py-6  text-md bg-amber-900 hover:bg-amber-800 cursor-pointer" />

              :

              <Button className="w-full rounded-full py-6 px-6 text-md bg-amber-900 hover:bg-amber-800 cursor-pointer"  type="button" asChild>
                <Link href={WEBSITE_CART}>Go To Cart</Link>
              </Button>
            
            }
          </div>
        </div>
      </div>

      {/* Product details section */}

      <div className="mb-15 ">
        <div className="shadow rounded border">
          <div className="p-3 bg-gray-50 border-b">
              <h2 className="font-semibold text-2xl text-amber-800">Product Description : </h2>
          </div>

            <div className="p-3">
              <div dangerouslySetInnerHTML={{__html: encode(product.description)}}></div>
            </div>
          
        </div>
      </div>

      {/* Reviews section */}

      <ProductReview productId={product._id} />
    </div>
  );
};

export default ProductDetails;
