"use client";

import { Product } from "@/models/interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useCart } from "@/hooks/cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  quantity?: number;
  isCart?: boolean;
}

export default function ProductCard({
  product,
  quantity = 1,
  isCart = false,
}: ProductCardProps) {
  const { addToCart, removeFromCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    addToCart(product);
    setJustAdded(true);

    // Reset after 2 seconds
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  return (
    <Card className="flex flex-col justify-between w-60 gap-3 bg-background text-foreground dark:bg-foreground p-5">
      {/* Product info */}
      <div>
        <h2 className="font-bold text-foreground dark:text-background">
          {product.title}
        </h2>
        <img
          src={`https://deisishop.pythonanywhere.com/${product.image}`}
          alt={product.title}
          className="object-contain h-40 w-full"
        />

        <p className="mt-2 font-semibold dark:text-background">
          ${product.price.toFixed(2)}
        </p>
      </div>

      {!isCart ? (
        <Button
          className={
            "bg-black text-background dark:text-foreground w-full transition-all duration-300" +
            (justAdded ? "animate-pulse bg-danger" : "")
          }
          onPress={handleClick}
        >
          {justAdded ? "Added to cart!" : "Add to cart"}
        </Button>
      ) : (
        <div className="flex items-center justify-between dark:text-background gap-2">
          <Button
            size="sm"
            className="bg-black text-background dark:text-foreground"
            onPress={() => removeFromCart(product.id)}
          >
            -
          </Button>

          <span className="font-semibold">{quantity}</span>

          <Button
            size="sm"
            className="bg-black text-background dark:text-foreground"
            onPress={() => addToCart(product)}
          >
            +
          </Button>
        </div>
      )}
    </Card>
  );
}
