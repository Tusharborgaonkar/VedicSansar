import { orderNotification } from "@/email/orderNotification";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import { sendMail } from "@/lib/sendMail";
import { zSchema } from "@/lib/zodSchema";
import OrderModel from "@/models/order.model";
import Razorpay from "razorpay"
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import z from "zod";
export async function POST(request){
    try {
        await connectDB();
        const payload = await request.json();

        const productSchema = z.object({
            productId: z.string().length(24, 'Invalid product id format'),
            variantId: z.string().length(24, 'Invalid variant id format'),
            name: z.string().min(1),
            qty: z.number().min(1),
            mrp: z.number().nonnegative(),
            sellingPrice: z.number().nonnegative()
        });

        const orderSchema = zSchema.pick({
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
            paymentMethod: z.enum(['online', 'cod']),
            userId: z.string().optional(),
            razorpay_payment_id: z.string().optional(),
            razorpay_order_id: z.string().optional(),
            razorpay_signature: z.string().optional(),
            subtotal: z.number().nonnegative(),
            discount: z.number().nonnegative(),
            couponDiscountAmount: z.number().nonnegative(),
            totalAmount: z.number().nonnegative(),
            products: z.array(productSchema)
            
        })

        const validate = orderSchema.safeParse(payload);

        if(!validate.success){
            return response(false, 400, 'Invalid or missing fields.', {error : validate.error});

        }

        const validatedData = validate.data

        // payment verification
        let paymentVerification = false;
        let finalOrderId = validatedData.razorpay_order_id;
        let finalPaymentId = validatedData.razorpay_payment_id;

        if (validatedData.paymentMethod === 'online') {
            if (!validatedData.razorpay_payment_id || !validatedData.razorpay_order_id || !validatedData.razorpay_signature) {
                return response(false, 400, 'Razorpay details are required for online payment.');
            }
            const verification = validatePaymentVerification({
                order_id: validatedData.razorpay_order_id,
                payment_id: validatedData.razorpay_payment_id
            }, validatedData.razorpay_signature, process.env.RAZORPAY_KEY_SECRET)

            if(verification){
                paymentVerification = true;
            } else {
                return response(false, 400, 'Payment signature verification failed.');
            }
        } else {
            // COD
            paymentVerification = true;
            finalOrderId = `COD-${Date.now()}`;
            finalPaymentId = `N/A`;
        }

        const newOrder = await OrderModel.create({
            user : validatedData.userId,
            name : validatedData.name,
            email : validatedData.email,
            phone : validatedData.phone,
            country : validatedData.country,
            state : validatedData.state,
            city : validatedData.city,
            pincode : validatedData.pincode,
            landmark : validatedData.landmark,
            ordernote : validatedData.ordernote,
            products : validatedData.products,
            subtotal : validatedData.subtotal,
            discount : validatedData.discount,
            couponDiscountAmount : validatedData.couponDiscountAmount,
            totalAmount : validatedData.totalAmount,
            paymentMethod : validatedData.paymentMethod,
            payment_id : finalPaymentId,
            order_id : finalOrderId,
            status : paymentVerification ? 'pending' : 'unverified',
        });

        try {
            const mailData = {
                order_id : finalOrderId,
                orderDetailsUrl : `${process.env.NEXT_PUBLIC_BASE_URL}/order-details/${finalOrderId}`
            }

            await sendMail('Congratulations!Your Order has been placed successfully.', validatedData.email, orderNotification(mailData));
        } catch (error) {
            // return catchError(error)
        }

        return response(true, 200 , 'Order placed Successfully!', { order_id: finalOrderId });
    } catch (error) {
        return catchError(error);
    }
}