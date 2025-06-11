import { AccountMenu } from "@/components/custom/Account";
import { BannerBar } from "@/components/custom/BannerBar/BannerBar";
import BaseProps from "@/lib/Props/BaseProps";
import React, { FC } from "react";

interface AccountLayoutProps extends BaseProps {
  children: React.ReactNode;
}

const AccountLayout: FC<AccountLayoutProps> = (props) => {
  return (
    <div>
      <BannerBar title={"Account"} />
      <div className="px-20 py-5 grid grid-cols-4 gap-5">
        <div className="border-r-2">
          <AccountMenu />
        </div>
        <div className="col-span-3">{props.children}</div>
      </div>
    </div>
  );
};

export default AccountLayout;
