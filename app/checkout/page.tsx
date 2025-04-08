"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCartStore } from "@/store/cart-store";
import { checkoutAction } from "./checkout-action";

export default function CheckoutPage() {
  const { items, removeItem, addItem, clearCart } = useCartStore();

  const total = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  if (total === 0 || items.length === 0) {
    return (
      <div>
        <h1>Your Cart is Empty. Please add some products to the cart.</h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <Card className="max-w-md mx-auto mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {items.map((item, key) => (
              <li className="flex flex-col gap-2 border-b pb-2" key={key}>
                <div className="flex justify-between">
                  <span className="font-medium">{item.name} </span>
                  <span className="font-semibold">
                    R${((item.price * item.quantity) / 100).toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => removeItem(item.id)}
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                  >
                    -
                  </Button>
                  <span className="text-lg font-semibold">{item.quantity}</span>
                  <Button
                    onClick={() => addItem({ ...item, quantity: 1 })}
                    className="cursor-pointer"
                    size="sm"
                    variant="outline"
                  >
                    +
                  </Button>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-4 pt-2 text-lg font-semibold">
            Total: R${(total / 100).toFixed(2)}
          </div>
        </CardContent>
      </Card>

      <form action={checkoutAction} className="max-w-md mx-auto">
        <input type="hidden" name="items" value={JSON.stringify(items)} />
        <Button
          type="submit"
          className="w-full cursor-pointer"
          variant="default"
        >
          Proceed to Payment
        </Button>
      </form>

      <div className="max-w-md mx-auto">
        <Button
          onClick={() => clearCart()}
          className="w-full mt-4 cursor-pointer"
          variant="outline"
        >
          Clear Cart
        </Button>
      </div>
    </div>
  );
}
