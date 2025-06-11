import { AddressForm } from "@/components/custom/Cart/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetAddressesForUserSchema } from "@/server/types/Address.type";
import classNames from "classnames";
import React, { FC } from "react";

interface EditAddressDialogProps extends BaseProps {
  address: GetAddressesForUserSchema;
}

export const EditAddressDialog: FC<EditAddressDialogProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={classNames(
          "hover:cursor-pointer w-full text-white rounded-md font-semibold bg-black",
          props.className
        )}
      >
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Address</DialogTitle>
        </DialogHeader>
        <AddressForm isEdit={true} address={props.address} />
      </DialogContent>
    </Dialog>
  );
};
