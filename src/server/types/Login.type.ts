import { LoginFormSchema } from "@server/schemas";
import { z } from "zod";

export type LoginFormData = z.infer<typeof LoginFormSchema>;