# QRisto — SaaS de Menu Digital Inteligente

Menu digital para restaurantes europeus com QR Code customizável, analytics avançado, multi-idioma e gestão de filiais.

## Stack
- **Next.js 16** (App Router, Turbopack) + **TypeScript** + **Tailwind CSS 4**
- **Supabase** (PostgreSQL + Auth) · **Stripe** (Checkout + Webhooks)
- **Recharts** · **qrcode.react** · **dnd-kit** · **Lucide**

## Rotas
| URL | Descrição |
|-----|-----------|
| `/` | Landing page |
| `/login` · `/register` · `/forgot-password` | Auth |
| `/dashboard` | KPIs + gráficos |
| `/menu` | Gestão de menus e itens |
| `/qrcode` | QR Code customizer + download |
| `/analytics` | Analytics avançado (Elite) |
| `/branches` | Filiais (Elite) |
| `/settings` | Configurações |
| `/admin` | Admin master |
| `/menu/[slug]` | Menu público |
| `/pricing` | Planos |

## Início Rápido
```bash
npm install
cp .env.example .env.local   # preencha as chaves
npm run dev                   # http://localhost:3000
```

## Deploy no Replit
1. Importe o repositório
2. Configure os Secrets (igual ao `.env.example`)
3. Run command: `npm run build && npm start`

## Planos
| | Starter €19/mês | Elite €39/mês |
|--|--|--|
| Filiais | — | ✅ |
| Analytics avançado | — | ✅ |
| QR customizado | — | ✅ |
| Vídeos YouTube | — | ✅ |
| Multi-idioma | ✅ | ✅ |
