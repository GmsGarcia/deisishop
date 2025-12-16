"use client";

import { Product } from "@/models/interfaces";
import { Button } from "@heroui/button";
import { Card } from "@heroui/card";
import { useCart } from "@/hooks/cart";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductCardProps) {
  const { addToCart } = useCart();
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
    <div className="bg-foreground w-full p-6">
      <div>
        <h2 className="font-bold text-foreground dark:text-background">
          {product.title}
        </h2>
        <img
          src={`${product.image}`}
          alt={product.title}
          className="object-contain h-40 w-full"
        />

        <p className="text-background font-bold">
          Category: {product.category}
        </p>
        <p className="text-background font-bold">Rate: {product.rating.rate}</p>

        <span className="text-background">{product.description}</span>

        <p className="mt-2 font-semibold dark:text-background">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <Button
        className={
          "bg-black text-background dark:text-foreground w-full transition-all duration-300" +
          (justAdded ? "animate-pulse bg-danger" : "")
        }
        onPress={handleClick}
      >
        {justAdded ? "Added to cart!" : "Add to cart"}
      </Button>
    </div>
  );
}
