"use client";

import { useEffect, useState } from "react";
import { cartStore } from "@/models/cart-store";
import { Cart } from "@/models/interfaces";

export function useCart() {
  const [cart, setCart] = useState<Cart>(cartStore.getCart());

  useEffect(() => {
    // immediately load saved cart
    cartStore.loadFromLocalStorage();

    // subscribe to updates
    const unsubscribe = cartStore.subscribe(setCart);

    return unsubscribe; // cleanup
  }, []);

  return {
    items: cart.items,
    totalItems: cart.items.reduce((sum, i) => sum + i.quantity, 0),
    totalPrice: cart.items.reduce(
      (sum, i) => sum + Number(i.product.price) * i.quantity,
      0,
    ),
    addToCart: (p: any) => cartStore.addToCart(p),
    removeFromCart: (id: number) => cartStore.removeFromCart(id),
    clearCart: () => cartStore.clearCart(),
  };
}
