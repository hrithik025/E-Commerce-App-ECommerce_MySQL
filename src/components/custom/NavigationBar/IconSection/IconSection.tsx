import { IconWithBadge } from "@/components/custom/NavigationBar/IconSection";
import { BsCart3, BsHeart, BsPerson } from "react-icons/bs";
import React from "react";

export const IconSection = () => {
  return (
    <div className="flex gap-6">
      <IconWithBadge link={"/wishlist"}>
        <BsHeart size={25} />
      </IconWithBadge>
      <IconWithBadge link={"/cart"}>
        <BsCart3 size={25} />
      </IconWithBadge>
      <IconWithBadge link={"/account/accountDetails"}>
        <BsPerson size={25} />
      </IconWithBadge>
    </div>
  );
};
