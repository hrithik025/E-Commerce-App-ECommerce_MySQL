import { ChangePasswordForm } from "@/components/custom/Account/AccountDetails/ChangePasswordForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Seperator,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import React, { FC } from "react";

interface ChangePasswordDialogProps extends BaseProps {}

export const ChangePasswordDialog: FC<ChangePasswordDialogProps> = (props) => {
  return (
    <Dialog>
      <DialogTrigger className="hover:cursor-pointer w-full py-2 rounded-md font-semibold bg-black hover:bg-black/70 text-[14px] text-white">
        Change Password
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
        </DialogHeader>
        <ChangePasswordForm />
      </DialogContent>
    </Dialog>
  );
};
