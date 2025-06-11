"use client";

import { CartURLParams } from "@/app/cart/page";
import { Button, CustomFormField, Form, Input, Toaster } from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import { VerifyCoupon } from "@/server/entities/queries/Coupon.query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FC } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

interface CouponFormProps extends BaseProps {
  defaultValue?: string;
}

const formSchema = z.object({
  couponCode: z
    .string()
    .length(15, "Coupon Code must be exactly 15 characters"),
});

interface FormData {
  couponCode: string;
}

export const CouponForm: FC<CouponFormProps> = (props) => {
  const router = useRouter();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      couponCode: props.defaultValue ?? "",
    },
  });

  const createToast = () => {
    toast.success("Coupon Applied Successfully");
  };

  const onSubmit = async (data: FormData) => {
    let couponValidationResult = await VerifyCoupon(data.couponCode);
    if (couponValidationResult.success) {
      createToast();
      searchParams.set(CartURLParams.COUPON_CODE, data.couponCode);
      router.push("/cart?" + searchParams.toString());
    } else {
      form.setError(
        "couponCode",
        { message: "Invalid Coupon Code" },
        { shouldFocus: true }
      );
      searchParams.delete(CartURLParams.COUPON_CODE);
      router.push("/cart?" + searchParams.toString());
    }
  };

  return (
    <Form {...form}>
      <Toaster richColors theme="light" />
      <form
        className="flex flex-col space-y-2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CustomFormField
          name="couponCode"
          label="Coupon Code"
          control={form.control}
        >
          <Input
            type="text"
            name="couponCode"
            placeholder="Enter Coupon Code"
          />
        </CustomFormField>
        <Button
          type="submit"
          className="hover:cursor-pointer font-semibold py-5 px-6 bg-default hover:bg-default-bright"
        >
          Verify Coupon
        </Button>
      </form>
    </Form>
  );
};
