"use client";

import BaseProps from "@/lib/Props/BaseProps";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FC, useEffect, useState } from "react";

interface RedirectProps extends BaseProps {
  isProcessing: boolean;
  link: string;
  seconds: number;
}

const Redirect: FC<RedirectProps> = (props) => {
  const router = useRouter();
  const [seconds, setSeconds] = useState<number>(props.seconds);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (!props.isProcessing && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [props.isProcessing, seconds]);

  useEffect(() => {
    if (seconds <= 0) router.push("/");
  }, [seconds]);

  return (
    <span className="text-gray-500">
      Redirecting in {seconds} seconds...{" "}
      <Link href={props.link} className="underline">
        Click here
      </Link>{" "}
      if you are not automatically redirected
    </span>
  );
};

export default Redirect;
