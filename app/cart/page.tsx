"use client";

import { useCart } from "@/hooks/cart";
import ProductCard from "@/components/product-card";
import { Button } from "@heroui/button";

export default function CartPage() {
  const { items, totalItems, totalPrice, addToCart, removeFromCart } =
    useCart();

  if (items.length === 0) {
    return (
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center items-center">
      <h1 className="text-3xl font-bold">Cart</h1>
      <p>
        {totalItems} items : ${totalPrice.toFixed(2)}
      </p>

      <div className="flex flex-row flex-wrap items-center justify-center gap-8 my-10">
        {items.map(({ product, quantity }) => (
          <ProductCard
            key={product.id}
            product={product}
            quantity={quantity}
            isCart
          />
        ))}
      </div>

      <Button className="text-xl font-bold bg-foreground text-background w-50">
        Buy
      </Button>
    </div>
  );
}
