"use client";

import { Button } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { UpdateWishlistProductByEncryptedId } from "@/server/entities/actions/WishlistProduct.action";
import React, { FC, useState } from "react";

interface WishlistDeleteButtonProps extends BaseProps {
  WishlistProductId: string;
}

export const WishlistDeleteButton: FC<WishlistDeleteButtonProps> = (props) => {
  const [disabled, setDisabled] = useState<boolean>(false);
  const deleteWishlistProduct = async () => {
    setDisabled(true);
    await UpdateWishlistProductByEncryptedId(props.WishlistProductId, false);
    setDisabled(false);
    window.location.reload();
  };

  return (
    <Button
      className="text-white bg-default hover:bg-default-bright hover:cursor-pointer font-semibold"
      onClick={(e) => deleteWishlistProduct()}
      disabled={disabled}
    >
      Delete
    </Button>
  );
};
