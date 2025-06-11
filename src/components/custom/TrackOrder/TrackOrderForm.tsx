"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, Button, CustomFormField, Input } from "@/components/ui";
import { TrackOrder } from "@/server/entities/queries/OrderProduct.query";
import { useState } from "react";
import { TrackOrderSchema } from "@/server/types/OrderProduct.type";

const formSchema = z.object({
  orderNumber: z
    .string()
    .length(15, "Order Number must be exactly 15 characters"),
  email: z.string().email("Please enter an correct Email Address"),
});

interface FormData {
  orderNumber: string;
  email: string;
}

export const TrackOrderForm = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [order, setOrderStatus] = useState<TrackOrderSchema | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      orderNumber: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    const trackOrderResult = await TrackOrder(data.orderNumber, data.email);
    if (trackOrderResult.success) {
      setOrderStatus(trackOrderResult.data);
    } else {
      setOrderStatus(null);
    }
    setIsSubmitting(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-5 py-5"
        noValidate
      >
        <CustomFormField
          name="orderNumber"
          label="Order Number"
          control={form.control}
        >
          <Input
            placeholder="Enter Order Number"
            name="orderNumber"
            type="text"
          />
        </CustomFormField>
        <CustomFormField name="email" label="Email" control={form.control}>
          <Input placeholder="Enter Email" name="email" type="email" />
        </CustomFormField>
        {order !== null && (
          <div className="col-span-full flex justify-center text-lg">
            <span className="mx-2">Order Status :</span>
            <span className="font-semibold text-green-600">{order.Status}</span>
          </div>
        )}
        <div className="col-span-full flex justify-center">
          <Button
            type="submit"
            className="hover:cursor-pointer font-semibold text-base py-5 px-10 bg-default hover:bg-default-bright"
            disabled={isSubmitting}
          >
            Track Order
          </Button>
        </div>
      </form>
    </Form>
  );
};
