import { PromiseItem } from "@/components/custom/Home/PromiseSection/PromiseItem";
import React from "react";
import {
  PiTruckLight,
  PiPackageLight,
  PiWalletLight,
  PiPhoneCallLight,
  PiContactlessPaymentLight,
} from "react-icons/pi";

export const PromiseSection = () => {
  return (
    <div className="grid grid-cols-5 place-items-center justify-between shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.25)] rounded-sm px-5 py-4">
      <PromiseItem text="Free Delivery" subtext="From $50.59">
        <PiTruckLight size={60} />
      </PromiseItem>
      <PromiseItem text="Free Return" subtext="365 Days">
        <PiPackageLight size={60} />
      </PromiseItem>
      <PromiseItem text="Big Saving" subtext="From $50.25">
        <PiWalletLight size={60} />
      </PromiseItem>
      <PromiseItem text="Support 24/7" subtext="Online 24 Hours">
        <PiPhoneCallLight size={60} />
      </PromiseItem>
      <PromiseItem text="Payment Method" subtext="Secure payment">
        <PiContactlessPaymentLight size={60} />
      </PromiseItem>
    </div>
  );
};
