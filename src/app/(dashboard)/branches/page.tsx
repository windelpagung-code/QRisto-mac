'use client';
import { useState } from 'react';
import { Building2, Plus, Pencil, Trash2, MapPin, Phone, QrCode, Crown, Globe, Check, X } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { EmptyState } from '@/components/ui/EmptyState';
import { mockBranches, mockRestaurant } from '@/lib/mock-data';
import { COUNTRIES, LANGUAGES } from '@/lib/utils';
import type { Branch } from '@/types';

function BranchModal({ open, onClose, branch }: { open: boolean; onClose: () => void; branch?: Branch }) {
  const [customPrices, setCustomPrices] = useState(branch?.customPrices ?? false);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={branch ? 'Editar Filial' : 'Nova Filial'}
      size="md"
      footer={
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={onClose}>{branch ? 'Salvar' : 'Criar Filial'}</Button>
        </div>
      }
    >
      <div className="space-y-4">
        <Input label="Nome da Filial" defaultValue={branch?.name} placeholder="Ex: Filial Roma Centro" />
        <Input label="Endereço" defaultValue={branch?.address} placeholder="Via Roma 42" leftIcon={<MapPin size={16} />} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Cidade" defaultValue={branch?.city} placeholder="Roma" />
          <Select
            label="País"
            options={[{ value: '', label: 'País' }, ...COUNTRIES.map(c => ({ value: c.code, label: `${c.flag} ${c.label}` }))]}
            defaultValue={branch?.country}
          />
        </div>
        <Input label="Telefone" defaultValue={branch?.phone} placeholder="+39 06 0000000" leftIcon={<Phone size={16} />} />
        <Select
          label="Idioma Regional"
          options={[{ value: '', label: 'Padrão do restaurante' }, ...LANGUAGES.map(l => ({ value: l.code, label: `${l.flag} ${l.label}` }))]}
          defaultValue={branch?.regionalLanguage}
        />
        <div className="p-4 rounded-xl bg-white/5 border border-white/8">
          <Switch
            checked={customPrices}
            onChange={setCustomPrices}
            label="Preços personalizados"
            description="Permite definir preços diferentes dos do menu principal para esta filial"
          />
        </div>
      </div>
    </Modal>
  );
}

export default function BranchesPage() {
  const [modal, setModal] = useState<{ open: boolean; branch?: Branch }>({ open: false });
  const isElite = mockRestaurant.plan === 'elite';
  const branches = mockBranches;

  if (!isElite) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="p-8 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 max-w-md">
          <Crown size={48} className="text-yellow-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Gestão de Filiais</h2>
          <p className="text-slate-400 mb-6">
            Gerencie múltiplas unidades com preços, QR Codes e idiomas independentes. Disponível no plano Elite.
          </p>
          <Button variant="premium" leftIcon={<Crown size={16} />}>
            Fazer Upgrade para Elite — €39/mês
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Filiais</h1>
          <p className="text-slate-400 text-sm mt-1">Gestão das unidades do seu restaurante</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={() => setModal({ open: true })}>
          Nova Filial
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total de Filiais', value: branches.length, icon: '🏪' },
          { label: 'Ativas', value: branches.filter(b => b.isActive).length, icon: '✅' },
          { label: 'Com Preços Custom', value: branches.filter(b => b.customPrices).length, icon: '💰' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Branches grid */}
      {branches.length === 0 ? (
        <EmptyState
          icon={Building2}
          title="Nenhuma filial cadastrada"
          description="Adicione a primeira unidade do seu restaurante."
          action={<Button leftIcon={<Plus size={16} />} onClick={() => setModal({ open: true })}>Adicionar Filial</Button>}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {branches.map((branch) => (
            <Card key={branch.id} hover className="relative">
              {/* Status badge */}
              <div className="absolute top-4 right-4">
                <Badge variant={branch.isActive ? 'primary' : 'muted'}>
                  {branch.isActive ? <><Check size={10} /> Ativa</> : <><X size={10} /> Inativa</>}
                </Badge>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-green-500/15 border border-green-500/20 flex items-center justify-center flex-shrink-0">
                  <Building2 size={20} className="text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{branch.name}</h3>
                  <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                    <MapPin size={13} />
                    {branch.address}, {branch.city}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { icon: Phone, label: branch.phone || 'Sem telefone' },
                  { icon: Globe, label: LANGUAGES.find(l => l.code === branch.regionalLanguage)?.flag + ' ' + (LANGUAGES.find(l => l.code === branch.regionalLanguage)?.label || 'Padrão') },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 text-sm text-slate-400">
                    <Icon size={13} />
                    <span className="truncate">{label}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mb-5">
                {branch.customPrices && (
                  <Badge variant="accent">💰 Preços customizados</Badge>
                )}
                <Badge variant="muted"><QrCode size={10} /> QR exclusivo</Badge>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" size="sm" leftIcon={<QrCode size={13} />} fullWidth>
                  Ver QR Code
                </Button>
                <Button variant="ghost" size="sm" leftIcon={<Pencil size={13} />} onClick={() => setModal({ open: true, branch })}>
                  Editar
                </Button>
                <Button variant="danger" size="sm" leftIcon={<Trash2 size={13} />}>
                  <span className="sr-only">Excluir</span>
                </Button>
              </div>
            </Card>
          ))}

          {/* Add new card */}
          <button
            onClick={() => setModal({ open: true })}
            className="border-2 border-dashed border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-3 hover:border-green-500/30 hover:bg-green-500/3 transition-all text-slate-400 hover:text-green-400"
          >
            <div className="w-12 h-12 rounded-xl border border-current flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="text-sm font-medium">Adicionar Filial</span>
          </button>
        </div>
      )}

      <BranchModal
        open={modal.open}
        onClose={() => setModal({ open: false })}
        branch={modal.branch}
      />
    </div>
  );
}
