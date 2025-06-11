import Link from "next/link";
import React from "react";

export const FooterBar = () => {
  return (
    <div className="px-20 bg-gray-200 [&_*_a]:hover:underline">
      <div className="pt-10">
        <div className="grid grid-cols-4 gap-x-10 text-lg text-gray-700">
          <span className="text-3xl text-black font-semibold">Eventbrite</span>
          <span>Shop</span>
          <span>Support</span>
          <span>My Account</span>
        </div>
        <div className="grid grid-cols-4 py-3 text-sm gap-x-10 text-gray-700 [&>div]:flex [&>div]:flex-col [&>div]:gap-2">
          <span className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Consequuntur provident dolor iusto corporis autem rem ratione eaque
            pariatur deleniti, necessitatibus voluptate labore voluptatum veniam
            assumenda fugiat earum ea obcaecati impedit.
          </span>
          <div>
            <Link href={"/"}>Terms & Conditions</Link>
            <Link href={"/"}>Site Map</Link>
          </div>
          <div>
            <Link href={"/"}>About Us</Link>
            <Link href={"/"}>Contact Us</Link>
            <Link href={"/"}>Refund & Returns Policy</Link>
          </div>
          <div>
            <Link href={"/account/accountDetails"}>My Account</Link>
            <Link href={"/account/orders"}>My Orders</Link>
            <Link href={"/account/accountDetails"}>Change Password</Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center p-3 text-sm">
        {/* <span>
          Copyrights © 2025 by{" "}
          <Link
            href={"https://ajayyogesh1.github.io/portfolio/"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ajay Jayapal
          </Link>
        </span> */}
      </div>
    </div>
  );
};
