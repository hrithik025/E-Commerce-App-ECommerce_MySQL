import { LoginForm } from "@/components/custom/Login";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center">
      <div className="w-1/3 my-10 border-3 px-5 py-5 rounded-xl flex flex-col space-y-3">
        <span className="font-semibold text-2xl">Login</span>
        <LoginForm />
        <div className="flex gap-1">
          <span>Don't have an Account?</span>
          <Link href={"/signup"} className="text-blue-600 underline">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
