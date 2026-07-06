'use client'
import ButtonLoading from '@/components/Application/ButtonLoading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import WebsiteBreadcrumb from '@/components/Website/WebsiteBreadcrumb'
import useFetch from '@/hooks/useFetch'
import { showToast } from '@/lib/showToast'
import { zSchema } from '@/lib/zodSchema'
import { WEBSITE_ORDER_DETAILS, WEBSITE_PRODUCT_DETAILS, WEBSITE_SHOP } from '@/routes/WebsiteRoute'
import { addIntoCart, clearCart } from '@/store/reducer/cartReducer'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { MdDiscount } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { MdDelete } from "react-icons/md";
import { FaShippingFast, FaCreditCard, FaMoneyBillWave } from "react-icons/fa";
import { Textarea } from '@/components/ui/textarea'
import z from 'zod'
import Script from 'next/script'
import { useRouter } from 'next/navigation'
import loading from '@/public/assets/images/loading.svg'


const breadCrumb = {
  title:'Checkout',
  links : [
    {label : "Checkout"}
  ]
}
const Checkout = () => {
  const router = useRouter();
  const dispatch = useDispatch()
  const cart = useSelector(store => store.cartStore);
  const authStore = useSelector(store => store.authStore);

  const [verifiedCartData , setVerifiedCartData ] = useState([]);
  const {data: getVerifiedCartData} = useFetch('/api/cart-verification', 'POST', {
    data: cart.products
  });

  const [isCouponApplied, setIsCouponApplied] = useState(false);
  const [couponLoading, setCouponLoading] = useState(false);
  const [subtotal, setSubTotal] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [couponDiscountAmount, setCouponDiscountAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [couponCode , setCouponCode] = useState('');
  const [placingOrder, setPlacingOrder] = useState(false);
  const [savingOrder, setSavingOrder] = useState(false);

  useEffect(()=>{
    if(getVerifiedCartData && getVerifiedCartData.success){
      const cartData = getVerifiedCartData.data;
      setVerifiedCartData(cartData);
      dispatch(clearCart());

      cartData.forEach(cartItem => {
          dispatch(addIntoCart(cartItem));        
      });
    }
  }, [getVerifiedCartData]);

  useEffect(()=>{
        const cartProducts = cart.products;
        const subTotalAmount = cartProducts.reduce((sum, product)=> sum + (product.sellingPrice * product.qty) , 0);
        const discount = cartProducts.reduce((sum, product)=> sum + ((product.mrp - product.sellingPrice) * product.qty) , 0);
        setSubTotal(subTotalAmount);
        setDiscount(discount);
        setTotalAmount(subTotalAmount);

        couponForm.setValue('minShoppingAmount' , subTotalAmount)
        
      },[cart]);

  // coupon form

  const couponFormSchema = zSchema.pick({
    code:true,
    minShoppingAmount:true,
  });

  const couponForm = useForm({
    resolver: zodResolver(couponFormSchema),
    defaultValues: {
      code: "",
      minShoppingAmount: subtotal
    }
  });

  const applyCoupon = async(values)=>{
    setCouponLoading(true);

    try {

      const {data : response} = await axios.post('/api/coupon/apply', values);
      
      if(!response.success){
        throw new Error(response.message);
      }

      const discountPercentage = response.data.discountPercentage;
      // get coupon discount amount

      setCouponDiscountAmount((subtotal * discountPercentage) / 100);
      setTotalAmount(subtotal - ((subtotal * discountPercentage) / 100));
      showToast('success', response.message);
      setCouponCode(couponForm.getValues('code'));
      setIsCouponApplied(true);
      couponForm.resetField('code', '');

    } catch (error) {
      showToast('error' , error.message);
    } finally{
      setCouponLoading(false);
    }
  }

  const removeCoupon = ()=>{
    setIsCouponApplied(false);
    setCouponCode('');
    setCouponDiscountAmount(0);
    setTotalAmount(subtotal);
  }

  // place order

  const orderFormSchema = zSchema.pick({
    name:true,
    email:true,
    phone:true,
    country:true,
    state:true,
    city:true,
    pincode:true,
    landmark:true,
    ordernote:true,
    
  }).extend({
    userId: z.string().optional(),
    paymentMethod: z.enum(['online', 'cod']),
  })

  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      name:'',
      email:'',
      phone:'',
      country:'',
      state:'',
      city:'',
      pincode:'',
      landmark:'',
      ordernote:'',
      paymentMethod: 'online',
      userId: authStore?.auth?._id,
    }
  });

  useEffect(()=>{
    if(authStore){
      orderForm.setValue('userId', authStore?.auth?._id);
    }
  }, [authStore])

  // GET ORDER ID

  const getOrderId = async(amount)=>{
    try{
      const {data : orderIdData} = await axios.post('/api/payment/get-order-id', {amount});

      if(!orderIdData.success){
        throw new Error(orderIdData.message || 'Failed to generate order ID'); 
      }

      return {success: true, order_id: orderIdData.data}
    } catch(error)
    {
      const errorMsg = error.response?.data?.message || error.response?.data?.error?.error?.description || error.message;
      return {success: false, message: errorMsg}
    }
  }

  const placeOrder = async(formData)=>{

    setPlacingOrder(true);
    try {
      const products = verifiedCartData.map((cartItem)=>(
        {
           productId : cartItem.productId,
           variantId: cartItem.variantId,
           name: cartItem.name,
           qty: cartItem.qty,
           mrp: cartItem.mrp,
           sellingPrice: cartItem.sellingPrice,
        }
      ))

      if (formData.paymentMethod === 'cod') {
        setSavingOrder(true);
        const {data : paymentResponseData} = await axios.post('/api/payment/save-order', {
            ...formData,
            products : products,
            subtotal : subtotal,
            discount: discount,
            couponDiscountAmount: couponDiscountAmount,
            totalAmount:totalAmount
        })

        if(paymentResponseData.success){
          showToast('success', paymentResponseData.message);
          dispatch(clearCart())
          orderForm.reset();
          router.push(WEBSITE_ORDER_DETAILS(paymentResponseData.data.order_id))
        } else {
          showToast('error', paymentResponseData.message);
          setSavingOrder(false);
        }
        return;
      }

      const generateOrderId = await getOrderId(totalAmount);

      if(!generateOrderId.success){
        throw new Error(generateOrderId.message);
      }

      const order_id = generateOrderId.order_id;

      const razOption = {
        "key": process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
        "amount": totalAmount * 100,
        "currency": "INR",
        "name": "VedicSansar",
        "description": "Payment for Order",
        "image": "https://res.cloudinary.com/dw5az6hsg/image/upload/w_1222,h_1222,c_fill/v1759950168/logo5_h4varn.webp",
        "order_id": order_id, 
        "handler": async function (response){
           setSavingOrder(true);

            const {data : paymentResponseData} = await axios.post('/api/payment/save-order', {
                ...formData,
                ...response,
                products : products,
                subtotal : subtotal,
                discount: discount,
                couponDiscountAmount: couponDiscountAmount,
                totalAmount:totalAmount
            })

            if(paymentResponseData.success){
              showToast('success', paymentResponseData.message);
              dispatch(clearCart())

              orderForm.reset();
              router.push(WEBSITE_ORDER_DETAILS(response.razorpay_order_id))
            }
            else{
              showToast('error', paymentResponseData.message);
              setSavingOrder(false);
            }
        },
        "prefill": {
            "name": formData.name,
            "email": formData.email,
            "contact": formData.phone,
        },
        "theme": {
            "color": "#a13f03"
        }
      }

      const rzp = new Razorpay(razOption)
      rzp.on('payment.failed', function (response){
        showToast('error' , response.error.description); 
      });

      rzp.open();
    } catch (error) {
      showToast('error', error.message);
      
    } finally{
      setPlacingOrder(false);
    }
  }

  

  return (
    <div>

      {savingOrder && 
        <div className='h-screen w-screen fixed top-0 left-0 z-50 bg-black/60 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-lg flex flex-col items-center justify-center shadow-lg dark:bg-gray-800'>
                <Image src={loading.src} height={80} width={80} alt='loading'/>
                <h4 className='text-amber-900 font-semibold mt-4 text-center dark:text-amber-500'>Order Confirming...</h4>
          </div>
        </div>
      }
      <WebsiteBreadcrumb props={breadCrumb} />

      {cart.count === 0 
      ?
         <div className='w-screen h-[500px] flex justify-center items-center py-32'>
          <div className='text-center'>
            <h4 className='text-4xl font-semibold mb-5'>Your Cart is Empty!</h4>

            <Button type="button" asChild>
              <Link href={WEBSITE_SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        </div> 

        :

        <div className='flex lg:flex-nowrap flex-wrap gap-10 my-20 lg:px-32 px-4'>
           <div className='lg:w-[60%] w-full'>
              <div className='flex font-semibold gap-2 items-center'>
                  <FaShippingFast size={40}/> Shipping Address:
                </div>

                <div className='mt-5'>
                    <Form {...orderForm}>
                                    <form className='grid grid-cols-2 gap-5' onSubmit={orderForm.handleSubmit(placeOrder)}>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='name'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input placeholder="Full Name*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='email'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input type="email" placeholder="Email Address*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='phone'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="Phone Number*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='country'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="Country*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='state'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="State*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>
                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='city'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="City*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>

                                      <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='pincode'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="Pincode*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>

                                       <div className='mb-3'>
                                        <FormField
                                          control={orderForm.control}
                                          name='landmark'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Input  placeholder="LandMark*" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>

                                      <div className='mb-3 col-span-2'>
                                        <FormField
                                          control={orderForm.control}
                                          name='ordernote'
                                          render = {({field})=>(
                                              <FormItem>
                                                <FormControl>
                                                  <Textarea  placeholder="Enter Order Note" 
                                                    {...field}
                                                  />
                                                </FormControl>

                                                <FormMessage />
                                              </FormItem>
                                          )}
                                        >

                                        </FormField>
                                      </div>

                                      <div className='mb-6 col-span-2 mt-6'>
                                        <FormField
                                          control={orderForm.control}
                                          name='paymentMethod'
                                          render={({ field }) => (
                                            <FormItem className="space-y-4">
                                              <Label className="font-bold text-xl text-gray-800 dark:text-gray-200 tracking-tight">Payment Method</Label>
                                              <FormControl>
                                                <RadioGroup
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                  className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                                >
                                                  <FormItem className="space-y-0">
                                                    <FormControl>
                                                      <RadioGroupItem value="online" className="peer sr-only" />
                                                    </FormControl>
                                                    <FormLabel
                                                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-amber-700 peer-data-[state=checked]:bg-amber-50 dark:peer-data-[state=checked]:bg-amber-900/30 dark:peer-data-[state=checked]:border-amber-500 cursor-pointer transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1"
                                                    >
                                                      <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full mb-4">
                                                        <FaCreditCard className="h-8 w-8 text-amber-700 dark:text-amber-400" />
                                                      </div>
                                                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Pay Online</span>
                                                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center font-medium">Credit/Debit, UPI, & Wallets</span>
                                                    </FormLabel>
                                                  </FormItem>
                                                  
                                                  <FormItem className="space-y-0">
                                                    <FormControl>
                                                      <RadioGroupItem value="cod" className="peer sr-only" />
                                                    </FormControl>
                                                    <FormLabel
                                                      className="flex flex-col items-center justify-center rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800/50 p-6 hover:bg-gray-50 dark:hover:bg-gray-800 peer-data-[state=checked]:border-amber-700 peer-data-[state=checked]:bg-amber-50 dark:peer-data-[state=checked]:bg-amber-900/30 dark:peer-data-[state=checked]:border-amber-500 cursor-pointer transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1"
                                                    >
                                                      <div className="bg-amber-100 dark:bg-amber-900/50 p-4 rounded-full mb-4">
                                                        <FaMoneyBillWave className="h-8 w-8 text-amber-700 dark:text-amber-400" />
                                                      </div>
                                                      <span className="text-lg font-bold text-gray-900 dark:text-gray-100">Cash on Delivery</span>
                                                      <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 text-center font-medium">Pay via cash when order arrives</span>
                                                    </FormLabel>
                                                  </FormItem>
                                                </RadioGroup>
                                              </FormControl>
                                              <FormMessage />
                                            </FormItem>
                                          )}
                                        />
                                      </div>
                                          
                                      <div className='mb-3'>
                                        <ButtonLoading type="submit" text="Place Order" loading={placingOrder} className="bg-black rounded-full px-5 hover:bg-gray-900 cursor-pointer" />
                                      </div>
                       
                                    </form>
                                  </Form>
                </div>
          </div>

            <div className='lg:w-[40%] w-full'>
                <div className='rounded bg-gray-50 dark:bg-gray-800 dark:text-white p-5 sticky top-5'>
                  <h4 className='text-lg font-semibold mb-5'>Order Summary</h4>

                  <div>

                    <table className='w-full border'>
                      <tbody>
                        {verifiedCartData && verifiedCartData?.map(
                          product=>(
                            <tr key={product.variantId}>
                              <td className='p-3'>
                                <div className='flex items-center gap-5'>
                                  <Image src={product.media} width={60} height={60} alt={product.name} className='rounded'
                                  />

                                  <div>
                                    <h4 className='font-medium line-clamp-1'>
                                      <Link href={WEBSITE_PRODUCT_DETAILS(product.url)}>{product.name}</Link>
                                    </h4>

                                    <p className='text-sm'>Color: {product.color}</p>
                                    <p className='text-sm'>Size: {product.size}</p>
                                  </div>
                                </div>
                              </td>

                              <td className='p-3 text-center'>

                                <p className='text-nowrap text-sm'>
                                  {product.qty} x {product.sellingPrice.toLocaleString(
                                    'en-IN', {style : 'currency', currency : 'INR'}
                                  )}
                                </p>

                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    
                    <table className='w-full'>
                      <tbody>
                        <tr>
                          <td className='font-medium py-2'>Subtotal</td>
                          <td className='text-end py-2'>
                            {subtotal.toLocaleString('en-IN', {style : 'currency', currency: 'INR'})}
                          </td>

                        </tr>

                        <tr>
                          <td className='font-medium py-2 flex items-center gap-2'>Discount <RiDiscountPercentFill size={25}/></td>
                          <td className='text-end py-2 text-red-700 font-semibold'>
                           - {discount.toLocaleString('en-IN', {style : 'currency', currency: 'INR'})}
                          </td>

                        </tr>

                        <tr>
                          <td className='font-medium py-2 flex items-center gap-2'>Coupon Discount <MdDiscount size={20} /></td>
                          <td className='text-end py-2 text-amber-700 font-bold'>
                          - {couponDiscountAmount.toLocaleString('en-IN', {style : 'currency', currency: 'INR'})}
                          </td>

                        </tr>

                        <tr>
                          <td className='py-2 text-xl font-semibold'>Total</td>
                          <td className='text-end py-2 text-amber-900 font-semibold underline'>
                            {totalAmount.toLocaleString('en-IN', {style : 'currency', currency: 'INR'})}
                          </td>

                        </tr>
                      </tbody>
                    </table>

                    <div className='mt-2 mb-5'>
                          {!isCouponApplied 
                            ?
                            <Form {...couponForm}> 
                              <form className='flex justify-between gap-5' onSubmit={couponForm.handleSubmit(applyCoupon)}>
                                <div className='w-[calc(100%-100px)]'>
                                  <FormField
                                    control={couponForm.control}
                                    name='code'
                                    render = {({field})=>(
                                        <FormItem>
                                          <FormControl>
                                            <Input placeholder="Enter Coupon code" 
                                              {...field}
                                            />
                                          </FormControl>

                                          <FormMessage />
                                        </FormItem>
                                    )}
                                  >

                                  </FormField>
                                </div>
                                    
                                    <div className='w-[100px]'>
                                      <ButtonLoading type="submit" text="Apply" className="w-full cursor-pointer text-white bg-amber-900 hover:bg-amber-800" loading={couponLoading}/>
                                    </div>

                              </form>
                            </Form>

                            :

                            <div className='flex justify-between py-1 px-5 rounded-lg bg-gray-200 dark:bg-gray-700 dark:text-white'>

                              <div>
                                <span className='text-xs flex items-center gap-2 '>Coupon: <MdDiscount size={18} /></span>
                                
                                <p className='text-sm font-semibold'>{couponCode}</p>
                              </div>

                              <button type="button" onClick={removeCoupon} className='text-red-700 cursor-pointer'>
                                    <MdDelete size={25} />
                                    
                               </button>

                            </div>
                          }
                      </div>

                    <p className='text-center'>
                      <Link href={WEBSITE_SHOP} className='hover:underline text-amber-900 font-semibold'>Continue Shopping</Link>
                    </p>
                  </div>
                </div>  
          </div>
        
        </div>
      }

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  )
}

export default Checkout
