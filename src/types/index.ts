// ============================================================
// QRisto — Type Definitions
// ============================================================

export type Plan = 'starter' | 'elite';
export type Language = 'pt' | 'en' | 'it' | 'fr' | 'de' | 'es';
export type MenuType = 'a_la_carte' | 'fixed' | 'special';
export type UserRole = 'restaurant' | 'admin';

// ──────────────────────────────────────
// Restaurant
// ──────────────────────────────────────
export interface Restaurant {
  id: string;
  userId: string;
  name: string;
  slug: string;
  logo?: string;
  bannerImages?: string[];
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  layout: 'minimal' | 'modern';
  plan: Plan;
  planStatus: 'active' | 'inactive' | 'trialing' | 'canceled';
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  country: string;
  city?: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  email?: string;
  website?: string;
  createdAt: string;
  updatedAt: string;
  branches?: Branch[];
}

// ──────────────────────────────────────
// Branch (Filial)
// ──────────────────────────────────────
export interface Branch {
  id: string;
  restaurantId: string;
  name: string;
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  customPrices: boolean;
  regionalLanguage?: Language;
  isActive: boolean;
  qrCodeId?: string;
  createdAt: string;
}

// ──────────────────────────────────────
// Menu
// ──────────────────────────────────────
export interface Menu {
  id: string;
  restaurantId: string;
  branchId?: string;
  type: MenuType;
  name: string;
  isActive: boolean;
  availableFrom?: string;
  availableTo?: string;
  sortOrder: number;
  categories: Category[];
  createdAt: string;
}

// ──────────────────────────────────────
// Category
// ──────────────────────────────────────
export interface Category {
  id: string;
  menuId: string;
  name: string;
  nameTranslations?: Record<Language, string>;
  emoji?: string;
  sortOrder: number;
  isActive: boolean;
  items: MenuItem[];
}

// ──────────────────────────────────────
// Menu Item
// ──────────────────────────────────────
export interface MenuItem {
  id: string;
  categoryId: string;
  menuId: string;
  restaurantId: string;
  name: string;
  nameTranslations: Partial<Record<Language, string>>;
  description: string;
  descriptionTranslations: Partial<Record<Language, string>>;
  basePrice: number;
  branchPrices?: Record<string, number>;
  currency: string;
  imageUrl?: string;
  youtubeUrl?: string;
  tags: string[];
  available: boolean;
  featured: boolean;
  sortOrder: number;
  viewCount?: number;
  createdAt: string;
}

// ──────────────────────────────────────
// QR Code
// ──────────────────────────────────────
export interface QRCode {
  id: string;
  restaurantId: string;
  branchId?: string;
  url: string;
  foregroundColor: string;
  backgroundColor: string;
  logoUrl?: string;
  frameStyle: 'none' | 'simple' | 'rounded' | 'fancy';
  frameText?: string;
  totalScans: number;
  createdAt: string;
}

// ──────────────────────────────────────
// Analytics
// ──────────────────────────────────────
export interface AnalyticsEvent {
  id: string;
  restaurantId: string;
  branchId?: string;
  menuItemId?: string;
  categoryId?: string;
  eventType: 'menu_view' | 'item_view' | 'qr_scan' | 'language_change';
  language?: Language;
  timestamp: string;
  metadata?: Record<string, unknown>;
}

export interface DashboardStats {
  totalViews: number;
  totalQrScans: number;
  activeItems: number;
  topItems: TopItem[];
  viewsOverTime: ViewsDataPoint[];
  viewsByCategory: CategoryStat[];
}

export interface TopItem {
  id: string;
  name: string;
  views: number;
  category: string;
}

export interface ViewsDataPoint {
  date: string;
  views: number;
  scans: number;
}

export interface CategoryStat {
  name: string;
  views: number;
  percentage: number;
}

// ──────────────────────────────────────
// User
// ──────────────────────────────────────
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  restaurantId?: string;
  restaurant?: Restaurant;
  createdAt: string;
}

// ──────────────────────────────────────
// Pricing
// ──────────────────────────────────────
export interface PricingPlan {
  id: Plan;
  name: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

// ──────────────────────────────────────
// Admin
// ──────────────────────────────────────
export interface AdminRestaurantView extends Restaurant {
  totalQrScans: number;
  lastActivityAt: string;
  mrr: number;
}

export interface AdminStats {
  totalRestaurants: number;
  activeRestaurants: number;
  starterCount: number;
  eliteCount: number;
  totalMrr: number;
  totalQrScans: number;
  revenueOverTime: Array<{ month: string; revenue: number }>;
}
