import { SignupForm } from "@/components/custom/Signup";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/3 my-10 border-3 px-5 py-5 rounded-xl flex flex-col space-y-3">
        <span className="font-semibold text-2xl">Signup</span>
        <SignupForm />
        <div className="flex gap-1">
          <span>Already having an Account?</span>
          <Link href={"/login"} className="text-blue-600 underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
