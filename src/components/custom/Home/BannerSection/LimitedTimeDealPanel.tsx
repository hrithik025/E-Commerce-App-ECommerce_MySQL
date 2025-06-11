import Image, { StaticImageData } from "next/image";
import React, { FC, ReactNode } from "react";
import LimitedMobile from "@public/static/LimitedMobile.webp";
import LimitedFragrance from "@public/static/LimitedFragrance.webp";
import Link from "next/link";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";

interface LimitedTimeDealItemProps extends BaseProps {
  link: string;
  children: ReactNode;
  src: StaticImageData;
  alt: string;
}

const LimitedTimeDealItem: FC<LimitedTimeDealItemProps> = (props) => {
  return (
    <Link href={props.link} className={classNames("", props.className)}>
      <div className="shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.25)] rounded-sm h-64 relative group text-md">
        <div className="absolute top-0 z-10 w-full h-full flex flex-col items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition duration-300">
          {props.children}
        </div>
        <Image
          src={props.src}
          alt={props.alt}
          className="w-full h-full object-cover object-bottom group-hover:blur-lg transition duration-300"
        />
      </div>
    </Link>
  );
};

export const LimitedTimeDealPanel = () => {
  return (
    <div className="grid grid-rows-2 gap-5">
      <LimitedTimeDealItem link={"/"} src={LimitedMobile} alt="Limited Mobile">
        <span className="text-default uppercase font-semibold text-lg">
          Mobile Phones
        </span>
        <span className="font-semibold text-center">
          Trade in and Save,
          <br />
          Limited Edition
        </span>
        <span className="px-5 py-2 border-2 rounded-lg font-semibold bg-black/50 border-black/50 hover:bg-default text-white hover:border-default uppercase">
          Shop Now
        </span>
      </LimitedTimeDealItem>
      <LimitedTimeDealItem
        link={"/"}
        src={LimitedFragrance}
        alt="Limited Fragrance"
      >
        <span className="text-default uppercase font-semibold text-lg">
          Fragrances
        </span>
        <span className="font-semibold text-center">
          Quality & Modern
          <br />
          Ceramic Pots
        </span>
        <span className="px-5 py-2 border-2 rounded-lg font-semibold bg-black/50 border-black/50 hover:bg-default text-white hover:border-default uppercase">
          Shop Now
        </span>
      </LimitedTimeDealItem>
    </div>
  );
};
