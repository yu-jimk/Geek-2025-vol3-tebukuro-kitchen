import { z } from "zod";

// string型 1から50文字
export const stringSchema = z.string().min(1).max(50);
// typeも作っているが、現状使っているところはない
export type stringSchemaType = z.infer<typeof stringSchema>;