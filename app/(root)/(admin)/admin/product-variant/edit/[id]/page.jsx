'use client'
import BreadCrumb from '@/components/Application/Admin/BreadCrumb'
import Editor from '@/components/Application/Admin/Editor';
import MediaModal from '@/components/Application/Admin/MediaModal';
import ButtonLoading from '@/components/Application/ButtonLoading';
import Select from '@/components/Application/Select';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import useFetch from '@/hooks/useFetch';
import { showToast } from '@/lib/showToast';
import { sizes } from '@/lib/utils';
import { zSchema } from '@/lib/zodSchema';
import {  ADMIN_DASHBOARD, ADMIN_PRODUCT_VARIANT_SHOW } from '@/routes/AdminPanelRoute'
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import Image from 'next/image';
import { use, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


const breadcrumbData = [
  {href: ADMIN_DASHBOARD, label : 'Home'},
  {href: ADMIN_PRODUCT_VARIANT_SHOW, label : 'Product Variants'},
  {href: '', label : 'Edit Product Variants'}
]

const AddProduct = ({params}) => {

    const {id} = use(params);

    const [loading, setLoading] = useState(false);
    const [productOption, setProductOption] = useState([]);
    const {data : getProduct} = useFetch('/api/product?deleteType=SD&&size=10000');//10000 Product
    const {data: getProductVariant} = useFetch(`/api/product-variant/get/${id}`);
    // media modal states

    const [open , setOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState([]);

     useEffect(()=>{
        if(getProduct && getProduct.success){
          const data = getProduct.data;

          const options = data.map((product)=>({
            label:product.name,
            value : product._id,
          }));

          setProductOption(options);
        }
     },[getProduct]);

     const formSchema = zSchema.pick({
          _id : true,
          product : true,
          sku:true,
          color:true,
          size:true,
          mrp:true,
          sellingPrice:true,
          discountPercentage:true,
         
        });
      
        const form = useForm({
          resolver: zodResolver(formSchema),
          defaultValues: {
            _id : id,
            product : "",
            sku : "",
            color : "",
            size : "",
            mrp : "",
            sellingPrice : "",
            discountPercentage : "",
  
          },
        });

        useEffect(() => {
          if (getProductVariant && getProductVariant.success) {
            const variant = getProductVariant.data;

            form.reset({
              _id: variant?._id,
              product: variant?.product,
              color: variant?.color,
              size: variant?.size,
              sku: variant?.sku,
              mrp: variant?.mrp,
              sellingPrice: variant?.sellingPrice,
              discountPercentage: variant?.discountPercentage,
            });

            if (variant.media) {
              const media = variant.media.map((m) => ({
                _id: m._id,
                url: m.secure_url,
              }));
              setSelectedMedia(media);
            }
          }
        }, [getProductVariant]);


        // discount percentage calculation
         useEffect(()=>{
            const mrp = form.getValues('mrp') || 0;
            const sellingPrice = form.getValues('sellingPrice') || 0;
            if(mrp > 0 && sellingPrice > 0){
              const discountPercentage = ((mrp - sellingPrice) / mrp)*100;
  
              form.setValue('discountPercentage' , Math.round(discountPercentage));
            }
         }, [form.watch('mrp'), form.watch('sellingPrice')]);

 

        const onSubmit = async (values)=>{
            setLoading(true);
            try {
              if(selectedMedia.length <= 0){
                showToast('error', 'Please select media.');
                setLoading(false);
                return;
              }

              const mediaIds = selectedMedia.map(media => media._id);
              const payload = { ...values, media: mediaIds };
              const { data: response } = await axios.put('/api/product-variant/update', payload);

              if (!response.success) {
                throw new Error(response.message);
              }

              showToast('success', response.message);
            } catch (error) {
              showToast('error', error.message);
            } finally {
              setLoading(false);
            }
        }
  return (
    <div>
      <BreadCrumb breadcrumbData={breadcrumbData} />

      <Card className="py-0 rounded shadow-sm ">
                    <CardHeader className="pt-3 px-3 border-b [.border-b]:pb-2">
                      <h4 className='text-xl font-semibold'>Edit Product Variant</h4>
                    </CardHeader>
      
                    <CardContent className="pb-5">
                          <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)}  >
                                  
                                <div className='grid md:grid-cols-2 grid-cols-1  gap-5'>

                                   <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="product"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Product <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Select
                                                      options={productOption}
                                                      selected={field.value}
                                                      setSelected={field.onChange}
                                                      isMulti={false}
                                                    
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>

                                  <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="sku"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>SKU<span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Input type="text" placeholder="Enter sku" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>
                                  <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="color"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Color <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Input type="text" placeholder="Enter color" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>
                                  <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="size"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Size <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Select
                                                      options={sizes}
                                                      selected={field.value}
                                                      setSelected={field.onChange}
                                                      isMulti={false}
                                                    
                                                  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>

                                 

                                  <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="mrp"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>MRP <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Input type="number" placeholder="Enter MRP" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>

                                  <div className='mb-2'>
                                          <FormField
                                            control={form.control}
                                            name="sellingPrice"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Selling Price <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Input type="number" placeholder="Enter Selling Price" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>

                                  <div className='mb-3'>
                                          <FormField
                                            control={form.control}
                                            name="discountPercentage"
                                            render={({ field }) => (
                                              <FormItem>
                                                <FormLabel>Discount Percentage <span className='text-red-500'>*</span></FormLabel>
                                                <FormControl>
                                                  <Input type="number" readOnly placeholder="Enter Discount Percentage" {...field}  />
                                                </FormControl>
                                                <FormMessage />
                                              </FormItem>
                                            )}
                                          />
                                  </div>

                                </div>
      
                                 
                                  <div className='md:col-span-2 border border-dashed rounded p-5 text-center'>
                                            <MediaModal
                                              open={open}
                                              setOpen={setOpen}
                                              selectedMedia={selectedMedia}
                                              setSelectedMedia={setSelectedMedia}
                                              isMultiple={true}
                                            />

                                            {selectedMedia.length > 0 && 
                                            
                                              <div className='flex justify-center items-center gap-2 mb-3 flex-wrap'>
                                                {selectedMedia.map((media => (
                                                  <div key={media._id} className='h-24 w-24 border'>
                                                    <Image 
                                                       src={media.url}
                                                       height={100}
                                                       width={100}
                                                       alt='selectedMediaImg'
                                                       className='size-full object-cover'
                                                    />
                                                  </div>
                                                )))}
                                              </div>
                                            
                                            }

                                            <div onClick={()=> setOpen(true)} className='bg-white text-black  border-black dark:border-amber-700 border w-[200px] mx-auto p-5 cursor-pointer'>
                                                <span>Select Media</span>
                                            </div>
                                  </div>
      
                                  <div className='mb-3 mt-5'>
                                    <ButtonLoading loading={loading} type="submit" text = "Edit Product Variant" className='text-xm text-white font-semibold cursor-pointer hover:bg-amber-600' />
                                  </div>
      
                                 
      
                              </form>
                            </Form>
                    </CardContent>
                  </Card>
    </div>
  )
}

export default AddProduct
