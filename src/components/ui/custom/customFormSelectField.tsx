import { FC } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui";
import BaseProps from "@/lib/Props/BaseProps";

interface CustomFormSelectFieldProps extends BaseProps {
  control: any;
  name: string;
  label: string;
  placeholder: string;
  defaultValue?: string | null;
  children: React.ReactElement;
}

export const CustomFormSelectField: FC<CustomFormSelectFieldProps> = ({
  control,
  name,
  label,
  children,
  className,
  defaultValue,
  placeholder,
}) => {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel htmlFor={name} className="font-semibold">
            {label}
          </FormLabel>
          <Select value={field.value} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
