import { ReviewForm } from "@/components/custom/Product/BasicDetailsPanel/ReviewForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductReviewForUser } from "@/server/entities/queries/Review.query";
import { GetReviewForUserSchema } from "@/server/types/Review.type";
import classNames from "classnames";
import React, { FC } from "react";

interface ReviewDialogProps extends BaseProps {
  productVariantId: string;
}

export const ReviewDialog: FC<ReviewDialogProps> = async (props) => {
  const reviewResult = await GetProductReviewForUser(props.productVariantId);
  let userReview: GetReviewForUserSchema | null = null;
  if (reviewResult.success && reviewResult.data !== null) {
    userReview = reviewResult.data;
  }

  if (
    userReview === null ||
    (!userReview.IsCreateApplicable && !userReview.IsEditApplicable)
  ) {
    return <></>;
  }

  return (
    <Dialog>
      <DialogTrigger
        className={classNames(
          "hover:cursor-pointer w-full text-white rounded-md font-semibold bg-default hover:bg-default-bright py-2",
          props.className
        )}
      >
        {userReview.IsCreateApplicable ? "Create" : "Edit"} Review
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {userReview.IsCreateApplicable ? "Create" : "Edit"} Review
          </DialogTitle>
        </DialogHeader>
        {userReview.IsCreateApplicable && (
          <ReviewForm ProductVariantId={props.productVariantId} />
        )}
        {userReview.IsEditApplicable && (
          <ReviewForm
            IsEdit={true}
            Review={userReview.Review}
            ProductVariantId={props.productVariantId}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
