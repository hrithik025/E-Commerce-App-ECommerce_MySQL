"use client";
import { CartURLParams } from "@/app/cart/page";
import {
  Form,
  CustomFormField,
  Input,
  Button,
  CustomFormSelectField,
  SelectItem,
  Toaster,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import {
  CreateAddress,
  EditAddress,
} from "@/server/entities/actions/Address.action";
import { GetStatesForAddressForm } from "@/server/entities/queries/State.query";
import {
  AddressFormData,
  AddressSchema,
  GetAddressesForUserSchema,
} from "@/server/types/Address.type";
import { GetStatesForAddressFormSchema } from "@/server/types/State.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddressFormProps extends BaseProps {
  address?: GetAddressesForUserSchema;
  isEdit?: boolean;
}

export const AddressForm: FC<AddressFormProps> = (props) => {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = new URLSearchParams(useSearchParams().toString());

  const isEdit: boolean = props.isEdit ?? false;
  const [states, setStates] = useState<GetStatesForAddressFormSchema[]>([]);

  const GetStates = async () => {
    const statesResult = await GetStatesForAddressForm();
    if (statesResult.success && Array.isArray(statesResult.data))
      return statesResult.data;
    return [];
  };

  useEffect(() => {
    GetStates().then((result) => {
      setStates([...result]);
    });
  }, []);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(AddressSchema),
    defaultValues: {
      FirstName: props.address?.FirstName ?? "",
      LastName: props.address?.LastName ?? "",
      Address: props.address?.Address ?? "",
      City: props.address?.City ?? "",
      State: "",
      Landmark: props.address?.Landmark ?? "",
      PhoneNumber: props.address?.PhoneNumber ?? "",
      PinCode: props.address?.PinCode ?? "",
      Email: props.address?.Email ?? "",
      Country: props.address?.Country ?? "India",
    },
  });

  useEffect(() => {
    form.resetField("State", {
      defaultValue: GetDefaultState() ?? "",
    });
  }, [states]);

  const GetDefaultState = () => {
    let selectedStates = states.filter((x) => x.Name == props.address?.State);
    if (selectedStates && selectedStates.length > 0) {
      return selectedStates[0].Id;
    }
    return null;
  };

  const onSubmit = async (data: AddressFormData) => {
    if (!isEdit) {
      let addressResult = await CreateAddress(data);
      if (addressResult.success && addressResult.data !== null) {
        let address = addressResult.data;
        if (pathName.includes("cart")) {
          searchParams.set(CartURLParams.ADDRESS, address.Id);
          router.push("/cart?" + searchParams.toString());
        } else {
          router.refresh();
        }
        toast.success("Address created Successfully!!!");
        form.reset();
      } else {
        toast.error("Address creation Failed!!!");
      }
    } else if (props.address !== null && props.address !== undefined) {
      let addressResult = await EditAddress(props.address.Id, data);
      if (addressResult.success && addressResult.data !== null) {
        toast.success("Address updated Successfully!!!");
      } else {
        toast.error("Address update Failed!!!");
      }
      router.refresh();
    }
  };

  return (
    <Form {...form}>
      <Toaster richColors theme="light" />
      <form
        className="space-y-2 grid grid-cols-2 gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
        noValidate
      >
        <CustomFormField
          name="FirstName"
          label="First Name"
          control={form.control}
        >
          <Input type="text" name="FirstName" placeholder="First Name" />
        </CustomFormField>
        <CustomFormField
          name="LastName"
          label="Last Name"
          control={form.control}
        >
          <Input type="text" name="LastName" placeholder="Last Name" />
        </CustomFormField>
        <CustomFormField
          className="col-span-2"
          name="Address"
          label="Address"
          control={form.control}
        >
          <Input
            type="text"
            name="Address"
            placeholder="Door No, Apartment, Street"
          />
        </CustomFormField>
        <CustomFormField name="City" label="City" control={form.control}>
          <Input type="text" name="City" placeholder="City" />
        </CustomFormField>
        <CustomFormSelectField
          control={form.control}
          name="State"
          label="State"
          placeholder="State"
        >
          <React.Fragment>
            {states.map((state, idx) => (
              <SelectItem key={idx} value={state.Id} tabIndex={idx}>
                {state.Name}
              </SelectItem>
            ))}
          </React.Fragment>
        </CustomFormSelectField>
        <CustomFormField
          name="Landmark"
          label="Landmark"
          control={form.control}
        >
          <Input
            type="text"
            name="Landmark"
            placeholder="Landmark (Optional)"
          />
        </CustomFormField>
        <CustomFormField name="PinCode" label="Pin Code" control={form.control}>
          <Input type="text" name="PinCode" placeholder="Pin Code" />
        </CustomFormField>
        <CustomFormField
          name="PhoneNumber"
          label="Phone Number"
          control={form.control}
        >
          <Input type="text" name="PhoneNumber" placeholder="Phone Number" />
        </CustomFormField>
        <CustomFormField name="Email" label="E-Mail" control={form.control}>
          <Input type="email" name="Email" placeholder="E-Mail Address" />
        </CustomFormField>
        <Button
          type={"submit"}
          className="col-span-2 hover:cursor-pointer font-semibold"
        >
          {isEdit ? "Edit Address" : "Create Address"}
        </Button>
      </form>
    </Form>
  );
};
