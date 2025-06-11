import { FC, cloneElement } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";
import classNames from "classnames";

interface CustomFormFieldProps extends BaseProps {
  control: any;
  name: string;
  label: string;
  children: React.ReactElement;
  formControlClassName?: string;
}

export const CustomFormField: FC<CustomFormFieldProps> = ({
  control,
  name,
  label,
  children,
  className,
  formControlClassName,
}) => (
  <FormField
    name={name}
    control={control}
    render={({ field }) => (
      <FormItem className={className}>
        <FormLabel htmlFor={name} className="font-semibold">
          {label}
        </FormLabel>
        <FormControl className={classNames(formControlClassName)}>
          {cloneElement(children, { ...field })}
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);
