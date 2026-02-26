import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Star } from "lucide-react";

import { toast } from "sonner";
import type { Product } from "@/types";
import { useCartStore } from "@/stores/cart/cartStore";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { capitalizeFirst, formatPrice } from "@/utils/format";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.title.slice(0, 20)}... added to cart`);
  };

  return (
    <Link to={`/products/${product.id}`}>
      <Card className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
        <div className="relative aspect-square p-4 flex items-center justify-center bg-white rounded-t-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <Badge
            variant="secondary"
            className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm"
          >
            {capitalizeFirst(product.category)}
          </Badge>
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h1 className="font-semibold text-slate-900 line-clamp-2 mb-1 group-hover:text-slate-700 transition-colors">
            {product.title}
          </h1>

          <div className="flex items-center gap-1 mb-2">
            <div className="flex items-center">
              <Star
                fill="oklch(85.2% 0.199 91.936)"
                className="size-4 text-yellow-400 fill-current"
              />
              <span className="ml-1 text-sm text-slate-600">
                {product.rating.rate}
              </span>
            </div>
            <span className="text-xs text-slate-400">
              ({product.rating.count})
            </span>
          </div>

          <div className="mt-auto">
            <p className="text-xl font-bold text-slate-900 mb-3">
              {formatPrice(product.price)}
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 cursor-pointer"
              >
                <Eye className="h-4 w-4" />
                Details
              </Button>
              <Button
                size="sm"
                className="flex-1 cursor-pointer"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
