"use client";
import { Button, CustomFormField, Form, Input, Toaster } from "@/components/ui";
import { PasswordInput } from "@/components/ui/custom/passwordInput";
import BaseProps from "@/lib/Props/BaseProps";
import { ChangePassword } from "@/server/entities/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import classNames from "classnames";
import React, { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current Password is required"),
    newPassword: z.string().min(8, "Minimum 8 Characters is required"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password's not Match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Current Password should not be same as New Password",
    path: ["newPassword"],
  });

type changePasswordData = z.infer<typeof changePasswordSchema>;

interface ChangePasswordFormProps extends BaseProps {}

export const ChangePasswordForm: FC<ChangePasswordFormProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const form = useForm<changePasswordData>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: changePasswordData) => {
    setIsSubmitting(true);
    const changePasswordResult = await ChangePassword(
      data.currentPassword,
      data.newPassword
    );
    if (changePasswordResult.success) {
      toast.success(changePasswordResult.data?.message);
    } else {
      toast.error(changePasswordResult.data?.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <Toaster richColors theme="light" position="top-center" />
      <form
        className={classNames("space-y-2 grid gap-2", props.className)}
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CustomFormField
          name="currentPassword"
          label="Current Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput
              name="currentPassword"
              placeholder="Current Password"
            />
          </div>
        </CustomFormField>
        <CustomFormField
          name="newPassword"
          label="New Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput name="newPassword" placeholder="New Password" />
          </div>
        </CustomFormField>
        <CustomFormField
          name="confirmPassword"
          label="Confirm Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput
              name="confirmPassword"
              placeholder="Confirm Password"
            />
          </div>
        </CustomFormField>
        <Button
          type="submit"
          className="hover:cursor-pointer font-semibold"
          disabled={isSubmitting}
        >
          Change Password
        </Button>
      </form>
    </Form>
  );
};
