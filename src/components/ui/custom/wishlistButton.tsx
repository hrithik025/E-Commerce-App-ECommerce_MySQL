"use client";
import { Button } from "@/components/ui";
import { AddToWishlist } from "@/server/entities/actions";
import React, { FC, useState } from "react";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";

interface WishlistButtonProps {
  isWishlisted: boolean;
  productVariantId: string;
}

export const WishlistButton: FC<WishlistButtonProps> = (props) => {
  const [isWishlisted, setIsWishlisted] = useState<boolean>(props.isWishlisted);
  const [isDisabled, setIsDisabled] = useState<boolean>(false);

  const handleWishlist = async () => {
    setIsDisabled(true);
    const result = await AddToWishlist(props.productVariantId);
    if (result.success) {
      setIsWishlisted(!isWishlisted);
    } else {
      console.log(result.error);
    }
    setIsDisabled(false);
  };

  return (
    <Button
      className="rounded-full m-2 py-5 flex items-center justify-center shadow-[0px_0px_6px_2px_rgba(0,_0,_0,_0.25)] hover:bg-gray-100 bg-white hover:cursor-pointer"
      onClick={(e) => handleWishlist()}
      disabled={isDisabled}
    >
      {!isWishlisted ? (
        <BsHeart size={20} className="text-default" />
      ) : (
        <BsFillHeartFill className="text-default" size={20} />
      )}
    </Button>
  );
};
