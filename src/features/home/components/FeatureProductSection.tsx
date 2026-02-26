import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

import { useProducts } from "@/features/products/hooks";

const FeaturedProductSection = () => {
  const { data: products = [], isLoading } = useProducts();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-slate-900">Featured Products</h2>
        <Link
          to="/products"
          className="text-sm font-medium text-slate-700 hover:text-slate-900"
        >
          View All <ArrowRight className="h-4 w-4 inline ml-1" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-slate-200 rounded-lg h-48 mb-3" />
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            ))
          : products.slice(0, 4).map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group bg-white rounded-xl border border-slate-200 p-4 hover:shadow-lg transition-all"
              >
                <div className="aspect-square flex items-center justify-center mb-3">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <h1 className="font-medium text-slate-900 line-clamp-1 text-sm mb-1">
                  {product.title}
                </h1>
                <p className="font-bold text-slate-900">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
      </div>
    </section>
  );
};

export default FeaturedProductSection;
