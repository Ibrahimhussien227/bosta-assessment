import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShoppingCart, AlertCircle, Star } from "lucide-react";
import { toast } from "sonner";

import { useCartStore } from "@/stores/cart/cartStore";
import { ProductDetailSkeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { capitalizeFirst, formatPrice } from "@/utils/format";
import { useProduct } from "../hooks";

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((state) => state.addItem);

  const { data: product, isLoading, isError, error } = useProduct(Number(id));

  const handleAddToCart = () => {
    if (product) {
      addItem(product);
      toast.success(`${product.title.slice(0, 20)}... added to cart`);
    }
  };

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
          <AlertCircle className="h-8 w-8 text-red-500" />
        </div>
        <h1 className="text-lg font-semibold text-slate-900 mb-2">
          Product not found
        </h1>
        <p className="text-slate-600 mb-6">
          {error?.message ?? "The product you are looking for does not exist"}
        </p>
        <Button onClick={() => navigate("/products")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => navigate(-1)}
        className="mb-6 cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Products
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Image */}
        <div className="bg-white rounded-xl border border-slate-200 p-8 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-96 max-w-full object-contain"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <Badge variant="secondary" className="w-fit mb-3">
            {capitalizeFirst(product.category)}
          </Badge>

          <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
            {product.title}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <div className="flex items-center">
              <Star
                fill="oklch(85.2% 0.199 91.936)"
                className="size-4 text-yellow-400 fill-current"
              />
              <span className="ml-1 text-lg font-medium text-slate-700">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-sm text-slate-400">
              ({product.rating.count} reviews)
            </span>
          </div>

          <p className="text-4xl font-bold text-slate-900 mb-6">
            {formatPrice(product.price)}
          </p>

          <Card className="p-6 mb-6">
            <h1 className="font-semibold text-slate-900 mb-3">Description</h1>
            <p className="text-slate-600 leading-relaxed">
              {product.description}
            </p>
          </Card>

          <div className="mt-auto">
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full cursor-pointer"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
