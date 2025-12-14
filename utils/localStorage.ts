import { Cart, EMPTY_CART } from "@/models/interfaces";

export const getCartFromLocalStorage = (): Cart => {
  if (typeof window === "undefined") {
    return EMPTY_CART;
  }

  try {
    const cart = localStorage.getItem("cart");
    return cart ? (JSON.parse(cart) as Cart) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
};

export const saveCartToLocalStorage = (cart: Cart): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};
