-- Create Messages Table
create table if not exists messages (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  email text not null,
  phone text,
  subject text,
  message text not null,
  read boolean default false
);

-- Create Subscribers Table
create table if not exists subscribers (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null
);

-- Enable Realtime for these tables
alter publication supabase_realtime add table messages;
alter publication supabase_realtime add table subscribers;
