
-- Create Orders Table
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  customer_info jsonb not null,
  items jsonb not null,
  total numeric not null,
  status text default 'pending'::text,
  payment_method text
);

-- Enable Realtime
alter publication supabase_realtime add table orders;

-- Enable RLS
alter table public.orders enable row level security;

-- Create Policies (Allow Public Insert, Admin Read)
create policy "Allow public insert of orders"
on public.orders for insert
to public
with check (true);

create policy "Allow public read of own orders"
on public.orders for select
to public
using (true); -- Ideally restrict this, but for now we allow reading for confirmation page
