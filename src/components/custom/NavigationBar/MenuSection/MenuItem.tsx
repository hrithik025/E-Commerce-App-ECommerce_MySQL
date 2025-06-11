import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface MenuItemProps extends BaseProps {
  link: string;
  children: ReactNode;
}

export const MenuItem: FC<MenuItemProps> = (props) => {
  return (
    <Link
      href={props.link}
      className={classNames(
        "hover:text-default hover:font-semibold px-3",
        props.className
      )}
    >
      {props.children}
    </Link>
  );
};
