import { z } from "zod";

export const LoginFormSchema = z.object({
    email: z.string().email("Please enter an correct Email Address"),
    password: z.string().min(1, "Password is Required"),
});
