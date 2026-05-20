"use client";

import { useEffect, useState } from "react";
import { products as fallbackProducts, type Product } from "@/lib/products";
import {
  getSupabase,
  isSupabaseConfigured,
  productFromRow,
  type ProductRow,
} from "@/lib/supabase";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>(fallbackProducts);
  const [loading, setLoading] = useState(() => isSupabaseConfigured());
  const [usingFallback, setUsingFallback] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();

    if (!supabase) {
      setUsingFallback(true);
      return;
    }

    let cancelled = false;

    async function loadProducts() {
      setLoading(true);
      setError(null);

      const { data, error } = await supabase!
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true, nullsFirst: false })
        .order("name", { ascending: true });

      if (cancelled) {
        return;
      }

      if (error) {
        setError(error.message);
        setProducts(fallbackProducts);
        setUsingFallback(true);
      } else if (data && data.length > 0) {
        setProducts((data as ProductRow[]).map(productFromRow));
        setUsingFallback(false);
      } else {
        setProducts(fallbackProducts);
        setUsingFallback(true);
      }

      setLoading(false);
    }

    loadProducts();

    return () => {
      cancelled = true;
    };
  }, []);

  return { products, loading, usingFallback, error };
}
