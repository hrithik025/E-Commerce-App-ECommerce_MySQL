import { TrackOrderForm } from "@/components/custom/TrackOrder";
import React from "react";

const TrackOrder = () => {
  return (
    <div className="px-20 py-5 flex flex-col space-y-4">
      <span>
        Please enter your Order ID in the field below and click the "Track
        Order" button to view the current status of your order. You can locate
        your Order Number & Email on your accounts page. If you have any
        questions or need assistance, our friendly support team is always here
        to help you.
      </span>
      <TrackOrderForm />
    </div>
  );
};

export default TrackOrder;
