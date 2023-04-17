import * as z from "zod";
import { LoginSchema } from "./LoginSchema";

export const RegisterSchema = LoginSchema.extend({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
});
