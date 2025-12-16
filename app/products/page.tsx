"use client";
import useSWR from "swr";
import { Spinner } from "@heroui/spinner";
import { Select, SelectItem } from "@heroui/select";
import { Input } from "@heroui/input";
import { Category, Product } from "@/models/interfaces";
import ProductCard from "@/components/product-card";
import { useMemo, useState } from "react";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProdutosPage() {
  const { data: products, error } = useSWR(
    "https://deisishop.pythonanywhere.com/products/",
    (url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data: Product[]) =>
          data.map((p) => ({
            ...p,
            price: Number(p.price), // ensure price is a number
          })),
        ),
  );

  const { data: categories = [] } = useSWR(
    "https://deisishop.pythonanywhere.com/categories/",
    fetcher,
  );

  const order = ["Melhor avaliado", "Preço mais alto", "Preço mais baixo"];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedOrder, setSelectedOrder] = useState(order[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!products) return [];

    let filtered = products;

    // Filter by selected categories
    if (selectedCategories.length > 0) {
      const filt_categories = selectedCategories.map((c) => categories[c].name);
      filtered = filtered.filter((p: Product) =>
        filt_categories.includes(p.category),
      );
    }

    // Filter by search term
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((p: Product) =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Sort products
    switch (selectedOrder.currentKey) {
      case "0":
        filtered = filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "1":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      case "2":
        filtered = filtered.sort((a, b) => a.price - b.price); // assuming Product has a `rating` field
        break;
    }

    return filtered;
  }, [products, selectedCategories, searchTerm, selectedOrder]);

  if (error) {
    return (
      <div className="flex flex-col text-center">
        <p className="text-xl">Failed to load products.</p>
      </div>
    );
  }

  if (!products) {
    return (
      <div className="flex flex-col text-center">
        <Spinner size="lg" color="danger" />
      </div>
    );
  }

  return (
    <div className="flex flex-col text-center">
      <h1 className="text-3xl font-bold">Products</h1>

      <div className="flex flex-row flex-wrap items-center justify-center font-sans gap-8 my-10">
        <Select
          className="max-w-xs"
          label="Categoria"
          placeholder="Selecione uma categoria"
          selectionMode="multiple"
          onSelectionChange={(keys) => setSelectedCategories(Array.from(keys))}
        >
          {categories.map((c: Category, i: number) => (
            <SelectItem key={i}>{c.name}</SelectItem>
          ))}
        </Select>

        <Select
          className="max-w-xs"
          label="Ordenação"
          placeholder="Selecione uma categoria"
          defaultSelectedKeys={"0"}
          onSelectionChange={(key) => setSelectedOrder(key)}
        >
          {order.map((o: string, i: number) => (
            <SelectItem key={i}>{o}</SelectItem>
          ))}
        </Select>

        <Input
          label="Pesquisar"
          placeholder="Ex: Erro 404"
          type="text"
          fullWidth={false}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex flex-row flex-wrap items-center justify-center font-sans gap-8 my-10">
        {filteredProducts.map((p: Product, i: number) => (
          <ProductCard key={i} product={p} isCart={false} />
        ))}
      </div>
    </div>
  );
}
