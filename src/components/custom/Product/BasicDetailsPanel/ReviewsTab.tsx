import { Review } from "@/components/custom/Product/BasicDetailsPanel/Review";
import { ReviewDialog } from "@/components/custom/Product/BasicDetailsPanel/ReviewDialog";
import { TabsContent } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { GetProductReviews } from "@/server/entities/queries/Review.query";
import React, { FC } from "react";

interface ReviewsTabProps extends BaseProps {
  productVariantId: string;
}

export const ReviewsTab: FC<ReviewsTabProps> = async (props) => {
  const reviewsResult = await GetProductReviews(props.productVariantId);
  const reviews =
    reviewsResult.success && reviewsResult.data !== null
      ? reviewsResult.data
      : [];

  return (
    <TabsContent
      value="reviews"
      className="rounded-md shadow-normal p-4 text-sm space-y-2"
    >
      <ReviewDialog productVariantId={props.productVariantId} />
      {reviews.map((review, idx) => (
        <Review
          key={idx}
          reviewerName={review.UserName}
          rating={review.NoOfStars}
          comment={review.Comment}
        />
      ))}
    </TabsContent>
  );
};
