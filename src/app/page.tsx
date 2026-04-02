import Link from 'next/link';
import {
  QrCode, BarChart3, Globe, Smartphone, Building2, Star,
  Check, ArrowRight, Play, ChevronDown, Zap, Shield, Clock
} from 'lucide-react';
import { pricingPlans } from '@/lib/mock-data';
import { formatCurrency } from '@/lib/utils';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/8 bg-[#0f172a]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
              <QrCode size={16} className="text-white" />
            </div>
            <span className="text-xl font-bold">QRisto</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Funcionalidades</a>
            <a href="#pricing" className="hover:text-white transition-colors">Preços</a>
            <a href="#testimonials" className="hover:text-white transition-colors">Depoimentos</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden sm:block text-sm text-slate-400 hover:text-white transition-colors px-4 py-2">
              Entrar
            </Link>
            <Link
              href="/register"
              className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
            >
              Começar Grátis
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-green-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            {/* Announcement badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-sm text-green-400 mb-8">
              <Zap size={14} />
              <span>Novo: Analytics com IA e Mapa de Calor</span>
              <ArrowRight size={12} />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Transforme seu{' '}
              <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
                Menu
              </span>{' '}
              numa{' '}
              <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Máquina
              </span>{' '}
              de Conversão
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
              Menu digital inteligente com QR Code customizável, analytics avançado e suporte a
              6 idiomas — pensado para restaurantes europeus.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all shadow-xl shadow-green-500/20 hover:shadow-green-500/30"
              >
                Começar Grátis — 14 dias
                <ArrowRight size={18} />
              </Link>
              <a
                href="#demo"
                className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/15 text-white font-semibold px-8 py-4 rounded-2xl text-lg transition-all"
              >
                <Play size={18} />
                Ver Demo
              </a>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-8 text-sm text-slate-500">
              <span className="flex items-center gap-1.5">
                <span className="text-green-400 font-bold">87+</span> restaurantes
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <span className="text-green-400 font-bold">284K+</span> QR scans
              </span>
              <span className="w-px h-4 bg-white/10" />
              <span className="flex items-center gap-1.5">
                <span className="text-green-400 font-bold">6</span> países europeus
              </span>
            </div>
          </div>

          {/* Hero Image / Demo Preview */}
          <div id="demo" className="mt-20 relative">
            <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden shadow-2xl">
              <div className="bg-[#0a1628] border-b border-white/8 px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="flex-1 mx-4 bg-white/5 rounded-lg px-3 py-1 text-xs text-slate-400">
                  qristo.app/menu/la-bella-italia
                </div>
              </div>
              <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Menu Preview */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-green-500/20 flex items-center justify-center text-2xl">🍕</div>
                    <div>
                      <h2 className="text-lg font-bold text-white">La Bella Italia</h2>
                      <p className="text-sm text-slate-400">Milano · Aperto adesso</p>
                    </div>
                    <div className="ml-auto flex gap-2">
                      {['IT', 'EN', 'FR', 'DE'].map(lang => (
                        <span key={lang} className="text-xs px-2 py-1 rounded-lg bg-white/10 text-slate-300">{lang}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {['🥗 Antipasti', '🍕 Pizze', '🍝 Paste', '🍷 Bevande', '🍮 Dolci'].map(cat => (
                      <span key={cat} className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-slate-300 hover:bg-green-500/20 hover:text-green-400 cursor-pointer transition-colors">
                        {cat}
                      </span>
                    ))}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      { name: 'Margherita DOP', price: '€12.00', tag: '⭐ Mais Vendido', emoji: '🍕' },
                      { name: 'Spaghetti Carbonara', price: '€16.00', tag: '🌶️ Picante', emoji: '🍝' },
                      { name: 'Tiramisù', price: '€7.50', tag: '🌱 Vegano', emoji: '🍮' },
                      { name: 'Burrata', price: '€16.00', tag: '⭐ Destaque', emoji: '🥗' },
                    ].map(item => (
                      <div key={item.name} className="p-4 rounded-xl bg-white/5 border border-white/8 flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl flex-shrink-0">{item.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-white truncate">{item.name}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{item.tag}</p>
                        </div>
                        <span className="text-sm font-bold text-green-400">{item.price}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* QR Code Preview */}
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/8 text-center">
                    <div className="w-32 h-32 mx-auto bg-white rounded-xl flex items-center justify-center mb-3">
                      <div className="w-28 h-28 grid grid-cols-5 gap-px">
                        {Array.from({ length: 25 }).map((_, i) => (
                          <div key={i} className={`rounded-sm ${Math.random() > 0.5 ? 'bg-slate-900' : 'bg-white'}`} />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-slate-400">Scaneie o menu</p>
                    <p className="text-lg font-bold text-white mt-1">3.421 scans</p>
                  </div>

                  {/* Analytics mini */}
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/8">
                    <p className="text-xs font-medium text-slate-400 mb-3">Analytics Hoje</p>
                    <div className="space-y-2">
                      {[
                        { label: 'Visualizações', value: '428', color: 'bg-green-400' },
                        { label: 'QR Scans', value: '112', color: 'bg-blue-400' },
                        { label: 'Item Top', value: 'Margherita', color: 'bg-orange-400' },
                      ].map(s => (
                        <div key={s.label} className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2">
                            <span className={`w-2 h-2 rounded-full ${s.color}`} />
                            <span className="text-slate-400">{s.label}</span>
                          </div>
                          <span className="font-semibold text-white">{s.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Funcionalidades</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">
              Tudo que o seu restaurante precisa
            </h2>
            <p className="text-xl text-slate-400 max-w-2xl mx-auto">
              Uma plataforma completa para digitalizar, personalizar e otimizar a experiência do seu menu.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Globe,
                title: 'Multi-idioma Nativo',
                description: 'Suporte a 6 idiomas (PT, EN, IT, FR, DE, ES) com detecção automática do navegador e tradução manual por item.',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10',
                border: 'border-blue-500/20',
              },
              {
                icon: QrCode,
                title: 'QR Code Customizável',
                description: 'Cores, logo central, moldura personalizada e texto. Transforme o QR Code numa extensão da sua marca.',
                color: 'text-green-400',
                bg: 'bg-green-500/10',
                border: 'border-green-500/20',
              },
              {
                icon: BarChart3,
                title: 'Analytics Avançado',
                description: 'Mapa de calor de cliques, ranking de produtos, horários de pico e exportação CSV para análise externa.',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10',
                border: 'border-purple-500/20',
              },
              {
                icon: Building2,
                title: 'Gestão de Filiais',
                description: 'Gerencie múltiplas unidades com preços diferenciados por filial, QR Codes individuais e dashboards separados.',
                color: 'text-orange-400',
                bg: 'bg-orange-500/10',
                border: 'border-orange-500/20',
              },
              {
                icon: Smartphone,
                title: 'PWA Offline-First',
                description: 'Menu instalável no celular, funciona sem internet. Service worker garante disponibilidade total ao cliente.',
                color: 'text-cyan-400',
                bg: 'bg-cyan-500/10',
                border: 'border-cyan-500/20',
              },
              {
                icon: Shield,
                title: 'Conformidade GDPR',
                description: 'Desenvolvido para o mercado europeu. Proteção de dados, multi-moeda e suporte a taxas locais (VAT).',
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10',
                border: 'border-yellow-500/20',
              },
            ].map((feature) => (
              <div key={feature.title} className={`p-6 rounded-2xl border ${feature.border} bg-white/5 backdrop-blur-sm hover:bg-white/8 transition-all`}>
                <div className={`w-12 h-12 rounded-xl ${feature.bg} border ${feature.border} flex items-center justify-center mb-4`}>
                  <feature.icon size={24} className={feature.color} />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Preços</span>
            <h2 className="text-4xl font-bold text-white mt-3 mb-4">Planos simples e transparentes</h2>
            <p className="text-xl text-slate-400">Economize 2 meses no plano anual</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {pricingPlans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-8 rounded-3xl border ${
                  plan.highlighted
                    ? 'border-green-500/40 bg-green-500/5'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-green-500 text-white text-xs font-bold">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-2 mt-4">
                    <span className="text-5xl font-bold text-white">€{plan.monthlyPrice}</span>
                    <span className="text-slate-400">/mês</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-1">
                    ou €{plan.yearlyPrice}/ano (economia de 2 meses)
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-sm">
                      <Check size={16} className="text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/register"
                  className={`block w-full text-center py-3 rounded-xl font-semibold transition-all ${
                    plan.highlighted
                      ? 'bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/20'
                      : 'bg-white/10 hover:bg-white/15 text-white border border-white/15'
                  }`}
                >
                  Começar com {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">Depoimentos</span>
            <h2 className="text-4xl font-bold text-white mt-3">O que dizem nossos clientes</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Marco Rossi',
                role: 'Proprietário, La Bella Italia · Milano',
                review: 'Aumentamos as visualizações do menu em 340% em apenas 2 meses. O QR Code personalizado ficou incrível e os clientes adoram!',
                avatar: 'MR',
                stars: 5,
              },
              {
                name: 'Sophie Martin',
                role: 'Gerente, Le Petit Bistro · Paris',
                review: 'O suporte multi-idioma é perfeito para os nossos clientes turistas. O dashboard de analytics nos ajuda a otimizar o cardápio toda semana.',
                avatar: 'SM',
                stars: 5,
              },
              {
                name: 'Carlos García',
                role: 'Chef, Tapas El Rincón · Barcelona',
                review: 'Gerenciar 3 filiais com preços diferentes nunca foi tão fácil. Economizamos horas de trabalho administrativo por semana.',
                avatar: 'CG',
                stars: 5,
              },
            ].map((t) => (
              <div key={t.name} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">&ldquo;{t.review}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center text-xs font-bold text-green-400">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-semibold text-green-400 uppercase tracking-wider">FAQ</span>
            <h2 className="text-4xl font-bold text-white mt-3">Perguntas frequentes</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: 'Preciso saber programar para usar o QRisto?', a: 'Não. O QRisto é 100% intuitivo. Você cria e edita o menu direto pelo painel, sem nenhum conhecimento técnico.' },
              { q: 'Quantos QR Codes posso ter?', a: 'No Starter, você tem 1 QR Code para o restaurante. No Elite, cada filial tem seu próprio QR Code exclusivo e rastreável.' },
              { q: 'Os clientes precisam baixar algum aplicativo?', a: 'Não. O menu abre diretamente no navegador do celular. Como é PWA, o cliente pode até "instalar" sem app store.' },
              { q: 'O menu funciona sem internet?', a: 'Sim. Após o primeiro acesso, o menu fica em cache no dispositivo do cliente e funciona offline.' },
              { q: 'Posso testar antes de pagar?', a: 'Sim! Oferecemos 14 dias grátis em todos os planos, sem precisar de cartão de crédito.' },
              { q: 'Como funciona o sistema multi-idioma?', a: 'A interface detecta automaticamente o idioma do navegador. Você pode também traduzir manualmente cada prato para garantir precisão cultural.' },
            ].map((faq, i) => (
              <div key={i} className="p-6 rounded-2xl border border-white/10 bg-white/5">
                <div className="flex items-start justify-between gap-4">
                  <h4 className="text-base font-semibold text-white">{faq.q}</h4>
                  <ChevronDown size={18} className="text-slate-400 flex-shrink-0 mt-0.5" />
                </div>
                <p className="text-sm text-slate-400 mt-3 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="p-12 rounded-3xl border border-green-500/20 bg-gradient-to-br from-green-500/10 via-transparent to-blue-500/5 relative overflow-hidden">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-green-500/5 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">
                Comece hoje — 14 dias grátis
              </h2>
              <p className="text-xl text-slate-400 mb-8">
                Sem cartão de crédito. Configure em 5 minutos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold px-10 py-4 rounded-2xl text-lg transition-all shadow-xl shadow-green-500/25"
                >
                  Criar Conta Grátis
                  <ArrowRight size={20} />
                </Link>
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-slate-500">
                <span className="flex items-center gap-1.5"><Clock size={13} /> Setup em 5 min</span>
                <span className="flex items-center gap-1.5"><Shield size={13} /> GDPR Compliant</span>
                <span className="flex items-center gap-1.5"><Globe size={13} /> 6 idiomas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/8 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-green-500 flex items-center justify-center">
                  <QrCode size={13} className="text-white" />
                </div>
                <span className="font-bold text-white">QRisto</span>
              </div>
              <p className="text-sm text-slate-400">Menu digital inteligente para restaurantes europeus.</p>
            </div>
            {[
              { title: 'Produto', links: ['Funcionalidades', 'Preços', 'Demo', 'API'] },
              { title: 'Empresa', links: ['Sobre nós', 'Blog', 'Parceiros', 'Contacto'] },
              { title: 'Legal', links: ['Privacidade', 'Termos', 'GDPR', 'Cookies'] },
            ].map(col => (
              <div key={col.title}>
                <h4 className="text-sm font-semibold text-white mb-3">{col.title}</h4>
                <ul className="space-y-2">
                  {col.links.map(link => (
                    <li key={link}>
                      <a href="#" className="text-sm text-slate-400 hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">© 2026 QRisto. Todos os direitos reservados.</p>
            <p className="text-sm text-slate-500">Feito com ❤️ para restaurantes europeus</p>
          </div>
        </div>
      </footer>

      {/* Sticky CTA */}
      <div className="fixed bottom-6 right-6 z-40">
        <Link
          href="/register"
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-2xl shadow-xl shadow-green-500/30 transition-all"
        >
          <Zap size={16} />
          Começar Grátis
        </Link>
      </div>
    </div>
  );
}
