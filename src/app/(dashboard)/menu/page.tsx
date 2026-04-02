'use client';
import { useState } from 'react';
import { Plus, UtensilsCrossed, Clock, Star, Eye, EyeOff, Pencil, Trash2, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea } from '@/components/ui/Input';
import { Switch } from '@/components/ui/Switch';
import { mockMenus } from '@/lib/mock-data';
import type { Menu, MenuItem } from '@/types';
import Link from 'next/link';

const menuTypeLabels: Record<string, { label: string; color: 'primary' | 'accent' | 'premium'; icon: React.ReactNode }> = {
  a_la_carte: { label: 'À La Carte', color: 'primary', icon: <UtensilsCrossed size={12} /> },
  fixed: { label: 'Fixo do Dia', color: 'accent', icon: <Clock size={12} /> },
  special: { label: 'Especial', color: 'premium', icon: <Star size={12} /> },
};

function ItemModal({ open, onClose, item }: { open: boolean; onClose: () => void; item?: MenuItem }) {
  const [available, setAvailable] = useState(item?.available ?? true);
  const [featured, setFeatured] = useState(item?.featured ?? false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={item ? 'Editar Item' : 'Novo Item'}
      size="lg"
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>Salvar Item</Button>
        </div>
      }
    >
      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome (PT)" defaultValue={item?.name} placeholder="Ex: Margherita" />
          <Input label="Nome (EN)" defaultValue={item?.nameTranslations?.en} placeholder="Ex: Margherita Pizza" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Nome (IT)" defaultValue={item?.nameTranslations?.it} placeholder="Ex: Margherita" />
          <Input label="Nome (FR)" defaultValue={item?.nameTranslations?.fr} placeholder="Ex: Margherita" />
        </div>
        <Textarea label="Descrição" defaultValue={item?.description} placeholder="Descrição do prato..." rows={3} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Preço (€)" type="number" defaultValue={item?.basePrice} placeholder="0.00" step="0.50" />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1.5">Tags</label>
            <div className="flex flex-wrap gap-2">
              {['vegan', 'vegetarian', 'gluten-free', 'spicy', 'bestseller'].map(tag => (
                <button
                  key={tag}
                  type="button"
                  className={`px-2 py-1 rounded-lg text-xs border transition-colors ${
                    item?.tags?.includes(tag)
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
        <Input label="URL da Imagem" type="url" defaultValue={item?.imageUrl} placeholder="https://..." />
        <Input label="YouTube URL (vídeo do prato)" type="url" defaultValue={item?.youtubeUrl} placeholder="https://youtube.com/watch?v=..." />
        <div className="flex flex-col gap-4 p-4 rounded-xl bg-white/5 border border-white/8">
          <Switch checked={available} onChange={setAvailable} label="Disponível" description="Item visível e disponível no menu" />
          <Switch checked={featured} onChange={setFeatured} label="Prato em Destaque" description="Aparece com badge de recomendado" />
        </div>
      </div>
    </Modal>
  );
}

function CategorySection({ menu }: { menu: Menu }) {
  const [collapsed, setCollapsed] = useState(false);
  const [itemModal, setItemModal] = useState<{ open: boolean; item?: MenuItem }>({ open: false });

  const totalItems = menu.categories.reduce((sum, cat) => sum + cat.items.length, 0);

  return (
    <Card padding="none" className="overflow-hidden">
      <div
        className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/3 transition-colors"
        onClick={() => setCollapsed(!collapsed)}
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-white/5">
            {menuTypeLabels[menu.type]?.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-white">{menu.name}</h3>
              <Badge variant={menuTypeLabels[menu.type]?.color}>{menuTypeLabels[menu.type]?.label}</Badge>
              {!menu.isActive && <Badge variant="muted">Inativo</Badge>}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {menu.categories.length} categorias · {totalItems} itens
              {menu.availableFrom && ` · ${menu.availableFrom}–${menu.availableTo}`}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); }} leftIcon={<Pencil size={14} />}>
            Editar
          </Button>
          <ChevronRight size={16} className={`text-slate-400 transition-transform ${collapsed ? '' : 'rotate-90'}`} />
        </div>
      </div>

      {!collapsed && (
        <div className="border-t border-white/8">
          {menu.categories.map((cat) => (
            <div key={cat.id} className="border-b border-white/5 last:border-0">
              <div className="flex items-center justify-between px-4 py-3 bg-white/2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{cat.emoji}</span>
                  <span className="text-sm font-medium text-slate-200">{cat.name}</span>
                  <span className="text-xs text-slate-500">({cat.items.length})</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  leftIcon={<Plus size={13} />}
                  onClick={() => setItemModal({ open: true })}
                >
                  Adicionar
                </Button>
              </div>

              <div className="divide-y divide-white/5">
                {cat.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 px-4 py-3 hover:bg-white/3 transition-colors group">
                    <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0 text-lg">
                      {item.featured ? '⭐' : '🍽️'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-white">{item.name}</span>
                        {item.featured && <Badge variant="premium" size="sm">Destaque</Badge>}
                        {item.tags.slice(0, 2).map(tag => (
                          <Badge key={tag} variant="muted" size="sm">{tag}</Badge>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 truncate mt-0.5">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <span className="text-sm font-bold text-green-400">€{item.basePrice.toFixed(2)}</span>
                      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                          {item.available ? <Eye size={14} /> : <EyeOff size={14} />}
                        </button>
                        <button
                          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                          onClick={() => setItemModal({ open: true, item })}
                        >
                          <Pencil size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      <ItemModal
        open={itemModal.open}
        onClose={() => setItemModal({ open: false })}
        item={itemModal.item}
      />
    </Card>
  );
}

export default function MenuPage() {
  const [createModal, setCreateModal] = useState(false);
  const menus = mockMenus;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Gestão de Menus</h1>
          <p className="text-slate-400 text-sm mt-1">Organize categorias e itens do seu cardápio</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={() => setCreateModal(true)}>
          Novo Menu
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Menus', value: menus.length, icon: '📋' },
          { label: 'Categorias', value: menus.reduce((s, m) => s + m.categories.length, 0), icon: '📂' },
          { label: 'Itens', value: menus.reduce((s, m) => s + m.categories.reduce((cs, c) => cs + c.items.length, 0), 0), icon: '🍽️' },
          { label: 'Ativos', value: menus.filter(m => m.isActive).length, icon: '✅' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
            <span className="text-2xl">{s.icon}</span>
            <div>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-xs text-slate-400">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Menu list */}
      <div className="space-y-4">
        {menus.length === 0 ? (
          <EmptyState
            icon={UtensilsCrossed}
            title="Nenhum menu criado"
            description="Crie o seu primeiro menu digital para começar."
            action={<Button leftIcon={<Plus size={16} />} onClick={() => setCreateModal(true)}>Criar Primeiro Menu</Button>}
          />
        ) : (
          menus.map((menu) => <CategorySection key={menu.id} menu={menu} />)
        )}
      </div>

      {/* Create Menu Modal */}
      <Modal
        open={createModal}
        onClose={() => setCreateModal(false)}
        title="Criar Novo Menu"
        size="sm"
        footer={
          <div className="flex gap-3 justify-end">
            <Button variant="ghost" onClick={() => setCreateModal(false)}>Cancelar</Button>
            <Button onClick={() => setCreateModal(false)}>Criar Menu</Button>
          </div>
        }
      >
        <div className="space-y-4">
          <Input label="Nome do Menu" placeholder="Ex: Menu Principal" />
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">Tipo</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'a_la_carte', label: 'À La Carte', emoji: '🍽️' },
                { value: 'fixed', label: 'Fixo do Dia', emoji: '⏰' },
                { value: 'special', label: 'Especial', emoji: '⭐' },
              ].map(type => (
                <label key={type.value} className="p-3 rounded-xl border border-white/10 bg-white/5 text-center cursor-pointer hover:border-green-500/30 transition-colors">
                  <input type="radio" name="type" value={type.value} className="hidden" />
                  <div className="text-2xl mb-1">{type.emoji}</div>
                  <div className="text-xs text-slate-300">{type.label}</div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
