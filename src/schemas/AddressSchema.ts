import * as z from "zod";

export const AddressSchema = z.object({
  firstName: z.string(), // 名
  lastName: z.string().min(1), // 性
  address1: z.string().min(1), // 町名・番地
  address2: z.string(), // 建物名・部屋番号
  province: z.string().min(1), // 都道府県
  city: z.string().min(1), // 市区町村
  zip: z.string().min(1), // 郵便番号
  phone: z.string().min(1), // 電話番号
});
