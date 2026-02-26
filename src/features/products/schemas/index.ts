import z from "zod";

export const productSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(3, "Title must be at least 3 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "Description must be at least 10 characters"),
  price: z.number().min(0.01, "Price must be a positive number"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Must be a valid URL"),
});

export type ProductFormData = z.input<typeof productSchema>;
