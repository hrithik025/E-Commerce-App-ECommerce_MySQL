import { CreateAddressDialog } from "@/components/custom/Account/YourAddresses/CreateAddressDialog";
import { DeleteAddressDialog } from "@/components/custom/Account/YourAddresses/DeleteAddressDialog";
import { EditAddressDialog } from "@/components/custom/Account/YourAddresses/EditAddressDialog";
import BaseProps from "@/lib/Props/BaseProps";
import { GetAddressesForUser } from "@/server/entities/queries/Address.query";
import { GetAddressesForUserSchema } from "@/server/types/Address.type";
import React, { FC } from "react";

interface AddressProps extends BaseProps {
  address: GetAddressesForUserSchema;
}

const Address: FC<AddressProps> = (props) => {
  return (
    <div className="border-2 rounded-md px-5 py-3 ">
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
      <div className="mt-3 gap-2 grid grid-cols-5">
        <EditAddressDialog address={props.address} />
        <DeleteAddressDialog address={props.address} />
      </div>
    </div>
  );
};

export const YourAddresses = async () => {
  let addresses: GetAddressesForUserSchema[] = [];
  const addressResult = await GetAddressesForUser();
  if (addressResult.success && addressResult.data !== null) {
    addresses = addressResult.data;
  }

  return (
    <div className="grid grid-cols-2 gap-5">
      <div className="col-span-full w-1/5">
        <CreateAddressDialog className="py-2" />
      </div>
      {addresses.map((address, idx) => (
        <Address address={address} key={idx} />
      ))}
      {addresses.length === 0 && (
        <div className="flex items-center justify-center col-span-full">
          <span className="text-gray-500">No Addresses Found</span>
        </div>
      )}
    </div>
  );
};
