import * as z from "zod";

export const RecoverSchema = z
  .object({
    email: z.string().email(),
    emailConfirm: z.string().email(),
  })
  .refine((data) => data.email === data.emailConfirm, {
    message: "メールアドレスが一致しません",
    path: ["emailConfirm"],
  });
