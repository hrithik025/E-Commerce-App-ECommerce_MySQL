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
import { DeleteUser } from "@/server/entities/actions";
import { useRouter } from "next/navigation";
import React, { FC, useState } from "react";

interface DeleteAccountDialogProps extends BaseProps {}

export const DeleteAccountDialog: FC<DeleteAccountDialogProps> = (props) => {
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const router = useRouter();

  const deleteUser = () => {
    setIsSubmitted(true);
    DeleteUser().then((result) => {
      console.log(result);
      setIsSubmitted(false);
      if (result.success) {
        router.push("/logout");
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="hover:cursor-pointer w-full py-2 rounded-md font-semibold bg-default hover:bg-default-bright text-[14px] text-white">
        Delete Account
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={isSubmitted}
            onClick={(e) => deleteUser()}
            className="font-semibold bg-destructive hover:cursor-pointer"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
