import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import type { Product } from "@/lib/products";

export const ADMIN_EMAIL = "kmkusche@gmail.com";

export type ProductRow = {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  category: string;
  image: string;
  images: string[] | null;
  description: string;
  era: string;
  condition: string;
  dimensions: string | null;
  is_new: boolean;
  is_featured: boolean;
  sort_order: number | null;
};

let supabase: SupabaseClient | null = null;

export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

export function getSupabase() {
  if (!isSupabaseConfigured()) {
    return null;
  }

  if (!supabase) {
    supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return supabase;
}

export function isAdminEmail(email?: string | null) {
  return email?.toLowerCase() === ADMIN_EMAIL;
}

export function productFromRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    originalPrice:
      row.original_price === null ? undefined : Number(row.original_price),
    category: row.category,
    image: row.image,
    images: row.images ?? [row.image],
    description: row.description,
    era: row.era,
    condition: row.condition,
    dimensions: row.dimensions ?? undefined,
    isNew: row.is_new,
    isFeatured: row.is_featured,
  };
}

export function rowFromProduct(product: Product, sortOrder = 0) {
  return {
    id: product.id,
    name: product.name,
    price: product.price,
    original_price: product.originalPrice ?? null,
    category: product.category,
    image: product.image,
    images: product.images ?? [product.image],
    description: product.description,
    era: product.era,
    condition: product.condition,
    dimensions: product.dimensions ?? null,
    is_new: Boolean(product.isNew),
    is_featured: Boolean(product.isFeatured),
    sort_order: sortOrder,
  };
}
