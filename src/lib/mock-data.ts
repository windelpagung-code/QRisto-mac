import type {
  Restaurant, Menu, Category, MenuItem, DashboardStats,
  AdminStats, AdminRestaurantView, QRCode, Branch, PricingPlan
} from '@/types';

// ──────────────────────────────────────
// Mock Restaurant
// ──────────────────────────────────────
export const mockRestaurant: Restaurant = {
  id: 'rest-001',
  userId: 'user-001',
  name: 'La Bella Italia',
  slug: 'la-bella-italia',
  logo: '',
  bannerImages: [],
  primaryColor: '#22c55e',
  accentColor: '#f97316',
  fontFamily: 'Inter',
  layout: 'modern',
  plan: 'elite',
  planStatus: 'active',
  country: 'IT',
  city: 'Milano',
  address: 'Via Roma 42, Milano',
  phone: '+39 02 1234567',
  email: 'info@labellaitaliaristorante.it',
  website: 'https://labellaitaliaristorante.it',
  createdAt: '2024-01-15T10:00:00Z',
  updatedAt: '2024-03-01T10:00:00Z',
};

// ──────────────────────────────────────
// Mock Branches
// ──────────────────────────────────────
export const mockBranches: Branch[] = [
  {
    id: 'branch-001',
    restaurantId: 'rest-001',
    name: 'Sede Milano Centro',
    address: 'Via Roma 42',
    city: 'Milano',
    country: 'IT',
    latitude: 45.4654219,
    longitude: 9.1859243,
    phone: '+39 02 1234567',
    customPrices: false,
    regionalLanguage: 'it',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'branch-002',
    restaurantId: 'rest-001',
    name: 'Filiale Roma Trastevere',
    address: 'Via Trastevere 15',
    city: 'Roma',
    country: 'IT',
    latitude: 41.889938,
    longitude: 12.468697,
    phone: '+39 06 9876543',
    customPrices: true,
    regionalLanguage: 'it',
    isActive: true,
    createdAt: '2024-02-01T10:00:00Z',
  },
];

// ──────────────────────────────────────
// Mock Menu Items
// ──────────────────────────────────────
const antipastiItems: MenuItem[] = [
  {
    id: 'item-001',
    categoryId: 'cat-001',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Bruschetta al Pomodoro',
    nameTranslations: { en: 'Tomato Bruschetta', fr: 'Bruschetta à la Tomate', de: 'Tomaten Bruschetta', es: 'Bruschetta de Tomate', pt: 'Bruschetta de Tomate' },
    description: 'Pão italiano tostado com tomate fresco, manjericão e azeite extra virgem',
    descriptionTranslations: { en: 'Toasted Italian bread with fresh tomatoes, basil and extra virgin olive oil' },
    basePrice: 7.50,
    currency: 'EUR',
    tags: ['vegan', 'vegetarian'],
    available: true,
    featured: true,
    sortOrder: 1,
    viewCount: 342,
    imageUrl: '',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-002',
    categoryId: 'cat-001',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Carpaccio di Manzo',
    nameTranslations: { en: 'Beef Carpaccio', fr: 'Carpaccio de Bœuf', de: 'Rindercarpaccio', es: 'Carpaccio de Res', pt: 'Carpaccio de Boi' },
    description: 'Fatias finas de carne bovina crua com rúcula, parmesão e limão',
    descriptionTranslations: { en: 'Thin slices of raw beef with arugula, parmesan and lemon' },
    basePrice: 14.00,
    currency: 'EUR',
    tags: ['gluten-free'],
    available: true,
    featured: false,
    sortOrder: 2,
    viewCount: 218,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-003',
    categoryId: 'cat-001',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Burrata con Prosciutto',
    nameTranslations: { en: 'Burrata with Prosciutto', fr: 'Burrata au Prosciutto', pt: 'Burrata com Presunto' },
    description: 'Burrata fresca com prosciutto di Parma e rúcula selvagem',
    descriptionTranslations: { en: 'Fresh burrata with Parma prosciutto and wild arugula' },
    basePrice: 16.00,
    currency: 'EUR',
    tags: ['gluten-free'],
    available: true,
    featured: true,
    sortOrder: 3,
    viewCount: 456,
    createdAt: '2024-01-15T10:00:00Z',
  },
];

const pizzaItems: MenuItem[] = [
  {
    id: 'item-010',
    categoryId: 'cat-002',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Margherita DOP',
    nameTranslations: { en: 'Margherita DOP', fr: 'Margherita DOP', de: 'Margherita DOP', pt: 'Margherita DOP' },
    description: 'Molho de tomate San Marzano, mozzarella di bufala DOP, manjericão fresco',
    descriptionTranslations: { en: 'San Marzano tomato sauce, DOP buffalo mozzarella, fresh basil' },
    basePrice: 12.00,
    currency: 'EUR',
    tags: ['vegetarian', 'bestseller'],
    available: true,
    featured: true,
    sortOrder: 1,
    viewCount: 892,
    youtubeUrl: '',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-011',
    categoryId: 'cat-002',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Diavola',
    nameTranslations: { en: 'Diavola', fr: 'Diavola', de: 'Diavola', pt: 'Diavola' },
    description: 'Molho de tomate, mozzarella, salame picante calabrese, pimenta',
    descriptionTranslations: { en: 'Tomato sauce, mozzarella, spicy Calabrian salami, chili' },
    basePrice: 14.00,
    currency: 'EUR',
    tags: ['spicy', 'bestseller'],
    available: true,
    featured: false,
    sortOrder: 2,
    viewCount: 645,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-012',
    categoryId: 'cat-002',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Quattro Formaggi',
    nameTranslations: { en: 'Four Cheese', fr: 'Quatre Fromages', de: 'Vier Käse', pt: 'Quatro Queijos' },
    description: 'Mozzarella, gorgonzola, parmesão e pecorino sobre base bianca',
    descriptionTranslations: { en: 'Mozzarella, gorgonzola, parmesan and pecorino on white base' },
    basePrice: 15.00,
    currency: 'EUR',
    tags: ['vegetarian'],
    available: true,
    featured: false,
    sortOrder: 3,
    viewCount: 432,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-013',
    categoryId: 'cat-002',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Vegana della Casa',
    nameTranslations: { en: 'House Vegan Pizza', fr: 'Pizza Végane Maison', pt: 'Pizza Vegana da Casa' },
    description: 'Base de tomate, legumes grelhados, rúcula, tomate seco e azeite',
    descriptionTranslations: { en: 'Tomato base, grilled vegetables, arugula, dried tomatoes and olive oil' },
    basePrice: 13.00,
    currency: 'EUR',
    tags: ['vegan', 'vegetarian', 'gluten-free'],
    available: true,
    featured: false,
    sortOrder: 4,
    viewCount: 213,
    createdAt: '2024-01-15T10:00:00Z',
  },
];

const pastaItems: MenuItem[] = [
  {
    id: 'item-020',
    categoryId: 'cat-003',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Spaghetti Carbonara',
    nameTranslations: { en: 'Spaghetti Carbonara', fr: 'Spaghetti Carbonara', de: 'Spaghetti Carbonara', pt: 'Espaguete Carbonara' },
    description: 'Spaghetti com guanciale, ovos, pecorino romano e pimenta preta',
    descriptionTranslations: { en: 'Spaghetti with guanciale, eggs, pecorino romano and black pepper' },
    basePrice: 16.00,
    currency: 'EUR',
    tags: ['bestseller'],
    available: true,
    featured: true,
    sortOrder: 1,
    viewCount: 723,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-021',
    categoryId: 'cat-003',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Penne all\'Arrabbiata',
    nameTranslations: { en: 'Penne Arrabbiata', fr: 'Penne à l\'Arrabbiata', de: 'Penne Arrabbiata', pt: 'Penne Arrabbiata' },
    description: 'Penne com molho de tomate picante, alho e manjericão',
    descriptionTranslations: { en: 'Penne with spicy tomato sauce, garlic and basil' },
    basePrice: 13.00,
    currency: 'EUR',
    tags: ['vegan', 'spicy'],
    available: true,
    featured: false,
    sortOrder: 2,
    viewCount: 389,
    createdAt: '2024-01-15T10:00:00Z',
  },
];

const bebidasItems: MenuItem[] = [
  {
    id: 'item-030',
    categoryId: 'cat-004',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Água Mineral',
    nameTranslations: { en: 'Mineral Water', fr: 'Eau Minérale', de: 'Mineralwasser', es: 'Agua Mineral', pt: 'Água Mineral' },
    description: 'Água mineral italiana natural ou com gás (750ml)',
    descriptionTranslations: { en: 'Italian mineral water still or sparkling (750ml)' },
    basePrice: 3.00,
    currency: 'EUR',
    tags: ['vegan', 'gluten-free'],
    available: true,
    featured: false,
    sortOrder: 1,
    viewCount: 156,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-031',
    categoryId: 'cat-004',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Vinho da Casa',
    nameTranslations: { en: 'House Wine', fr: 'Vin de la Maison', de: 'Hauswein', es: 'Vino de la Casa', pt: 'Vinho da Casa' },
    description: 'Vinho tinto ou branco selecionado (taça / garrafa)',
    descriptionTranslations: { en: 'Selected red or white wine (glass / bottle)' },
    basePrice: 6.00,
    currency: 'EUR',
    tags: ['gluten-free'],
    available: true,
    featured: false,
    sortOrder: 2,
    viewCount: 201,
    createdAt: '2024-01-15T10:00:00Z',
  },
];

const sobremesasItems: MenuItem[] = [
  {
    id: 'item-040',
    categoryId: 'cat-005',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Tiramisù della Casa',
    nameTranslations: { en: 'House Tiramisù', fr: 'Tiramisu de la Maison', de: 'Hausgemachtes Tiramisu', pt: 'Tiramisu da Casa' },
    description: 'Clássico tiramisu italiano com mascarpone, espresso e cacau',
    descriptionTranslations: { en: 'Classic Italian tiramisù with mascarpone, espresso and cocoa' },
    basePrice: 7.50,
    currency: 'EUR',
    tags: ['bestseller'],
    available: true,
    featured: true,
    sortOrder: 1,
    viewCount: 534,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'item-041',
    categoryId: 'cat-005',
    menuId: 'menu-001',
    restaurantId: 'rest-001',
    name: 'Panna Cotta',
    nameTranslations: { en: 'Panna Cotta', fr: 'Panna Cotta', pt: 'Panna Cotta' },
    description: 'Creme italiano com calda de frutas vermelhas',
    descriptionTranslations: { en: 'Italian cream with red fruit syrup' },
    basePrice: 7.00,
    currency: 'EUR',
    tags: ['gluten-free', 'vegetarian'],
    available: true,
    featured: false,
    sortOrder: 2,
    viewCount: 287,
    createdAt: '2024-01-15T10:00:00Z',
  },
];

// ──────────────────────────────────────
// Mock Categories
// ──────────────────────────────────────
const mockCategories: Category[] = [
  { id: 'cat-001', menuId: 'menu-001', name: 'Antipasti', emoji: '🥗', sortOrder: 1, isActive: true, items: antipastiItems },
  { id: 'cat-002', menuId: 'menu-001', name: 'Pizze', emoji: '🍕', sortOrder: 2, isActive: true, items: pizzaItems },
  { id: 'cat-003', menuId: 'menu-001', name: 'Paste', emoji: '🍝', sortOrder: 3, isActive: true, items: pastaItems },
  { id: 'cat-004', menuId: 'menu-001', name: 'Bevande', emoji: '🍷', sortOrder: 4, isActive: true, items: bebidasItems },
  { id: 'cat-005', menuId: 'menu-001', name: 'Dolci', emoji: '🍮', sortOrder: 5, isActive: true, items: sobremesasItems },
];

// ──────────────────────────────────────
// Mock Menus
// ──────────────────────────────────────
export const mockMenus: Menu[] = [
  {
    id: 'menu-001',
    restaurantId: 'rest-001',
    type: 'a_la_carte',
    name: 'Menu Principal',
    isActive: true,
    sortOrder: 1,
    categories: mockCategories,
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'menu-002',
    restaurantId: 'rest-001',
    type: 'fixed',
    name: 'Pranzo Fisso',
    isActive: true,
    sortOrder: 2,
    availableFrom: '12:00',
    availableTo: '15:00',
    categories: [
      {
        id: 'cat-fix-001',
        menuId: 'menu-002',
        name: 'Prato do Dia',
        emoji: '🍽️',
        sortOrder: 1,
        isActive: true,
        items: [pastaItems[0], pizzaItems[0]],
      },
    ],
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: 'menu-003',
    restaurantId: 'rest-001',
    type: 'special',
    name: 'Menu San Valentino',
    isActive: false,
    sortOrder: 3,
    availableFrom: '2025-02-14',
    availableTo: '2025-02-14',
    categories: [],
    createdAt: '2024-01-15T10:00:00Z',
  },
];

// ──────────────────────────────────────
// Mock Dashboard Stats
// ──────────────────────────────────────
export const mockDashboardStats: DashboardStats = {
  totalViews: 12847,
  totalQrScans: 3421,
  activeItems: 24,
  topItems: [
    { id: 'item-010', name: 'Margherita DOP', views: 892, category: 'Pizze' },
    { id: 'item-020', name: 'Spaghetti Carbonara', views: 723, category: 'Paste' },
    { id: 'item-040', name: 'Tiramisù della Casa', views: 534, category: 'Dolci' },
    { id: 'item-003', name: 'Burrata con Prosciutto', views: 456, category: 'Antipasti' },
    { id: 'item-011', name: 'Diavola', views: 645, category: 'Pizze' },
  ],
  viewsOverTime: Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return {
      date: date.toISOString().split('T')[0],
      views: Math.floor(Math.random() * 600) + 200,
      scans: Math.floor(Math.random() * 150) + 50,
    };
  }),
  viewsByCategory: [
    { name: 'Pizze', views: 2182, percentage: 38 },
    { name: 'Paste', views: 1112, percentage: 19 },
    { name: 'Antipasti', views: 1016, percentage: 18 },
    { name: 'Dolci', views: 821, percentage: 14 },
    { name: 'Bevande', views: 357, percentage: 6 },
    { name: 'Outros', views: 287, percentage: 5 },
  ],
};

// ──────────────────────────────────────
// Mock QR Code
// ──────────────────────────────────────
export const mockQrCode: QRCode = {
  id: 'qr-001',
  restaurantId: 'rest-001',
  url: 'https://qristo.app/menu/la-bella-italia',
  foregroundColor: '#0f172a',
  backgroundColor: '#ffffff',
  frameStyle: 'rounded',
  frameText: 'Escaneia o nosso menu!',
  totalScans: 3421,
  createdAt: '2024-01-15T10:00:00Z',
};

// ──────────────────────────────────────
// Mock Admin Stats
// ──────────────────────────────────────
export const mockAdminStats: AdminStats = {
  totalRestaurants: 87,
  activeRestaurants: 72,
  starterCount: 51,
  eliteCount: 36,
  totalMrr: 3981,
  totalQrScans: 284732,
  revenueOverTime: [
    { month: 'Set', revenue: 1200 },
    { month: 'Out', revenue: 1800 },
    { month: 'Nov', revenue: 2100 },
    { month: 'Dez', revenue: 2450 },
    { month: 'Jan', revenue: 3100 },
    { month: 'Fev', revenue: 3500 },
    { month: 'Mar', revenue: 3981 },
  ],
};

// ──────────────────────────────────────
// Mock Admin Restaurants
// ──────────────────────────────────────
export const mockAdminRestaurants: AdminRestaurantView[] = [
  {
    ...mockRestaurant,
    id: 'rest-001',
    name: 'La Bella Italia',
    city: 'Milano',
    country: 'IT',
    plan: 'elite',
    planStatus: 'active',
    totalQrScans: 3421,
    lastActivityAt: new Date().toISOString(),
    mrr: 39,
  },
  {
    ...mockRestaurant,
    id: 'rest-002',
    name: 'Le Petit Bistro',
    city: 'Paris',
    country: 'FR',
    plan: 'starter',
    planStatus: 'active',
    totalQrScans: 1230,
    lastActivityAt: new Date(Date.now() - 86400000).toISOString(),
    mrr: 19,
  },
  {
    ...mockRestaurant,
    id: 'rest-003',
    name: 'Tapas El Rincón',
    city: 'Barcelona',
    country: 'ES',
    plan: 'elite',
    planStatus: 'active',
    totalQrScans: 4890,
    lastActivityAt: new Date(Date.now() - 3600000).toISOString(),
    mrr: 39,
  },
  {
    ...mockRestaurant,
    id: 'rest-004',
    name: 'Das Münchner Biergarten',
    city: 'München',
    country: 'DE',
    plan: 'starter',
    planStatus: 'inactive',
    totalQrScans: 234,
    lastActivityAt: new Date(Date.now() - 2592000000).toISOString(),
    mrr: 0,
  },
  {
    ...mockRestaurant,
    id: 'rest-005',
    name: 'Osteria del Porto',
    city: 'Napoli',
    country: 'IT',
    plan: 'elite',
    planStatus: 'trialing',
    totalQrScans: 765,
    lastActivityAt: new Date(Date.now() - 7200000).toISOString(),
    mrr: 39,
  },
];

// ──────────────────────────────────────
// Pricing Plans
// ──────────────────────────────────────
export const pricingPlans: PricingPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 19,
    yearlyPrice: 190,
    features: [
      '1 restaurante',
      '1 menu ativo',
      'Menu à la carte',
      'QR Code básico',
      'Multi-idioma (6 línguas)',
      'Personalização limitada',
      'Analytics básico',
      'Suporte por email',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    monthlyPrice: 39,
    yearlyPrice: 390,
    highlighted: true,
    badge: 'Mais Popular',
    features: [
      'Múltiplas filiais',
      'Menu fixo + à la carte + especial',
      'Vídeos YouTube nos pratos',
      'Banner rotativo',
      'Analytics avançado + mapa de calor',
      'Exportação CSV',
      'Personalização completa',
      'QR Code customizado',
      'Personalização via IA',
      'Integração de Fidelidade',
      'Preificação Dinâmica',
      'Suporte prioritário',
    ],
  },
];

// ──────────────────────────────────────
// All Menu Items (flat list for analytics)
// ──────────────────────────────────────
export const allMockItems: MenuItem[] = [
  ...antipastiItems, ...pizzaItems, ...pastaItems, ...bebidasItems, ...sobremesasItems,
];
