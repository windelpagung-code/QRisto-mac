import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = 'EUR', locale = 'pt-PT'): string {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}

export function formatDate(dateString: string, locale = 'pt-PT'): string {
  return new Intl.DateTimeFormat(locale, { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(dateString));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase();
}

export function slugify(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const TAGS_CONFIG = {
  vegan: { label: 'Vegano', color: 'bg-green-500/20 text-green-400 border-green-500/30', emoji: '🌱' },
  vegetarian: { label: 'Vegetariano', color: 'bg-lime-500/20 text-lime-400 border-lime-500/30', emoji: '🥦' },
  'gluten-free': { label: 'Sem Glúten', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', emoji: '🌾' },
  spicy: { label: 'Picante', color: 'bg-red-500/20 text-red-400 border-red-500/30', emoji: '🌶️' },
  bestseller: { label: 'Mais Vendido', color: 'bg-orange-500/20 text-orange-400 border-orange-500/30', emoji: '⭐' },
  new: { label: 'Novidade', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', emoji: '✨' },
} as const;

export const LANGUAGES = [
  { code: 'pt', label: 'Português', flag: '🇵🇹' },
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'it', label: 'Italiano', flag: '🇮🇹' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
] as const;

export const COUNTRIES = [
  { code: 'IT', label: 'Itália', flag: '🇮🇹' },
  { code: 'FR', label: 'França', flag: '🇫🇷' },
  { code: 'DE', label: 'Alemanha', flag: '🇩🇪' },
  { code: 'ES', label: 'Espanha', flag: '🇪🇸' },
  { code: 'PT', label: 'Portugal', flag: '🇵🇹' },
  { code: 'GB', label: 'Reino Unido', flag: '🇬🇧' },
  { code: 'NL', label: 'Países Baixos', flag: '🇳🇱' },
  { code: 'BE', label: 'Bélgica', flag: '🇧🇪' },
  { code: 'CH', label: 'Suíça', flag: '🇨🇭' },
  { code: 'AT', label: 'Áustria', flag: '🇦🇹' },
];
