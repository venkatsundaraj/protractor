import { z } from "zod";

export const emailValidator = z.object({
  email: z.string().email(),
});

export type EmailValidatorSchema = z.infer<typeof emailValidator>;
