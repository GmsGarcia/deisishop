import { Product, Cart, CartItem, EMPTY_CART } from "@/models/interfaces";

export class CartStore {
  private cart: Cart = EMPTY_CART;
  private listeners: ((cart: Cart) => void)[] = [];

  subscribe(listener: (cart: Cart) => void) {
    this.listeners.push(listener);
    listener(this.cart); // send initial value immediately
    return () => {
      this.listeners = this.listeners.filter((l) => l !== listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.cart));
  }

  loadFromLocalStorage() {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("cart");
    if (saved) this.cart = JSON.parse(saved);
    this.notify();
  }

  saveToLocalStorage() {
    if (typeof window === "undefined") return;
    localStorage.setItem("cart", JSON.stringify(this.cart));
  }

  addToCart(product: Product) {
    const existing = this.cart.items.find((i) => i.product.id === product.id);

    let updatedItems;
    if (existing) {
      updatedItems = this.cart.items.map((i) =>
        i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
      );
    } else {
      updatedItems = [...this.cart.items, { product, quantity: 1 }];
    }

    this.cart = { items: updatedItems }; // ? create new object
    this.saveToLocalStorage();
    this.notify();
  }

  removeFromCart(productId: number) {
    const updatedItems = this.cart.items
      .map((i) =>
        i.product.id === productId ? { ...i, quantity: i.quantity - 1 } : i,
      )
      .filter((i) => i.quantity > 0);

    this.cart = { items: updatedItems }; // ? new object
    this.saveToLocalStorage();
    this.notify();
  }

  clearCart() {
    this.cart = EMPTY_CART;
    this.saveToLocalStorage();
    this.notify();
  }

  getCart() {
    return this.cart;
  }
}

export const cartStore = new CartStore();
