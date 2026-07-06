import { connectDB } from "@/lib/databaseConnection";
import CategoryModel from "@/models/Category.model";
import ProductModel from "@/models/Product.model";
import ProductVariantModel from "@/models/ProductVariant.model";
import MediaModel from "@/models/Media.model";
import UserModel from "@/models/User.model";
import CouponModel from "@/models/Coupon.model";
import ReviewModel from "@/models/Review.model";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const clear = searchParams.get("clear") === "true";

    if (clear) {
      await CategoryModel.deleteMany({});
      await ProductModel.deleteMany({});
      await ProductVariantModel.deleteMany({});
      await MediaModel.deleteMany({});
      await UserModel.deleteMany({});
      await CouponModel.deleteMany({});
      await ReviewModel.deleteMany({});
    }

    // Check if seeding is already done (by checking products)
    const existingProducts = await ProductModel.countDocuments();
    if (existingProducts > 0 && !clear) {
      return NextResponse.json({
        success: true,
        message: "Database already seeded! Pass ?clear=true in the URL to clear and re-seed.",
      });
    }

    // 1. Seed Users (pre-hash via pre-save hook in User model)
    const adminUser = new UserModel({
      role: "admin",
      name: "Vedic Sansar Admin",
      email: "admin@vedicsansar.com",
      password: "admin123", // Will be hashed automatically by userSchema.pre('save')
      isEmailVerified: true,
      phone: "9876543210",
      address: "India",
    });
    await adminUser.save();

    const normalUser = new UserModel({
      role: "user",
      name: "Demo User",
      email: "user@vedicsansar.com",
      password: "user123", // Will be hashed automatically
      isEmailVerified: true,
      phone: "8765432109",
      address: "India",
    });
    await normalUser.save();

    // 2. Seed Media (using standard, public demo assets from Cloudinary)
    const mediaItems = [
      {
        asset_id: "demo_asset_1",
        public_id: "demo/sample1",
        path: "demo/sample1.jpg",
        thumbnail_url: "https://res.cloudinary.com/demo/image/upload/t_media_lib_thumb/v1570979139/sample.jpg",
        secure_url: "https://res.cloudinary.com/demo/image/upload/v1570979139/sample.jpg",
        alt: "Ayurveda Herbs",
        title: "Ayurveda Herbs",
      },
      {
        asset_id: "demo_asset_2",
        public_id: "demo/sample2",
        path: "demo/sample2.jpg",
        thumbnail_url: "https://res.cloudinary.com/demo/image/upload/t_media_lib_thumb/v1570979139/food.jpg",
        secure_url: "https://res.cloudinary.com/demo/image/upload/v1570979139/food.jpg",
        alt: "Pure Cow Ghee",
        title: "Pure Cow Ghee",
      },
      {
        asset_id: "demo_asset_3",
        public_id: "demo/sample3",
        path: "demo/sample3.jpg",
        thumbnail_url: "https://res.cloudinary.com/demo/image/upload/t_media_lib_thumb/v1570979139/dog.jpg",
        secure_url: "https://res.cloudinary.com/demo/image/upload/v1570979139/dog.jpg",
        alt: "Incense Cones",
        title: "Incense Cones",
      },
    ];
    const createdMedia = await MediaModel.insertMany(mediaItems);

    // 3. Seed Categories
    const categories = [
      { name: "Ayurvedic Herbs", slug: "ayurvedic-herbs" },
      { name: "Pooja Essentials", slug: "pooja-essentials" },
      { name: "Organic Oils", slug: "organic-oils" },
      { name: "Spiritual Books", slug: "spiritual-books" },
    ];
    const createdCategories = await CategoryModel.insertMany(categories);

    // Map categories for easier lookup
    const catMap = {};
    createdCategories.forEach((cat) => {
      catMap[cat.slug] = cat._id;
    });

    // 4. Seed Products
    const products = [
      {
        name: "Premium Ashwagandha Powder",
        slug: "premium-ashwagandha-powder",
        category: catMap["ayurvedic-herbs"],
        mrp: 499,
        sellingPrice: 399,
        discountPercentage: 20,
        media: [createdMedia[0]._id],
        description: "High-quality, organic Ashwagandha root powder to boost energy, reduce stress, and improve focus. 100% natural and pure.",
      },
      {
        name: "Sandalwood Dhoop Sticks",
        slug: "sandalwood-dhoop-sticks",
        category: catMap["pooja-essentials"],
        mrp: 250,
        sellingPrice: 199,
        discountPercentage: 20,
        media: [createdMedia[2]._id],
        description: "Aromatherapy Sandalwood dhoop sticks made with natural herbs, perfect for daily pooja, meditation, and relaxation.",
      },
      {
        name: "Cold Pressed Sesame Oil",
        slug: "cold-pressed-sesame-oil",
        category: catMap["organic-oils"],
        mrp: 350,
        sellingPrice: 280,
        discountPercentage: 20,
        media: [createdMedia[1]._id],
        description: "Nutritious and pure cold-pressed sesame oil extracted from premium sesame seeds, ideal for cooking and body massage.",
      },
    ];
    const createdProducts = await ProductModel.insertMany(products);

    // 5. Seed Product Variants
    const variants = [
      {
        product: createdProducts[0]._id,
        color: "Natural",
        size: "100g",
        mrp: 499,
        sellingPrice: 399,
        discountPercentage: 20,
        sku: "ASH-100G",
        media: [createdMedia[0]._id],
      },
      {
        product: createdProducts[0]._id,
        color: "Natural",
        size: "250g",
        mrp: 999,
        sellingPrice: 799,
        discountPercentage: 20,
        sku: "ASH-250G",
        media: [createdMedia[0]._id],
      },
      {
        product: createdProducts[1]._id,
        color: "Brown",
        size: "50 Sticks",
        mrp: 250,
        sellingPrice: 199,
        discountPercentage: 20,
        sku: "DHP-50S",
        media: [createdMedia[2]._id],
      },
      {
        product: createdProducts[2]._id,
        color: "Golden",
        size: "500ml",
        mrp: 350,
        sellingPrice: 280,
        discountPercentage: 20,
        sku: "SES-500ML",
        media: [createdMedia[1]._id],
      },
    ];
    await ProductVariantModel.insertMany(variants);

    // 6. Seed Reviews
    const reviews = [
      {
        product: createdProducts[0]._id,
        user: normalUser._id,
        rating: 5,
        title: "Excellent Quality!",
        review: "This Ashwagandha powder is extremely fresh and potent. Highly recommended for daily wellness.",
      },
      {
        product: createdProducts[1]._id,
        user: normalUser._id,
        rating: 4,
        title: "Lovely fragrance",
        review: "The sandalwood scent is very calming and lasts a long time. Great purchase.",
      },
    ];
    await ReviewModel.insertMany(reviews);

    // 7. Seed Coupons
    const coupons = [
      {
        code: "WELCOME10",
        discountPercentage: 10,
        minShoppingAmount: 499,
        validity: new Date("2030-12-31"),
      },
      {
        code: "VEDIC20",
        discountPercentage: 20,
        minShoppingAmount: 999,
        validity: new Date("2030-12-31"),
      },
    ];
    await CouponModel.insertMany(coupons);

    return NextResponse.json({
      success: true,
      message: "Seeding complete!",
      data: {
        users: {
          admin: "admin@vedicsansar.com (password: admin123)",
          user: "user@vedicsansar.com (password: user123)"
        },
        counts: {
          users: 2,
          media: createdMedia.length,
          categories: createdCategories.length,
          products: createdProducts.length,
          variants: variants.length,
          reviews: reviews.length,
          coupons: coupons.length,
        }
      },
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error.message,
    });
  }
}
