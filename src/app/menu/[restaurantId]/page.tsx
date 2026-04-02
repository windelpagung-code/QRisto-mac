'use client';
import { useState, useEffect } from 'react';
import { Globe, Star, Search, ChevronUp, Info, Play } from 'lucide-react';
import { mockMenus, mockRestaurant } from '@/lib/mock-data';
import { TAGS_CONFIG, LANGUAGES, formatCurrency } from '@/lib/utils';
import type { Language, MenuItem, Category } from '@/types';

const AVAILABLE_TAGS = Object.keys(TAGS_CONFIG) as Array<keyof typeof TAGS_CONFIG>;

function ItemCard({ item, primaryColor, language }: { item: MenuItem; primaryColor: string; language: Language }) {
  const [expanded, setExpanded] = useState(false);
  const displayName = item.nameTranslations[language] || item.name;
  const displayDesc = item.descriptionTranslations[language] || item.description;

  return (
    <div
      className={`bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all overflow-hidden ${!item.available ? 'opacity-60' : ''}`}
    >
      <div className="flex gap-4 p-4">
        {/* Thumbnail */}
        <div className="w-20 h-20 rounded-xl bg-gray-100 flex items-center justify-center text-3xl flex-shrink-0 overflow-hidden">
          {item.imageUrl ? (
            <img src={item.imageUrl} alt={displayName} className="w-full h-full object-cover" />
          ) : (
            '🍽️'
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1">
            <h3 className="font-semibold text-gray-900 text-sm flex-1">{displayName}</h3>
            {item.featured && (
              <span className="flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-full bg-yellow-50 text-yellow-600 border border-yellow-200 flex-shrink-0">
                <Star size={10} className="fill-yellow-500" />
                Top
              </span>
            )}
          </div>

          <p className="text-xs text-gray-500 line-clamp-2 mb-2">{displayDesc}</p>

          <div className="flex flex-wrap gap-1 mb-2">
            {item.tags.map(tag => {
              const config = TAGS_CONFIG[tag as keyof typeof TAGS_CONFIG];
              if (!config) return null;
              return (
                <span key={tag} className={`text-xs px-1.5 py-0.5 rounded-full border ${config.color}`}>
                  {config.emoji} {config.label}
                </span>
              );
            })}
            {!item.available && (
              <span className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-400 border border-gray-200">
                Indisponível
              </span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <span className="text-base font-bold" style={{ color: primaryColor }}>
              {formatCurrency(item.basePrice)}
            </span>
            <div className="flex gap-1">
              {item.youtubeUrl && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="flex items-center gap-1 text-xs px-2 py-1 rounded-lg bg-red-50 text-red-500 border border-red-200 hover:bg-red-100 transition-colors"
                >
                  <Play size={11} />
                  Vídeo
                </button>
              )}
              {displayDesc.length > 60 && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-xs px-2 py-1 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 transition-colors"
                >
                  <Info size={11} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Expanded: YouTube */}
      {expanded && item.youtubeUrl && (
        <div className="px-4 pb-4">
          <div className="aspect-video rounded-xl overflow-hidden bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${item.youtubeUrl.split('v=')[1]}`}
              className="w-full h-full"
              allowFullScreen
              title={displayName}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function CategorySection({ category, primaryColor, language }: { category: Category; primaryColor: string; language: Language }) {
  const visibleItems = category.items.filter(item => item.available || true); // show all for demo

  return (
    <section id={`cat-${category.id}`} className="mb-8">
      <div className="flex items-center gap-2 mb-4 px-4 sm:px-0">
        <span className="text-2xl">{category.emoji}</span>
        <h2 className="text-lg font-bold text-gray-900">{category.name}</h2>
        <span className="text-sm text-gray-400">({visibleItems.length})</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 px-4 sm:px-0">
        {visibleItems.map(item => (
          <ItemCard key={item.id} item={item} primaryColor={primaryColor} language={language} />
        ))}
      </div>
    </section>
  );
}

export default function PublicMenuPage() {
  const [language, setLanguage] = useState<Language>('pt');
  const [showLanguages, setShowLanguages] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const restaurant = mockRestaurant;
  const menu = mockMenus[0];
  const primaryColor = restaurant.primaryColor || '#22c55e';

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter items based on search and tag
  const filteredCategories = menu.categories.map(cat => ({
    ...cat,
    items: cat.items.filter(item => {
      const name = (item.nameTranslations[language] || item.name).toLowerCase();
      const matchesSearch = !search || name.includes(search.toLowerCase());
      const matchesTag = !activeTag || item.tags.includes(activeTag);
      return matchesSearch && matchesTag;
    }),
  })).filter(cat => cat.items.length > 0);

  const currentLang = LANGUAGES.find(l => l.code === language);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b border-gray-100 shadow-sm">
        <div className="max-w-2xl mx-auto">
          {/* Restaurant info */}
          <div className="flex items-center gap-3 px-4 py-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-xl flex-shrink-0"
              style={{ background: primaryColor }}
            >
              🍕
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-gray-900 truncate">{restaurant.name}</h1>
              <p className="text-xs text-gray-500">{restaurant.city} · Aberto agora</p>
            </div>

            {/* Language switcher */}
            <div className="relative">
              <button
                onClick={() => setShowLanguages(!showLanguages)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-colors"
              >
                <Globe size={14} />
                {currentLang?.flag} {language.toUpperCase()}
              </button>

              {showLanguages && (
                <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-2xl shadow-xl p-2 min-w-[160px] z-50">
                  {LANGUAGES.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as Language); setShowLanguages(false); }}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-colors ${
                        language === lang.code ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'
                      }`}
                      style={{ color: language === lang.code ? primaryColor : undefined }}
                    >
                      {lang.flag} {lang.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Search */}
          <div className="px-4 pb-2">
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Pesquisar no menu..."
                className="w-full bg-gray-100 border border-transparent rounded-xl pl-9 pr-4 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-green-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Tag filters */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTag(null)}
              className={`flex-shrink-0 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                !activeTag ? 'text-white border-transparent' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
              }`}
              style={!activeTag ? { background: primaryColor, borderColor: primaryColor } : {}}
            >
              Todos
            </button>
            {AVAILABLE_TAGS.map(tag => {
              const config = TAGS_CONFIG[tag];
              return (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={`flex-shrink-0 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                    activeTag === tag ? config.color : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300'
                  }`}
                >
                  {config.emoji} {config.label}
                </button>
              );
            })}
          </div>

          {/* Category nav */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto border-t border-gray-100 pt-2">
            {menu.categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  const el = document.getElementById(`cat-${cat.id}`);
                  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setActiveCategory(cat.id);
                }}
                className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeCategory === cat.id ? 'text-white' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-300'
                }`}
                style={activeCategory === cat.id ? { background: primaryColor } : {}}
              >
                {cat.emoji} {cat.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Menu content */}
      <main className="max-w-2xl mx-auto py-6">
        {filteredCategories.length === 0 ? (
          <div className="text-center py-16 px-4">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-500">Nenhum item encontrado</p>
          </div>
        ) : (
          filteredCategories.map(cat => (
            <CategorySection key={cat.id} category={cat} primaryColor={primaryColor} language={language} />
          ))
        )}

        {/* Footer */}
        <div className="text-center py-8 px-4">
          <p className="text-xs text-gray-400">
            Menu digital por{' '}
            <span className="font-semibold" style={{ color: primaryColor }}>QRisto</span>
          </p>
        </div>
      </main>

      {/* Scroll to top */}
      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 w-10 h-10 rounded-full text-white shadow-lg flex items-center justify-center transition-all"
          style={{ background: primaryColor }}
        >
          <ChevronUp size={18} />
        </button>
      )}
    </div>
  );
}
