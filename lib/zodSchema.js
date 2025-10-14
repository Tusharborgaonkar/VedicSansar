import {z} from 'zod'

export const zSchema = z.object({
    email: z
        .string()
        .email({message:"Invalid email address"}),

    password: z
        .string()
        .min(6, {message : "Password must be at least 6 characters long"})
        .max(64, {message : "Password must be at most 64 characters long"}),
    
    name: z
        .string()
        .min(2, {message: "Name must be at least 2 characters"})
        .max(50, {message: "Name must be at most 50 characters"}),
        
    otp: z.string().regex(/^\d{6}$/, {
        message:"OTP must be a 6-digit number",
    }),
    _id : z.string().min(3, '_id is required.'),
    alt : z.string().min(3, 'Alt is required.'),
    title : z.string().min(3, 'Title is required.'),
    slug: z.string().min(3, 'Slug is required.'),

    category: z.string().min(3, 'Catgeory is required.'),
    mrp : z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    sellingPrice : z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    discountPercentage : z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    description : z.string().min(3 , 'Description is required.'),
    media: z.array(z.string()),
    product : z.string().min(3, 'Product is required.'),
    color : z.string().min(3, 'Color is required.'),
    size : z.string().min(1,'Size is required.'),
    sku : z.string().min(3, 'SKU is required.'),
    code : z.string().min(3, 'Code is required.'),
    amount : z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    minShoppingAmount : z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    validity : z.coerce.date(),
    userId : z.string().min(3, 'User Id is required.'),
    rating:  z.union([
        z.number().positive('Expected positive value, received negative'),
        z.string().transform((val)=> Number(val)).refine((val)=> !isNaN(val) && val >= 0, 'Please enter a valid number.')
    ]),
    review: z.string().min('3', 'Review is required.'),
    code: z.string().min(3, 'Coupon code is required.'),
    phone:z.string().min(10, 'Phone number must be at least 10 digits'),
    country:z.string().min(3, 'Country is required'),
    state:z.string().min(3, 'State is required'),
    city:z.string().min(3, 'City is required'),
    pincode:z.string().min(3, 'Pincode is required'),
    landmark:z.string().min(3, 'Landmark is required'),
    ordernote:z.string().optional(),
    address:z.string().min(3, 'Address is required'),
});