import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCategories, useCreateProduct } from "../hooks";
import { capitalizeFirst } from "@/utils/format";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { productSchema, type ProductFormData } from "../schemas";

export function CreateProductPage() {
  const navigate = useNavigate();
  const { data: categories = [] } = useCategories();
  const { createProduct, isCreating } = useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      category: "",
      image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    },
  });

  const categoryOptions = [
    { value: "", label: "Select a category" },
    ...categories.map((cat) => ({ value: cat, label: capitalizeFirst(cat) })),
  ];

  const onSubmit = (data: ProductFormData) => {
    createProduct(
      {
        title: data.title,
        description: data.description,
        price: Number(data.price),
        category: data.category,
        image: data.image,
      },
      {
        onSuccess: () => {
          reset();
          navigate("/products");
        },
      }
    );
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Create Product</h1>
        <p className="text-slate-600 mt-1">Add a new product to your store</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <Input
            label="Product Title"
            placeholder="Enter product title"
            error={errors.title?.message}
            {...register("title")}
          />

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              placeholder="Enter product description"
              className="flex w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none"
            />
            {errors.description && (
              <p className="mt-1 text-xs text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            label="Price"
            type="number"
            step="0.01"
            placeholder="0.00"
            error={errors.price?.message}
            {...register("price")}
          />

          <Select
            label="Category"
            options={categoryOptions}
            error={errors.category?.message}
            {...register("category")}
          />

          <Input
            label="Image URL"
            type="url"
            placeholder="https://example.com/image.jpg"
            error={errors.image?.message}
            {...register("image")}
          />
        </div>

        <div className="flex gap-3">
          <Button
            type="submit"
            loading={isCreating}
            size="lg"
            className="flex-1 cursor-pointer"
          >
            Create Product
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={() => navigate("/products")}
            className="cursor-pointer"
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
