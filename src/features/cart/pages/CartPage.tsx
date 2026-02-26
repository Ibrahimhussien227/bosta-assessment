import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { toast } from "sonner";

import { useCartStore } from "@/stores/cart/cartStore";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatPrice } from "@/utils/format";

export function CartPage() {
  const {
    items,
    totalItems,
    totalPrice,
    removeItem,
    updateQuantity,
    clearCart,
  } = useCartStore();

  const handleRemove = (productId: number, title: string) => {
    removeItem(productId);
    toast.info(`${title.slice(0, 15)}... removed from cart`);
  };

  const handleQuantityChange = (productId: number, quantity: number) => {
    if (quantity < 1) {
      const item = items.find((i) => i.id === productId);
      handleRemove(productId, item?.title ?? "Item");
      return;
    }
    updateQuantity(productId, quantity);
  };

  if (items.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-100 rounded-full mb-6">
          <ShoppingBag className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Your cart is empty
        </h2>
        <p className="text-slate-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any items to your cart yet. Browse our
          products and find something you'll love!
        </p>
        <Link to="/products">
          <Button size="lg" className="cursor-pointer">
            Start Shopping
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="text-slate-600 mt-1">
            {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            clearCart();
            toast.info("Cart cleared");
          }}
        >
          Clear Cart
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex gap-4">
                <Link to={`/products/${item.id}`} className="shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-contain bg-white rounded-lg"
                  />
                </Link>

                <div className="flex-1 min-w-0">
                  <Link to={`/products/${item.id}`}>
                    <h1 className="font-semibold text-slate-900 hover:text-slate-700 transition-colors line-clamp-2">
                      {item.title}
                    </h1>
                  </Link>
                  <p className="text-lg font-bold text-slate-900 mt-1">
                    {formatPrice(item.price)}
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity - 1)
                        }
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value) || 1
                          )
                        }
                        className="w-14 h-8 text-center border border-slate-200 rounded focus:outline-none focus:ring-2 focus:ring-slate-900"
                      />
                      <button
                        onClick={() =>
                          handleQuantityChange(item.id, item.quantity + 1)
                        }
                        className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => handleRemove(item.id, item.title)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-24">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-900">
                  {formatPrice(totalPrice)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="border-t border-slate-200 pt-3">
                <div className="flex justify-between">
                  <span className="font-semibold text-slate-900">Total</span>
                  <span className="font-bold text-xl text-slate-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full cursor-pointer" size="lg">
              Proceed to Checkout
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>

            <p className="text-xs text-slate-500 text-center mt-4">
              This is a demo. No actual payment will be processed.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
