"use client";

import { useCart } from "@/hooks/cart";
import ProductCard from "@/components/product-card";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";
import { CartItem } from "@/models/interfaces";
import { Input } from "@heroui/input";
import { useState } from "react";
import Link from "next/link";

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const [coupon, setCoupon] = useState("");
  const [student, setStudent] = useState(false);

  const [hasBought, setHasBought] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [reference, setReference] = useState(0);

  if (hasBought) {
    return (
      <div className="flex flex-col text-center items-center">
        <h1 className="text-3xl font-bold">Thank you!</h1>

        <p className="mt-4 text-xl">Total: ${totalCost}</p>
        <p className="mt-2">Reference: {reference}</p>

        <Link href="/products" className="m-5">
          <Button>Back to shopping</Button>
        </Link>
      </div>
    );
  }

  if (items.length === 0 && !hasBought) {
    return (
      <div className="flex flex-col text-center">
        <h1 className="text-3xl font-bold">Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }

  const buy = () => {
    if (hasBought) return;
    fetch("https://deisishop.pythonanywhere.com/buy/", {
      method: "POST",
      body: JSON.stringify({
        products: items.flatMap((c: CartItem) =>
          Array.from({ length: c.quantity }, () => c.product.id),
        ),
        student: student,
        name: "",
        coupon: coupon,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.statusText);
        }

        return res.json();
      })
      .then((res) => {
        console.log(res);
        if (res.error == "") {
          setTotalCost(res.totalCost);
          setReference(res.reference);
          setHasBought(true);
          clearCart();
        }
      })
      .catch(() => {
        console.log("something went wrong...");
      });
  };

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

      <div className="flex flex-col p-5 gap-5">
        <Input
          placeholder="Coupon"
          fullWidth={false}
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
        ></Input>
        <Checkbox isSelected={student} onValueChange={setStudent}>
          DEISI Student?
        </Checkbox>
      </div>

      <Button
        onClick={buy}
        className="text-xl font-bold bg-foreground text-background w-50"
      >
        Buy
      </Button>
    </div>
  );
}
