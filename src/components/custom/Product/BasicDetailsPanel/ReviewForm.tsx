"use client";
import BaseProps from "@/lib/Props/BaseProps";
import {
  UserReviewFormData,
  UserReviewSchema,
} from "@/server/types/Review.type";
import React, { FC, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Button,
  CustomFormField,
  Form,
  Input,
  Textarea,
  Toaster,
} from "@/components/ui";
import {
  CreateReview,
  EditReview,
} from "@/server/entities/actions/Review.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ReviewFormProps extends BaseProps {
  ProductVariantId: string;
  IsEdit?: boolean;
  Review?: UserReviewSchema | null;
}

export const ReviewForm: FC<ReviewFormProps> = (props) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<UserReviewFormData>({
    resolver: zodResolver(UserReviewSchema),
    defaultValues: {
      NoOfStars: props.Review?.NoOfStars ?? "5",
      Comment: props.Review?.Comment ?? "",
    },
  });

  const onSubmit = async (data: UserReviewFormData) => {
    setIsSubmitting(true);
    const result =
      props.IsEdit && props.Review && props.Review !== null
        ? await EditReview(props.ProductVariantId, props.Review.Id, data)
        : await CreateReview(props.ProductVariantId, data);
    if (result.success && result.data !== null) {
      if (props.IsEdit) toast.success("Review Updated Successfully");
      else toast.success("Review Added Successfully");
    } else {
      toast.error("Server Error. Please try again later");
    }
    setIsSubmitting(false);
    router.refresh();
  };

  return (
    <Form {...form}>
      <Toaster richColors theme="light" />
      <form
        className="space-y-2 grid gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CustomFormField name="NoOfStars" label="Rating" control={form.control}>
          <Input
            className="[&::-webkit-outer-spin-button]:appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
            type="number"
            min="1"
            max="5"
            name="NoOfStars"
            placeholder="1-5"
          />
        </CustomFormField>
        <CustomFormField name="Comment" label="Comments" control={form.control}>
          <Textarea
            name="Comment"
            maxLength={500}
            placeholder="Type your Comments here."
          />
        </CustomFormField>
        <Button
          type={"submit"}
          disabled={isSubmitting}
          className="hover:cursor-pointer font-semibold"
        >
          {props.IsEdit ? "Edit Review" : "Create Review"}
        </Button>
      </form>
    </Form>
  );
};
