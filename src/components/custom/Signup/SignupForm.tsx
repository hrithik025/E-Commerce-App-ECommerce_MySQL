"use client";
import {
  Button,
  CustomFormField,
  Form,
  Input,
  PasswordInput,
} from "@/components/ui";
import { SignupUser } from "@/server/entities/actions";
import { signupFormSchema } from "@/server/schemas/Signup.schema";
import { signupFormData } from "@/server/types/Signup.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

export const SignupForm = () => {
  const [serverValidations, setServerValidations] = useState<string | null>(
    null
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      FirstName: "",
      LastName: "",
      PhoneNumber: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (data: signupFormData) => {
    console.log(data);
    setIsSubmitting(true);
    const signupResult = await SignupUser(data);
    console.log(signupResult);
    if (signupResult.success) {
      router.push("/login");
    } else {
      setServerValidations(signupResult.data?.message ?? null);
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChangeCapture={() => setServerValidations(null)}
        className="grid gap-5 py-5"
        noValidate
      >
        {serverValidations !== null && (
          <div className="bg-red-100 border-red-500 text-red-500 p-3 rounded">
            {serverValidations}
          </div>
        )}
        <CustomFormField
          name="FirstName"
          label="First Name"
          control={form.control}
        >
          <Input placeholder="Enter First Name" name="FirstName" type="text" />
        </CustomFormField>
        <CustomFormField
          name="LastName"
          label="Last Name"
          control={form.control}
        >
          <Input placeholder="Enter Last Name" name="LastName" type="text" />
        </CustomFormField>
        <CustomFormField
          name="PhoneNumber"
          label="Phone Number"
          control={form.control}
        >
          <Input
            placeholder="Enter Phone Number"
            name="PhoneNumber"
            type="text"
          />
        </CustomFormField>
        <CustomFormField
          name="Email"
          label="Email Address"
          control={form.control}
        >
          <Input placeholder="Enter Email Address" name="Email" type="email" />
        </CustomFormField>
        <CustomFormField
          name="Password"
          label="Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput name="Password" placeholder="Enter Password" />
          </div>
        </CustomFormField>
        <CustomFormField
          name="ConfirmPassword"
          label="Confirm Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput
              name="ConfirmPassword"
              placeholder="Enter Confirm Password"
            />
          </div>
        </CustomFormField>
        <Button
          type="submit"
          className="hover:cursor-pointer font-semibold bg-default hover:bg-default-bright"
          disabled={isSubmitting}
        >
          Signup
        </Button>
      </form>
    </Form>
  );
};
