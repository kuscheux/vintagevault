create extension if not exists pgcrypto;

create table if not exists public.products (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  price numeric(10, 2) not null check (price >= 0),
  original_price numeric(10, 2) check (original_price is null or original_price >= 0),
  category text not null,
  image text not null,
  images text[] default '{}',
  description text not null,
  era text not null,
  condition text not null,
  dimensions text,
  is_new boolean not null default false,
  is_featured boolean not null default false,
  sort_order integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_touch_updated_at on public.products;
create trigger products_touch_updated_at
before update on public.products
for each row execute function public.touch_updated_at();

create or replace function public.is_store_admin()
returns boolean
language sql
stable
as $$
  select lower(coalesce(auth.jwt() ->> 'email', '')) = 'kmkusche@gmail.com';
$$;

alter table public.products enable row level security;

drop policy if exists "Products are publicly readable" on public.products;
create policy "Products are publicly readable"
on public.products for select
using (true);

drop policy if exists "Only store admins can insert products" on public.products;
create policy "Only store admins can insert products"
on public.products for insert
with check (public.is_store_admin());

drop policy if exists "Only store admins can update products" on public.products;
create policy "Only store admins can update products"
on public.products for update
using (public.is_store_admin())
with check (public.is_store_admin());

drop policy if exists "Only store admins can delete products" on public.products;
create policy "Only store admins can delete products"
on public.products for delete
using (public.is_store_admin());
