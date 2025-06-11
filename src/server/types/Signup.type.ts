import { signupFormSchema } from "@/server/schemas/Signup.schema";
import { z } from "zod";

export type signupFormData = z.infer<typeof signupFormSchema>;

export type SignupResultSchema = {
    message: string;
}