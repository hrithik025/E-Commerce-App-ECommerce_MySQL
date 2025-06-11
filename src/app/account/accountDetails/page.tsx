import { AccountDetails } from "@/components/custom/Account";
import { GetAccountDetails } from "@/server/entities/queries/User.query";
import { UserAccountDetailsSchema } from "@/server/types/User.type";
import React from "react";

const AccountDetailsPage = async () => {
  const accountsDetailsResult = await GetAccountDetails();
  let accountsDetails: UserAccountDetailsSchema | null = null;

  if (accountsDetailsResult.success && accountsDetailsResult.data !== null) {
    accountsDetails = accountsDetailsResult.data;
  }

  if (accountsDetails === null) {
    return <></>;
  }

  return (
    <AccountDetails
      name={accountsDetails.FirstName + " " + accountsDetails.LastName}
      firstName={accountsDetails.FirstName}
      lastName={accountsDetails.LastName}
      email={accountsDetails.Email}
      phoneNumber={accountsDetails.PhoneNumber}
      passwordUpdatedDate={new Date().toLocaleDateString()}
      avatarUrl="/"
      createdAt={accountsDetails.CreatedTime.toLocaleString()}
    />
  );
};

export default AccountDetailsPage;
