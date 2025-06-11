import { WishlistTable } from "@/components/custom/Wishlist";
import image1 from "@public/static/Products/1.0.1.jpg";
import React from "react";

const products = [
  {
    image: image1,
    url: "/product/1",
    name: "Product 1",
    originalPrice: 100,
    latestPrice: 80,
    isOutOfStock: false,
  },
  {
    image: image1,
    url: "/product/2",
    name: "Product 2",
    originalPrice: 150,
    latestPrice: 120,
    isOutOfStock: true,
  },
  {
    image: image1,
    url: "/product/3",
    name: "Product 3",
    originalPrice: 200,
    latestPrice: 180,
    isOutOfStock: false,
  },
  {
    image: image1,
    url: "/product/4",
    name: "Product 4",
    originalPrice: 250,
    latestPrice: 220,
    isOutOfStock: true,
  },
  {
    image: image1,
    url: "/product/5",
    name: "Product 5",
    originalPrice: 300,
    latestPrice: 280,
    isOutOfStock: false,
  },
];

const Wishlist = () => {
  return (
    <div className="px-20 py-5">
      <WishlistTable products={products} />
    </div>
  );
};

export default Wishlist;
