'use client';
import { useState } from 'react';
import { Save, Palette, Type, Layout, Globe, CreditCard, Bell, Shield, Building2, Crown } from 'lucide-react';
import { Card, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { Badge } from '@/components/ui/Badge';
import { mockRestaurant, pricingPlans } from '@/lib/mock-data';
import { COUNTRIES, LANGUAGES } from '@/lib/utils';

const SECTIONS = [
  { id: 'profile', label: 'Perfil', icon: Building2 },
  { id: 'visual', label: 'Aparência', icon: Palette },
  { id: 'languages', label: 'Idiomas', icon: Globe },
  { id: 'plan', label: 'Plano', icon: CreditCard },
  { id: 'notifications', label: 'Notificações', icon: Bell },
  { id: 'security', label: 'Segurança', icon: Shield },
];

const FONTS = ['Inter', 'Playfair Display', 'Lato', 'Montserrat', 'Raleway', 'Georgia'];
const LAYOUTS = [
  { value: 'modern', label: 'Moderno', desc: 'Cards com imagens em grade' },
  { value: 'minimal', label: 'Minimalista', desc: 'Lista compacta e elegante' },
];

export default function SettingsPage() {
  const [section, setSection] = useState('profile');
  const [primaryColor, setPrimaryColor] = useState(mockRestaurant.primaryColor);
  const [accentColor, setAccentColor] = useState(mockRestaurant.accentColor);
  const [layout, setLayout] = useState(mockRestaurant.layout);
  const [saved, setSaved] = useState(false);

  const restaurant = mockRestaurant;
  const isElite = restaurant.plan === 'elite';

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Configurações</h1>
          <p className="text-slate-400 text-sm mt-1">Personalize o seu restaurante</p>
        </div>
        <Button onClick={handleSave} leftIcon={<Save size={16} />} variant={saved ? 'ghost' : 'primary'}>
          {saved ? '✓ Salvo!' : 'Salvar Alterações'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar nav */}
        <nav className="lg:col-span-1">
          <div className="space-y-1">
            {SECTIONS.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSection(id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  section === id
                    ? 'bg-green-500/15 text-green-400 border border-green-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content */}
        <div className="lg:col-span-3 space-y-5">

          {section === 'profile' && (
            <>
              <Card>
                <CardTitle className="mb-1">Informações do Restaurante</CardTitle>
                <CardDescription className="mb-5">Dados básicos visíveis no menu</CardDescription>
                <div className="space-y-4">
                  <Input label="Nome do Restaurante" defaultValue={restaurant.name} />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label="Email" type="email" defaultValue={restaurant.email} />
                    <Input label="Telefone" defaultValue={restaurant.phone} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Select label="País" options={[{ value: '', label: 'Selecione' }, ...COUNTRIES.map(c => ({ value: c.code, label: `${c.flag} ${c.label}` }))]} defaultValue={restaurant.country} />
                    <Input label="Cidade" defaultValue={restaurant.city} />
                  </div>
                  <Input label="Endereço" defaultValue={restaurant.address} />
                  <Input label="Website" type="url" defaultValue={restaurant.website} placeholder="https://..." />
                </div>
              </Card>

              <Card>
                <CardTitle className="mb-1">Logo do Restaurante</CardTitle>
                <CardDescription className="mb-5">Imagem que aparece no menu digital e QR Code</CardDescription>
                <div className="flex items-center gap-5">
                  <div className="w-24 h-24 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-4xl flex-shrink-0">
                    🍕
                  </div>
                  <div>
                    <Button variant="outline" size="sm">Carregar Logo</Button>
                    <p className="text-xs text-slate-500 mt-2">PNG ou SVG. Max 2MB. Recomendado 200×200px.</p>
                  </div>
                </div>
              </Card>

              <Card>
                <CardTitle className="mb-1">Banner do Menu</CardTitle>
                <CardDescription className="mb-5">Imagens exibidas no topo do menu público (carousel)</CardDescription>
                <div className="border-2 border-dashed border-white/10 rounded-xl p-8 text-center hover:border-green-500/30 transition-colors cursor-pointer">
                  <div className="text-3xl mb-2">🖼️</div>
                  <p className="text-sm text-slate-400">Arraste imagens ou clique para fazer upload</p>
                  <p className="text-xs text-slate-500 mt-1">JPG, PNG. Max 5MB cada. Recomendado 1200×400px</p>
                </div>
              </Card>
            </>
          )}

          {section === 'visual' && (
            <>
              <Card>
                <CardTitle className="mb-1">Cores do Menu</CardTitle>
                <CardDescription className="mb-5">Personalize as cores do menu público</CardDescription>
                <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Cor Principal</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={primaryColor}
                          onChange={e => setPrimaryColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer border border-white/10 bg-transparent flex-shrink-0"
                        />
                        <Input value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} placeholder="#22c55e" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Cor de Destaque</label>
                      <div className="flex gap-3 items-center">
                        <input
                          type="color"
                          value={accentColor}
                          onChange={e => setAccentColor(e.target.value)}
                          className="w-12 h-12 rounded-xl cursor-pointer border border-white/10 bg-transparent flex-shrink-0"
                        />
                        <Input value={accentColor} onChange={e => setAccentColor(e.target.value)} placeholder="#f97316" />
                      </div>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="p-4 rounded-xl border border-white/8 bg-white/3">
                    <p className="text-xs text-slate-400 mb-3">Preview</p>
                    <div className="flex gap-3">
                      <div className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: primaryColor }}>Botão Principal</div>
                      <div className="px-4 py-2 rounded-xl text-sm font-medium text-white" style={{ background: accentColor }}>Destaque</div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card>
                <CardTitle className="mb-1">Fonte</CardTitle>
                <CardDescription className="mb-5">Tipografia do menu público</CardDescription>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {FONTS.map(font => (
                    <button
                      key={font}
                      className={`p-3 rounded-xl border text-sm text-left transition-all ${
                        restaurant.fontFamily === font
                          ? 'border-green-500/40 bg-green-500/10 text-green-400'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <span style={{ fontFamily: font }}>{font}</span>
                      <br />
                      <span className="text-xs text-slate-500" style={{ fontFamily: font }}>Abc 123</span>
                    </button>
                  ))}
                </div>
              </Card>

              <Card>
                <CardTitle className="mb-1">Layout do Menu</CardTitle>
                <CardDescription className="mb-5">Estilo visual do cardápio</CardDescription>
                <div className="grid grid-cols-2 gap-4">
                  {LAYOUTS.map(l => (
                    <button
                      key={l.value}
                      onClick={() => setLayout(l.value as typeof layout)}
                      className={`p-5 rounded-xl border text-left transition-all ${
                        layout === l.value
                          ? 'border-green-500/40 bg-green-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="text-2xl mb-2">{l.value === 'modern' ? '🎨' : '📋'}</div>
                      <p className={`font-semibold text-sm mb-1 ${layout === l.value ? 'text-green-400' : 'text-white'}`}>{l.label}</p>
                      <p className="text-xs text-slate-400">{l.desc}</p>
                    </button>
                  ))}
                </div>
              </Card>
            </>
          )}

          {section === 'languages' && (
            <Card>
              <CardTitle className="mb-1">Idiomas Suportados</CardTitle>
              <CardDescription className="mb-5">Configure os idiomas do menu público</CardDescription>
              <div className="space-y-3">
                {LANGUAGES.map(lang => (
                  <div key={lang.code} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-white">{lang.label}</p>
                        <p className="text-xs text-slate-400">{lang.code.toUpperCase()}</p>
                      </div>
                    </div>
                    <Switch checked={true} onChange={() => {}} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {section === 'plan' && (
            <>
              <Card>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <CardTitle>Plano Atual</CardTitle>
                    <CardDescription>Gerencie sua assinatura</CardDescription>
                  </div>
                  <Badge variant={isElite ? 'premium' : 'primary'} size="md">
                    {isElite ? '⭐ Elite' : '🔹 Starter'}
                  </Badge>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/8 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-300">Plano {isElite ? 'Elite' : 'Starter'}</span>
                    <span className="font-bold text-white">€{isElite ? '39' : '19'}/mês</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-400 text-sm">Próxima renovação</span>
                    <span className="text-sm text-slate-300">01/04/2026</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">Gerir Fatura</Button>
                  <Button variant="danger" size="sm">Cancelar Plano</Button>
                </div>
              </Card>

              {!isElite && (
                <div className="p-6 rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-yellow-500/10 to-orange-500/5">
                  <div className="flex items-center gap-3 mb-4">
                    <Crown size={24} className="text-yellow-400" />
                    <h3 className="text-lg font-bold text-white">Fazer upgrade para Elite</h3>
                  </div>
                  <p className="text-slate-400 text-sm mb-5">
                    Desbloqueie analytics avançado, filiais, QR customizado e muito mais por apenas €39/mês.
                  </p>
                  <Button variant="premium" leftIcon={<Crown size={16} />}>
                    Upgrade para Elite
                  </Button>
                </div>
              )}
            </>
          )}

          {section === 'notifications' && (
            <Card>
              <CardTitle className="mb-1">Notificações</CardTitle>
              <CardDescription className="mb-5">Controle os alertas por email</CardDescription>
              <div className="space-y-4">
                {[
                  { label: 'Novo QR scan registado', desc: 'Alerta quando o QR Code é escaneiado', defaultChecked: true },
                  { label: 'Relatório semanal', desc: 'Resumo de analytics toda segunda-feira', defaultChecked: true },
                  { label: 'Atualizações de produto', desc: 'Novidades e melhorias do QRisto', defaultChecked: false },
                  { label: 'Pagamento confirmado', desc: 'Confirmação de cobranças', defaultChecked: true },
                ].map(n => (
                  <div key={n.label} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                    <div>
                      <p className="text-sm font-medium text-white">{n.label}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                    </div>
                    <Switch checked={n.defaultChecked} onChange={() => {}} />
                  </div>
                ))}
              </div>
            </Card>
          )}

          {section === 'security' && (
            <Card>
              <CardTitle className="mb-1">Segurança</CardTitle>
              <CardDescription className="mb-5">Proteja sua conta</CardDescription>
              <div className="space-y-5">
                <div className="grid grid-cols-1 gap-4">
                  <Input label="Senha atual" type="password" placeholder="••••••••" />
                  <Input label="Nova senha" type="password" placeholder="••••••••" />
                  <Input label="Confirmar nova senha" type="password" placeholder="••••••••" />
                </div>
                <Button>Alterar Senha</Button>
                <div className="pt-4 border-t border-white/8">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/8">
                    <div>
                      <p className="text-sm font-medium text-white">Autenticação de dois fatores</p>
                      <p className="text-xs text-slate-400 mt-0.5">Adiciona uma camada extra de segurança</p>
                    </div>
                    <Switch checked={false} onChange={() => {}} />
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
