import { CartURLParams } from "@/app/cart/page";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import URLParamHandler from "@/lib/URLParamHandler";
import { GetAddressesForCart } from "@/server/entities/queries/Address.query";
import { CartURLSchema } from "@/server/types";
import { GetAddressesForCartSchema } from "@/server/types/Address.type";
import classNames from "classnames";
import Link from "next/link";
import React, { FC } from "react";

interface ImportAddressProps extends BaseProps {}
interface AddressProps extends BaseProps {
  address: GetAddressesForCartSchema;
}

const Address: FC<AddressProps> = async (props) => {
  const urlParams = (await props.searchParams) as CartURLSchema;

  const GetSearchParams = () => {
    const searchParams = new URLSearchParams(urlParams);
    searchParams.set(CartURLParams.ADDRESS, props.address.Id);
    return "?" + searchParams.toString();
  };

  return (
    <Link href={`/cart` + GetSearchParams()} className="block">
      <div className="border-2 rounded-md px-5 py-3">
        <div className="flex flex-col text-gray-600 [&>span]:flex [&>span]:gap-1">
          <span className="font-semibold text-lg text-black">
            <span>{props.address.FirstName}</span>
            <span>{props.address.LastName}</span>
          </span>
          <span>
            <span>{props.address.Address}</span>
            <span>,</span>
          </span>
          {props.address.Landmark && (
            <span>
              <span>{props.address.Landmark}</span>
              <span>,</span>
            </span>
          )}
          <span>
            <span>{props.address.City}</span>
            <span>{props.address.State}</span>
            <span>-</span>
            <span>{props.address.PinCode}</span>
          </span>
          <span>{props.address.Email}</span>
          <span>{props.address.PhoneNumber}</span>
        </div>
      </div>
    </Link>
  );
};

export const ImportAddress: FC<ImportAddressProps> = async (props) => {
  const getAddressResult = await GetAddressesForCart();
  const addresses =
    getAddressResult.success && Array.isArray(getAddressResult.data)
      ? getAddressResult.data
      : [];

  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer w-full text-white py-2 hover:bg-black/80 text-sm bg-black rounded-md font-semibold">
        Import Existing Address
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Import an Address</DialogTitle>
        </DialogHeader>
        <div className="h-96 overflow-y-scroll space-y-3">
          {addresses.map((address, idx) => (
            <Address address={address} key={idx} {...props} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
