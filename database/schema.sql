-- Users table
create table users (
  id serial primary key,
  username text unique not null,
  password text not null,
  role text check (role in ('farmer', 'agent', 'admin')) not null default 'farmer',
  email text unique not null
);

-- Devices table
create table devices (
  id serial primary key,
  name text not null,
  location text,
  user_id integer references users(id) on delete cascade
);

-- SensorReadings table
create table sensor_readings (
  id serial primary key,
  temperature float8,
  humidity float8,
  soil_moisture float8,
  timestamp timestamptz default now(),
  device_id integer references devices(id) on delete cascade
);

-- Alerts table
create table alerts (
  id serial primary key,
  type text not null,
  message text not null,
  triggered_at timestamptz default now(),
  device_id integer references devices(id) on delete cascade
);

-- profile table
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text check (role in ('farmer','agent','admin')) default 'farmer',
  phone text,
  region text
);