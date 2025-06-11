import { AddressForm } from "@/components/custom/Cart/AddressForm";
import { ImportAddress } from "@/components/custom/Cart/ImportAddress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Seperator,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetAddressById } from "@/server/entities/queries/Address.query";
import { CartURLSchema } from "@/server/types";
import React, { FC } from "react";

interface AddressDialogProps extends BaseProps {}

export const AddressDialog: FC<AddressDialogProps> = async (props) => {
  const searchParams = (await props.searchParams) as CartURLSchema;

  const GetAddress = async () => {
    if (searchParams.address !== null && searchParams.address !== undefined) {
      const addressResult = await GetAddressById(searchParams.address);
      if (addressResult.success) {
        return addressResult.data;
      }
      return null;
    }
    return null;
  };

  const address = await GetAddress();

  return (
    <div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold ">Pin Code</span>
        <Input
          type="text"
          name="PinCode"
          inputMode="numeric"
          placeholder="Please select an Address"
          value={address ? address.PinCode : ""}
          readOnly
          required
        />
      </div>
      <Dialog>
        <DialogTrigger className="hover:cursor-pointer w-full text-white py-2.5 my-2 rounded-md font-semibold bg-default hover:bg-default-bright">
          Select an Address
        </DialogTrigger>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Select an Address</DialogTitle>
          </DialogHeader>
          <ImportAddress {...props} />
          <Seperator>
            <span className="mx-4">Or</span>
          </Seperator>
          <AddressForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
