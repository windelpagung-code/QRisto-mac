import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Client-side Supabase client (anon key)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (service role — use only in API routes)
export function createServerSupabaseClient() {
  return createClient(
    supabaseUrl,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// ──────────────────────────────────────
// Supabase Schema SQL (run in Supabase SQL editor)
// ──────────────────────────────────────
export const SCHEMA_SQL = `
-- Enable UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Restaurants
CREATE TABLE restaurants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  logo TEXT,
  banner_images TEXT[],
  primary_color TEXT DEFAULT '#22c55e',
  accent_color TEXT DEFAULT '#f97316',
  font_family TEXT DEFAULT 'Inter',
  layout TEXT DEFAULT 'modern' CHECK (layout IN ('modern', 'minimal')),
  plan TEXT DEFAULT 'starter' CHECK (plan IN ('starter', 'elite')),
  plan_status TEXT DEFAULT 'trialing' CHECK (plan_status IN ('active', 'inactive', 'trialing', 'canceled')),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  country TEXT,
  city TEXT,
  address TEXT,
  latitude FLOAT,
  longitude FLOAT,
  phone TEXT,
  email TEXT,
  website TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Branches
CREATE TABLE branches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  address TEXT,
  city TEXT,
  country TEXT,
  latitude FLOAT,
  longitude FLOAT,
  phone TEXT,
  custom_prices BOOLEAN DEFAULT FALSE,
  regional_language TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Menus
CREATE TABLE menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  type TEXT DEFAULT 'a_la_carte' CHECK (type IN ('a_la_carte', 'fixed', 'special')),
  name TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  available_from TEXT,
  available_to TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Categories
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_translations JSONB DEFAULT '{}',
  emoji TEXT,
  sort_order INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- Menu Items
CREATE TABLE menu_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  menu_id UUID REFERENCES menus(id) ON DELETE CASCADE,
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  name_translations JSONB DEFAULT '{}',
  description TEXT,
  description_translations JSONB DEFAULT '{}',
  base_price FLOAT NOT NULL DEFAULT 0,
  branch_prices JSONB DEFAULT '{}',
  currency TEXT DEFAULT 'EUR',
  image_url TEXT,
  youtube_url TEXT,
  tags TEXT[] DEFAULT '{}',
  available BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  sort_order INT DEFAULT 0,
  view_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- QR Codes
CREATE TABLE qr_codes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  url TEXT NOT NULL,
  foreground_color TEXT DEFAULT '#0f172a',
  background_color TEXT DEFAULT '#ffffff',
  logo_url TEXT,
  frame_style TEXT DEFAULT 'none',
  frame_text TEXT,
  total_scans INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Analytics Events
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  restaurant_id UUID REFERENCES restaurants(id) ON DELETE CASCADE,
  branch_id UUID REFERENCES branches(id) ON DELETE SET NULL,
  menu_item_id UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  event_type TEXT CHECK (event_type IN ('menu_view', 'item_view', 'qr_scan', 'language_change')),
  language TEXT,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

-- RLS Policies (restaurante vê apenas os seus dados)
CREATE POLICY "restaurant_own" ON restaurants FOR ALL USING (user_id = auth.uid());
CREATE POLICY "branch_own" ON branches FOR ALL USING (
  restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid())
);
CREATE POLICY "menu_own" ON menus FOR ALL USING (
  restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid())
);
CREATE POLICY "category_own" ON categories FOR ALL USING (
  menu_id IN (SELECT id FROM menus WHERE restaurant_id IN (
    SELECT id FROM restaurants WHERE user_id = auth.uid()
  ))
);
CREATE POLICY "item_own" ON menu_items FOR ALL USING (
  restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid())
);
CREATE POLICY "qr_own" ON qr_codes FOR ALL USING (
  restaurant_id IN (SELECT id FROM restaurants WHERE user_id = auth.uid())
);

-- Public read for menu pages
CREATE POLICY "menu_public_read" ON menus FOR SELECT USING (is_active = TRUE);
CREATE POLICY "category_public_read" ON categories FOR SELECT USING (is_active = TRUE);
CREATE POLICY "item_public_read" ON menu_items FOR SELECT USING (available = TRUE);
`;
