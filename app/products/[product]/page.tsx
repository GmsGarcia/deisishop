"use client";
import useSWR from "swr";
import { Spinner } from "@heroui/spinner";
import { Product } from "@/models/interfaces";
import ProductCard from "@/components/product-card";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@heroui/button";
import ProductDetails from "@/components/product-details";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutoPage() {
  const router = useRouter();
  const params = useParams();
  const id = String(params.product);

  const { data: product, error } = useSWR<Product>(
    `https://deisishop.pythonanywhere.com/products/${id}`,
    (url: string) =>
      fetcher(url).then((data) => ({
        ...data,
        price: Number(data.price), // ensure number
        rating: {
          ...data.rating,
          rate: Number(data.rating?.rate ?? 0),
        },
      })),
  );

  if (error) {
    return (
      <div className="flex flex-col text-center">
        <p className="text-xl">Failed to load product.</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col text-center">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center">
      <Button className="m-5" onClick={() => router.back()}>
        Back
      </Button>

      <ProductDetails product={product} />
    </div>
  );
}
