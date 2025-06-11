"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { DeleteAddress } from "@/server/entities/actions/Address.action";
import { GetAddressesForUserSchema } from "@/server/types/Address.type";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface DeleteAddressDialogProps extends BaseProps {
  address: GetAddressesForUserSchema;
}

export const DeleteAddressDialog: FC<DeleteAddressDialogProps> = (props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const deleteAddress = () => {
    setIsSubmitted(true);
    DeleteAddress(props.address.Id).then((result) => {
      setIsSubmitted(false);
      router.refresh();
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:cursor-pointer w-full py-2 rounded-md font-semibold bg-destructive text-[14px] text-white">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            Address and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="font-semibold bg-destructive hover:bg-destructive-foreground hover:cursor-pointer"
            disabled={isSubmitted}
            onClick={() => deleteAddress()}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
