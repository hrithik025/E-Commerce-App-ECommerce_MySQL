import { MenuItem } from "@/components/custom/NavigationBar/MenuSection/MenuItem";
import React from "react";

export const MenuSection = () => {
  return (
    <div className="flex gap-2">
      <MenuItem link={"/"}>Home</MenuItem>
      <MenuItem link={"/shop"}>Shop</MenuItem>
      <MenuItem link={"/trackOrder"}>Track Order</MenuItem>
      <MenuItem link={"/"}>About Us</MenuItem>
      <MenuItem link={"/"}>Contact Us</MenuItem>
    </div>
  );
};
