import { isAuthenticated } from "@/lib/authentication";
import { connectDB } from "@/lib/databaseConnection";
import { catchError, response } from "@/lib/helperFunction";
import OrderModel from "@/models/order.model";

export async function GET(request) {
    try {
        const auth = await isAuthenticated('admin');

        if(!auth.isAuth){
            return response(false, 403, 'Unauthorized');
        }

        await connectDB();

        const filter = {
            deletedAt: null,
        }
        
        const getOrders = await OrderModel.find(filter)
            .sort({createdAt: -1})
            .lean();

        if(!getOrders || getOrders.length === 0){
            return response(false, 404, 'Collection empty.');
        }

        // Flatten the data for CSV export
        const flattenedOrders = [];
        
        getOrders.forEach(order => {
            order.products.forEach(product => {
                flattenedOrders.push({
                    orderId: order._id,
                    orderNumber: order.order_id,
                    paymentId: order.payment_id,
                    orderDate: order.createdAt,
                    status: order.status,
                    
                    // Customer details
                    customerName: order.name,
                    email: order.email,
                    phone: order.phone,
                    
                    // Address
                    country: order.country,
                    state: order.state,
                    city: order.city,
                    pincode: order.pincode,
                    landmark: order.landmark,
                    
                    // Product details
                    productName: product.name,
                    productId: product.productId,
                    variantId: product.variantId,
                    quantity: product.qty,
                    mrp: product.mrp,
                    sellingPrice: product.sellingPrice,
                    itemTotal: product.sellingPrice * product.qty,
                    
                    // Order totals
                    subtotal: order.subtotal,
                    discount: order.discount,
                    couponDiscount: order.couponDiscountAmount,
                    totalAmount: order.totalAmount,
                    
                    orderNote: order.ordernote || ''
                });
            });
        });
        
        return response(true, 200, 'Data Found', flattenedOrders);

    } catch(error) {
        return catchError(error);
    }
}