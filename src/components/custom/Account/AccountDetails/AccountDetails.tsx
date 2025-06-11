import { AccountBasicDetails } from "@/components/custom/Account/AccountDetails/AccountBasicDetails";
import { AccountProfile } from "@/components/custom/Account/AccountDetails/AccountProfile";
import { DeleteAccountDialog } from "@/components/custom/Account/AccountDetails/DeleteAccountDialog";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

interface AccountDetailProps extends BaseProps {
  avatarUrl: string;
  name: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordUpdatedDate: string;
}

export const AccountDetails: FC<AccountDetailProps> = (props) => {
  return (
    <div
      className={classNames(
        "flex flex-col gap-5 [&>*]:border-b-2 [&>*]:last:border-0 [&>*]:pb-3",
        props.className
      )}
    >
      <AccountProfile className="" {...props} />
      <AccountBasicDetails className="" {...props} />
      <div className="w-1/4">
        <DeleteAccountDialog />
      </div>
    </div>
  );
};
