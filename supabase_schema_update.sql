
-- Update orders table to allow manual string IDs
-- First we need to drop the default constraint and change type
alter table orders alter column id drop default;
alter table orders alter column id type text;
