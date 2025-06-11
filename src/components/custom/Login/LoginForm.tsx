"use client";
import {
  Button,
  CustomFormField,
  Form,
  Input,
  PasswordInput,
} from "@/components/ui";
import { LoginFormSchema } from "@server/schemas";
import { LoginFormData } from "@server/types";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const [serverValidation, setServerValidation] = useState<string | null>(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        router.push(result.nextURL);
      } else {
        setServerValidation(result.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onChangeCapture={() => setServerValidation(null)}
        className="grid gap-5 py-5"
        noValidate
      >
        {serverValidation !== null && (
          <div className="bg-red-100 border-red-500 text-red-500 p-3 rounded">
            {serverValidation}
          </div>
        )}

        <CustomFormField
          name="email"
          label="Email Address"
          control={form.control}
        >
          <Input placeholder="Enter Email Address" name="email" type="email" />
        </CustomFormField>
        <CustomFormField
          name="password"
          label="Password"
          control={form.control}
        >
          <div className="relative">
            <PasswordInput name="password" placeholder="Enter Password" />
          </div>
        </CustomFormField>
        <Button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="hover:cursor-pointer font-semibold bg-default hover:bg-default-bright"
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
