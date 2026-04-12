"use client";

import { useEffect, useState } from "react";
import ProductForm from "../../../components/ProductForm";
import { useParams } from "next/navigation";

export default function EditProduct() {
  const params = useParams();
  const id = params?.id as string;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${id}`);
        const productData = await res.json();
        setData(productData);
      } catch (err) {
        console.error("Failed to fetch product", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
      </div>
    );
  }

  return <ProductForm initialData={data} id={id} />;
}
