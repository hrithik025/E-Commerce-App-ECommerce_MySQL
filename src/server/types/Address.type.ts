import { z } from "zod";

const NumberRegex = new RegExp("^[0-9]*$");

export const AddressSchema = z.object({
    FirstName: z.string().min(1, "First Name is required"),
    LastName: z.string().min(1, "Last Name is required"),
    Address: z.string().min(1, "Address is required"),
    City: z.string().min(1, "City is required"),
    State: z.string().min(1, "State is required"),
    Country: z.string().min(1, "Country is required"),
    Landmark: z.string().optional(),
    PinCode: z
        .string()
        .regex(NumberRegex, "PIN Code must contain only numbers")
        .length(6, "PIN Code should contain exactly 6 Characters"),
    PhoneNumber: z
        .string()
        .regex(NumberRegex, "Phone Number must contain only numbers")
        .length(10, "Phone Number should contain exactly 10 Characters"),
    Email: z.string().min(1, "Email is required").email("Invalid Email Address"),
});

export type AddressFormData = z.infer<typeof AddressSchema>;

export type GetAddressesForUserSchema = AddressFormData & {
    Id: string;
    StateId: string;
};

export type GetAddressesForCartSchema = {
    Id: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Landmark?: string;
    City: string;
    State: string;
    PinCode: string;
    Email: string;
    PhoneNumber: string;
    StateTaxRate: number;
    CountryTaxRate: number;
    TaxTypeName: string;
};