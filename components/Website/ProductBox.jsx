import Image from "next/image";
import React from "react";
import imgPlaceholder from "@/public/assets/images/img-placeholder.webp";
import Link from "next/link";
import {  WEBSITE_PRODUCT_DETAILS } from "@/routes/WebsiteRoute";

const ProductBox = ({ product }) => {
  return (
    <div className="rounded-lg  hover:shadow-lg border overflow-hidden ">
      <Link href={WEBSITE_PRODUCT_DETAILS(product.slug)}>
        <Image
          src={product?.media[0]?.secure_url || imgPlaceholder.src}
          width={400}
          height={400}
          alt={product?.media[0]?.alt || product?.name}
          title={product?.media[0]?.title || product?.name}
          className="w-full lg:h-[250px] lg:w-full md:h-[200px] h-150px object-cover object-top transition-all hover:scale-110"
        />

        <div className="p-3  border-t">
          <h4 className="text-amber-800 font-semibold mt-2">{product?.name}</h4>

          <p className="flex gap-2 text-sm mt-3 flex-wrap items-center">
            <span className=" font-semibold text-red-600">
              {product?.sellingPrice.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <span className="line-through text-sm font-semibold text-gray-700">
              {product?.mrp.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR",
              })}
            </span>
            <br />
            <span
              className="text-sm font-semibold text-white bg-amber-800"
              style={{
                borderRadius: "30px",
                border: "1px solid brown",
                padding: "5px 7px",
              }}
            >
              {product?.discountPercentage}% off
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductBox;
