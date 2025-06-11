import {
  Avatar,
  AvatarFallback,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Rating,
} from "@/components/ui";
import React from "react";

interface ReviewProps {
  reviewerName: string;
  rating: number;
  comment: string;
}

export const Review: React.FC<ReviewProps> = ({
  reviewerName,
  rating,
  comment,
}) => {
  return (
    <Card className="gap-2 py-4 [&>div]:px-4">
      <CardHeader className="flex-row items-center">
        <Avatar className="size-12">
          <AvatarFallback>{reviewerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-between">
          <CardTitle>{reviewerName}</CardTitle>
          <Rating rating={rating} className="[&>div]:w-3" />
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{comment}</CardDescription>
      </CardContent>
    </Card>
  );
};
