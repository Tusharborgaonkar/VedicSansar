'use client'
import { IoCartOutline } from "react-icons/io5";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useDispatch, useSelector } from "react-redux";
import imgPlaceholder from "@/public/assets/images/img-placeholder.webp"
import { removeFromCart } from "@/store/reducer/cartReducer";
import Image from "next/image";
import Link from "next/link";
import { WEBSITE_CART, WEBSITE_CHECKOUT, WEBSITE_SHOP } from "@/routes/WebsiteRoute";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { PiShoppingCart } from "react-icons/pi";
const Cart = () => {
  const [open, setOpen] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);

  const cart = useSelector(store => store.cartStore);
  const dispatch = useDispatch();

  useEffect(()=>{
    const cartProducts = cart.products;
    const totalAmount = cartProducts.reduce((sum, product)=> sum + (product.sellingPrice * product.qty) , 0);
    const discount = cartProducts.reduce((sum, product)=> sum + ((product.mrp - product.sellingPrice) * product.qty) , 0);

    setSubTotal(totalAmount);
    setDiscount(discount);
    
  },[cart]);

  return (
    // <button>
    //   
    // </button>

    <Sheet open={open} onOpenChange={setOpen}>
  <SheetTrigger className="relative">
    <IoCartOutline    
        className="text-gray-800 hover:text-primary cursor-pointer"
        size={25}
      />
      <span className="absolute bg-amber-800 text-white text-xs rounded-full w-4 h-4 flex justify-center items-center -right-2 -top-1">{cart.count}</span>
  </SheetTrigger>
  <SheetContent className="sm:max-w-[450px] w-full">
    <SheetHeader className="py-2">
      <SheetTitle className="text-2xl font-bold text-amber-900 flex items-center gap-2" ><PiShoppingCart className="text-black " size={19} /> My Cart</SheetTitle>
      <SheetDescription></SheetDescription>
    </SheetHeader>

    <div className="h-[calc(100vh-40px)] pb-10 border-t">
      <div className="h-[calc(100%-128px)] overflow-auto px-2"> 
        {cart.count === 0 && <div className="h-full flex flex-col justify-center items-center gap-10 text-xl font-semibold">
            Your Cart is Empty.

            <Button type="button" asChild className="w-1/2 bg-amber-900 hover:bg-amber-800">
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>  
        }

        {cart.products?.map((product=>(
          <div key={product.variantId} className="flex justify-between items-center gap-5 mb-4 border-b pt-4 pb-4">
              <div className="flex gap-5 items-center"> 
                <Image 
                  src={product.media || imgPlaceholder.src}
                  height={100}
                  width={100}
                  alt={product.name}
                  className="w-20 h-20 rounded border"
                />

                <div>     
                  <h4 className="text-lg mb-1">{product.name}</h4>


                  <p>
                    {product.size}/{product.color}
                  </p>
                </div>
              </div>

              <div>
                <button type="button" className="text-red-500 underline underline-offset-1 mb-2 cursor-pointer" onClick={()=>dispatch(removeFromCart({productId : product.productId, variantId : product.variantId}))}>
                  Remove
                </button>

                <p className="font-semibold">
                  {product.qty} X {product.sellingPrice.toLocaleString('en-IN', {style : 'currency', currency : 'INR'})}
                </p>
              </div>
          </div>
        )))}
      </div>
      {cart.count == 0 ? '' : 

        <div className="h-32 border-t pt-5 px-2">

        <h2 className="flex justify-between items-center text-lg font-semibold"><span>SubTotal</span> <span>{subtotal?.toLocaleString('en-IN', {style : 'currency', currency : 'INR'})}</span></h2>

        <h2 className="flex justify-between items-center text-lg font-semibold"><span>Discount</span> <span className="text-red-700">- {discount?.toLocaleString('en-IN', {style : 'currency', currency : 'INR'})}</span></h2>

        <div className="flex justify-between gap-5 px-2 mt-5 mr-4">

          <Button type="button" asChild  className="w-1/2 bg-amber-900 hover:bg-amber-800" onClick={()=> setOpen(false)}>
            <Link href={WEBSITE_CART} >View Cart</Link>
          </Button>

          <Button type="button" asChild  className="w-1/2 text-white bg-black hover:bg-gray-900" onClick={()=> setOpen(false)}>
            <Link href={WEBSITE_CHECKOUT} >Checkout</Link>
          </Button>

        </div>

      </div>
      
      }
    </div>
  </SheetContent>
</Sheet>
  );
};

export default Cart;
