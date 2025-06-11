import { AddressForm } from "@/components/custom/Cart/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

interface CreateAddressDialogProps extends BaseProps {}

export const CreateAddressDialog: FC<CreateAddressDialogProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger
        className={classNames(
          "hover:cursor-pointer w-full text-white rounded-md font-semibold bg-default hover:bg-default-bright",
          props.className
        )}
      >
        Create a New Address
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create Address</DialogTitle>
        </DialogHeader>
        <AddressForm />
      </DialogContent>
    </Dialog>
  );
};
