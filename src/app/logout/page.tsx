import Redirect from "@/components/custom/Checkout/Redirect";
import React from "react";

const Logout = async () => {
  return (
    <div className="flex justify-center items-center gap-10 flex-col h-svh">
      <span className="text-4xl">Logging Out....</span>
      <Redirect isProcessing={false} link="/login" seconds={10} />
    </div>
  );
};

export default Logout;
