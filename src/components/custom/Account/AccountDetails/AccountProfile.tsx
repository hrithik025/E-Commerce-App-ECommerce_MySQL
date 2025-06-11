import { Avatar, AvatarFallback, AvatarImage, Button } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";
import React, { FC } from "react";

interface AccountProfileProps extends BaseProps {
  avatarUrl: string;
  name: string;
  createdAt: string;
}

export const AccountProfile: FC<AccountProfileProps> = (props) => {
  return (
    <div className={classNames("grid grid-cols-12", props.className)}>
      <Avatar className="size-15 col-span-1 justify-self-center">
        <AvatarImage src={props.avatarUrl} alt="profile-image" />
        <AvatarFallback className="bg-default text-white text-2xl font-semibold">
          {props.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1 justify-center col-span-9 text-sm ">
        <span>{props.name}</span>
        <span>Created at {props.createdAt}</span>
      </div>
      <div className="col-span-2 grid place-items-center">
        <Button className="hover:cursor-pointer font-semibold hidden">
          Change Picture
        </Button>
      </div>
    </div>
  );
};
