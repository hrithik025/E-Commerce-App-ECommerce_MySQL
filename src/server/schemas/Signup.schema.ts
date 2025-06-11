import { z } from "zod";

const numberRegex = new RegExp("^[0-9]*$");

export const signupFormSchema = z
    .object({
        FirstName: z.string().min(1, "First Name is Required"),
        LastName: z.string().min(1, "Last Name is Required"),
        PhoneNumber: z
            .string()
            .regex(numberRegex, "Phone Number must contain only numbers")
            .length(10, "Phone Number should contain exactly 10 Characters"),
        Email: z.string().email("Please enter an correct Email Address"),
        Password: z
            .string()
            .min(1, "Password is Required")
            .min(8, "Minimum 8 Characters is required"),
        ConfirmPassword: z.string(),
    })
    .refine((data) => data.Password === data.ConfirmPassword, {
        message: "Password's not Match",
        path: ["confirmPassword"],
    });