import * as z from "zod";

export const InfoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
