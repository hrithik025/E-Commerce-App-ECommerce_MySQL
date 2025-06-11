import { ChangePasswordDialog } from "@/components/custom/Account/AccountDetails/ChangePasswordDialog";
import { Button, Input } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import React, { FC } from "react";

interface AccountBasicDetailsProps extends BaseProps {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  passwordUpdatedDate: string;
}

export const AccountBasicDetails: FC<AccountBasicDetailsProps> = (props) => {
  return (
    <div className="grid grid-cols-4 gap-5 items-center">
      <span className="font-semibold justify-self-end">First Name: </span>
      <Input
        className="col-span-3 border-2 border-gray-300 bg-gray-200 font-semibold text-gray-600"
        type="text"
        value={props.firstName}
        disabled
      />
      <span className="font-semibold justify-self-end">Last Name: </span>
      <Input
        className="col-span-3 border-2 border-gray-300 bg-gray-200 font-semibold text-gray-600"
        type="text"
        value={props.lastName}
        disabled
      />
      <span className="font-semibold justify-self-end">Email: </span>
      <Input
        className="col-span-3 border-2 border-gray-300 bg-gray-200 font-semibold text-gray-600"
        type="email"
        value={props.email}
        disabled
      />
      <span className="font-semibold justify-self-end">Password: </span>
      <Input
        className="col-span-2 border-2 border-gray-300 bg-gray-200 font-semibold text-gray-600"
        type="password"
        value={"123456789012345678901234567890"}
        disabled
      />
      <div>
        <ChangePasswordDialog />
      </div>
      <span className="font-semibold justify-self-end">Phone Number: </span>
      <Input
        className="col-span-3 border-2 border-gray-300 bg-gray-200 font-semibold text-gray-600"
        type="text"
        value={"+91 " + props.phoneNumber}
        disabled
      />
    </div>
  );
};
