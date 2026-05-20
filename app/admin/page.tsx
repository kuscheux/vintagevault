"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import type { User } from "@supabase/supabase-js";
import { ArrowLeft, LogOut, Plus, Save, Trash2 } from "lucide-react";
import { products as sampleProducts, type Product } from "@/lib/products";
import {
  ADMIN_EMAIL,
  getSupabase,
  isAdminEmail,
  isSupabaseConfigured,
  productFromRow,
  rowFromProduct,
  type ProductRow,
} from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type ProductForm = {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: string;
  image: string;
  images: string;
  description: string;
  era: string;
  condition: string;
  dimensions: string;
  isNew: boolean;
  isFeatured: boolean;
};

const emptyForm: ProductForm = {
  id: "",
  name: "",
  price: "",
  originalPrice: "",
  category: "Furniture",
  image: "/images/placeholder.jpg",
  images: "",
  description: "",
  era: "",
  condition: "Good",
  dimensions: "",
  isNew: false,
  isFeatured: false,
};

function formFromProduct(product: Product): ProductForm {
  return {
    id: product.id,
    name: product.name,
    price: String(product.price),
    originalPrice: product.originalPrice ? String(product.originalPrice) : "",
    category: product.category,
    image: product.image,
    images: (product.images ?? [product.image]).join("\n"),
    description: product.description,
    era: product.era,
    condition: product.condition,
    dimensions: product.dimensions ?? "",
    isNew: Boolean(product.isNew),
    isFeatured: Boolean(product.isFeatured),
  };
}

function productFromForm(form: ProductForm): Product {
  const images = form.images
    .split(/[\n,]/)
    .map((image) => image.trim())
    .filter(Boolean);

  return {
    id: form.id || crypto.randomUUID(),
    name: form.name.trim(),
    price: Number(form.price),
    originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
    category: form.category.trim(),
    image: form.image.trim(),
    images: images.length > 0 ? images : [form.image.trim()],
    description: form.description.trim(),
    era: form.era.trim(),
    condition: form.condition.trim(),
    dimensions: form.dimensions.trim() || undefined,
    isNew: form.isNew,
    isFeatured: form.isFeatured,
  };
}

export default function AdminPage() {
  const supabase = useMemo(() => getSupabase(), []);
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState(ADMIN_EMAIL);
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductForm>(emptyForm);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const isAdmin = isAdminEmail(user?.email);

  useEffect(() => {
    if (!supabase) {
      setLoading(false);
      return;
    }

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (isAdmin) {
      loadProducts();
    }
  }, [isAdmin]);

  async function loadProducts() {
    if (!supabase) {
      return;
    }

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("sort_order", { ascending: true, nullsFirst: false })
      .order("name", { ascending: true });

    if (error) {
      setStatus(error.message);
      return;
    }

    setProducts((data as ProductRow[]).map(productFromRow));
  }

  async function signIn() {
    if (!supabase) {
      return;
    }

    setStatus("Sending sign-in link...");
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`,
      },
    });

    setStatus(
      error ? error.message : `Check ${email} for the Supabase sign-in link.`
    );
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setProducts([]);
    setForm(emptyForm);
  }

  async function saveProduct() {
    if (!supabase) {
      return;
    }

    const nextProduct = productFromForm(form);

    if (!nextProduct.name || !nextProduct.price || !nextProduct.image) {
      setStatus("Name, price, and image are required.");
      return;
    }

    setSaving(true);
    const { error } = await supabase
      .from("products")
      .upsert(rowFromProduct(nextProduct, products.length + 1));

    setSaving(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(`Saved ${nextProduct.name}.`);
    setForm(emptyForm);
    await loadProducts();
  }

  async function deleteProduct(product: Product) {
    if (!supabase || !confirm(`Delete ${product.name}?`)) {
      return;
    }

    const { error } = await supabase.from("products").delete().eq("id", product.id);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus(`Deleted ${product.name}.`);
    if (form.id === product.id) {
      setForm(emptyForm);
    }
    await loadProducts();
  }

  async function importSampleInventory() {
    if (!supabase) {
      return;
    }

    setSaving(true);
    const rows = sampleProducts.map((product, index) =>
      rowFromProduct(product, index + 1)
    );
    const { error } = await supabase.from("products").upsert(rows);
    setSaving(false);

    if (error) {
      setStatus(error.message);
      return;
    }

    setStatus("Imported the bundled inventory into Supabase.");
    await loadProducts();
  }

  if (!isSupabaseConfigured()) {
    return (
      <main className="min-h-screen bg-background px-4 py-10">
        <div className="mx-auto max-w-2xl rounded-lg border border-border bg-card p-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" />
            Storefront
          </Link>
          <h1 className="mt-6 font-serif text-3xl font-bold">Admin setup required</h1>
          <p className="mt-3 text-muted-foreground">
            Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
            to `.env.local`, then run the SQL in `supabase/schema.sql` in your
            Supabase project.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
              Storefront
            </Link>
            <h1 className="mt-3 font-serif text-3xl font-bold">Inventory Admin</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              RBAC admin access is limited to {ADMIN_EMAIL}.
            </p>
          </div>
          {user && (
            <Button variant="outline" onClick={signOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </Button>
          )}
        </div>

        {status && (
          <div className="mb-6 rounded-lg border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            {status}
          </div>
        )}

        {loading ? (
          <div className="rounded-lg border border-border bg-card p-6 text-muted-foreground">
            Loading admin session...
          </div>
        ) : !user ? (
          <section className="max-w-md rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-2xl font-semibold">Sign in</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Supabase will email a magic link. Only {ADMIN_EMAIL} can change
              inventory.
            </p>
            <div className="mt-5 space-y-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <Button className="w-full" onClick={signIn}>
                Send sign-in link
              </Button>
            </div>
          </section>
        ) : !isAdmin ? (
          <section className="rounded-lg border border-border bg-card p-6">
            <h2 className="font-serif text-2xl font-semibold">Access denied</h2>
            <p className="mt-2 text-muted-foreground">
              You are signed in as {user.email}. Inventory management is
              restricted to {ADMIN_EMAIL}.
            </p>
          </section>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
            <section className="rounded-lg border border-border bg-card">
              <div className="flex items-center justify-between gap-3 border-b border-border p-4">
                <div>
                  <h2 className="font-serif text-xl font-semibold">Store items</h2>
                  <p className="text-sm text-muted-foreground">
                    {products.length} items in Supabase
                  </p>
                </div>
                <Button variant="outline" onClick={importSampleInventory} disabled={saving}>
                  <Plus className="mr-2 h-4 w-4" />
                  Import samples
                </Button>
              </div>
              <div className="divide-y divide-border">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="truncate font-medium">{product.name}</h3>
                        {product.isFeatured && <Badge variant="secondary">Featured</Badge>}
                        {product.isNew && <Badge>New</Badge>}
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.category} · {product.era} · ${product.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={() => setForm(formFromProduct(product))}>
                        Edit
                      </Button>
                      <Button variant="outline" size="icon" aria-label={`Delete ${product.name}`} onClick={() => deleteProduct(product)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {products.length === 0 && (
                  <div className="p-8 text-center text-sm text-muted-foreground">
                    No Supabase items yet. Import samples or create the first item.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-border bg-card p-4">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="font-serif text-xl font-semibold">
                  {form.id ? "Edit item" : "New item"}
                </h2>
                <Button variant="ghost" onClick={() => setForm(emptyForm)}>
                  Clear
                </Button>
              </div>

              <div className="space-y-4">
                <Field label="Name">
                  <Input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Price">
                    <Input type="number" min="0" value={form.price} onChange={(event) => setForm({ ...form, price: event.target.value })} />
                  </Field>
                  <Field label="Original price">
                    <Input type="number" min="0" value={form.originalPrice} onChange={(event) => setForm({ ...form, originalPrice: event.target.value })} />
                  </Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Category">
                    <Input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
                  </Field>
                  <Field label="Era">
                    <Input value={form.era} onChange={(event) => setForm({ ...form, era: event.target.value })} />
                  </Field>
                </div>
                <Field label="Condition">
                  <Input value={form.condition} onChange={(event) => setForm({ ...form, condition: event.target.value })} />
                </Field>
                <Field label="Primary image path">
                  <Input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} />
                </Field>
                <Field label="All image paths">
                  <Textarea value={form.images} onChange={(event) => setForm({ ...form, images: event.target.value })} />
                </Field>
                <Field label="Description">
                  <Textarea className="min-h-28" value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} />
                </Field>
                <Field label="Dimensions">
                  <Input value={form.dimensions} onChange={(event) => setForm({ ...form, dimensions: event.target.value })} />
                </Field>
                <div className="flex gap-5">
                  <CheckField
                    label="New arrival"
                    checked={form.isNew}
                    onCheckedChange={(checked) => setForm({ ...form, isNew: Boolean(checked) })}
                  />
                  <CheckField
                    label="Featured"
                    checked={form.isFeatured}
                    onCheckedChange={(checked) => setForm({ ...form, isFeatured: Boolean(checked) })}
                  />
                </div>
                <Button className="w-full" onClick={saveProduct} disabled={saving}>
                  <Save className="mr-2 h-4 w-4" />
                  {saving ? "Saving..." : "Save item"}
                </Button>
              </div>
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function CheckField({
  label,
  checked,
  onCheckedChange,
}: {
  label: string;
  checked: boolean;
  onCheckedChange: (checked: boolean | "indeterminate") => void;
}) {
  return (
    <Label className="flex items-center gap-2">
      <Checkbox checked={checked} onCheckedChange={onCheckedChange} />
      {label}
    </Label>
  );
}
