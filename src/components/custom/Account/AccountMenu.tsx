"use client";

import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { FC } from "react";

interface AccountMenuProps extends BaseProps {}

interface AccountMenuItemProps extends BaseProps {
  href: string;
  isActive: boolean;
  children: React.ReactNode;
}

const AccountMenuItem: FC<AccountMenuItemProps> = (props) => {
  return (
    <Link
      href={props.href}
      className={classNames(
        "py-2 px-3 rounded-md ",
        {
          "bg-default text-white": props.isActive,
          "hover:bg-gray-200 hover:font-semibold": !props.isActive,
        },
        props.className
      )}
    >
      {props.children}
    </Link>
  );
};

export const AccountMenu: FC<AccountMenuProps> = (props) => {
  const pathName = usePathname();
  const currentLink = pathName.split("/").slice(-1).pop();

  const menuItems = [
    {
      name: "Account Details",
      href: "/account/accountDetails",
      key: "accountDetails",
    },
    {
      name: "Your Orders",
      href: "/account/orders",
      key: "orders",
    },
    {
      name: "Addresses",
      href: "/account/addresses",
      key: "addresses",
    },
    {
      name: "Wishlist",
      href: "/wishlist",
      key: "wishlist",
    },
    {
      name: "Log Out",
      href: "/logout",
      key: "logout",
    },
  ];

  return (
    <div
      className={classNames(
        "flex flex-col px-2 sticky top-5 gap-y-3",
        props.className
      )}
    >
      {menuItems.map((menuItem, idx) => (
        <AccountMenuItem
          key={idx}
          href={menuItem.href}
          isActive={menuItem.key == currentLink}
        >
          <span className="">{menuItem.name}</span>
        </AccountMenuItem>
      ))}
    </div>
  );
};
