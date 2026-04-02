'use client';
import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Check, Palette, Type, Layout, ExternalLink } from 'lucide-react';
import { Card, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Switch } from '@/components/ui/Switch';
import { mockQrCode, mockRestaurant } from '@/lib/mock-data';

const FRAME_STYLES = [
  { value: 'none', label: 'Sem moldura' },
  { value: 'simple', label: 'Simples' },
  { value: 'rounded', label: 'Arredondada' },
  { value: 'fancy', label: 'Elegante' },
];

const COLOR_PRESETS = [
  { fg: '#0f172a', bg: '#ffffff', label: 'Clássico' },
  { fg: '#22c55e', bg: '#0f172a', label: 'Verde' },
  { fg: '#f97316', bg: '#0f172a', label: 'Laranja' },
  { fg: '#8b5cf6', bg: '#ffffff', label: 'Roxo' },
  { fg: '#ec4899', bg: '#ffffff', label: 'Rosa' },
];

export default function QrCodePage() {
  const [fgColor, setFgColor] = useState(mockQrCode.foregroundColor);
  const [bgColor, setBgColor] = useState(mockQrCode.backgroundColor);
  const [frameStyle, setFrameStyle] = useState(mockQrCode.frameStyle);
  const [frameText, setFrameText] = useState(mockQrCode.frameText || '');
  const [showLogo, setShowLogo] = useState(false);
  const [size, setSize] = useState(200);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);

  const qrUrl = `https://qristo.app/menu/${mockRestaurant.slug}`;

  const copyUrl = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQR = (format: 'svg' | 'png') => {
    const svg = qrRef.current?.querySelector('svg');
    if (!svg) return;

    if (format === 'svg') {
      const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qristo-${mockRestaurant.slug}.svg`;
      a.click();
      URL.revokeObjectURL(url);
    } else {
      const canvas = document.createElement('canvas');
      canvas.width = size * 2;
      canvas.height = size * 2;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const a = document.createElement('a');
        a.href = canvas.toDataURL('image/png');
        a.download = `qristo-${mockRestaurant.slug}.png`;
        a.click();
      };
      img.src = 'data:image/svg+xml;base64,' + btoa(svg.outerHTML);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">QR Code</h1>
          <p className="text-slate-400 text-sm mt-1">Personalize e faça download do seu QR Code</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" leftIcon={<ExternalLink size={14} />} onClick={() => window.open(qrUrl, '_blank')}>
            Testar Link
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Total de Scans', value: mockQrCode.totalScans.toLocaleString(), icon: '📱' },
          { label: 'Hoje', value: '112', icon: '📊' },
          { label: 'Esta Semana', value: '743', icon: '📈' },
        ].map(s => (
          <div key={s.label} className="p-4 rounded-xl bg-white/5 border border-white/8 text-center">
            <div className="text-2xl mb-1">{s.icon}</div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customizer */}
        <div className="space-y-5">
          {/* Colors */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Palette size={16} className="text-green-400" />
              <CardTitle>Cores</CardTitle>
            </div>

            {/* Presets */}
            <div className="flex gap-2 mb-4 flex-wrap">
              {COLOR_PRESETS.map(preset => (
                <button
                  key={preset.label}
                  onClick={() => { setFgColor(preset.fg); setBgColor(preset.bg); }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs border border-white/10 hover:border-white/20 bg-white/5 text-slate-300 transition-colors"
                >
                  <span className="flex">
                    <span className="w-3 h-3 rounded-l-sm" style={{ background: preset.fg }} />
                    <span className="w-3 h-3 rounded-r-sm" style={{ background: preset.bg }} />
                  </span>
                  {preset.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Cor do QR</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={e => setFgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                  />
                  <Input value={fgColor} onChange={e => setFgColor(e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1.5">Cor de fundo</label>
                <div className="flex gap-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={e => setBgColor(e.target.value)}
                    className="w-10 h-10 rounded-lg cursor-pointer border border-white/10 bg-transparent"
                  />
                  <Input value={bgColor} onChange={e => setBgColor(e.target.value)} />
                </div>
              </div>
            </div>
          </Card>

          {/* Frame */}
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <Layout size={16} className="text-green-400" />
              <CardTitle>Moldura</CardTitle>
            </div>
            <div className="space-y-4">
              <Select
                label="Estilo da moldura"
                options={FRAME_STYLES.map(f => ({ value: f.value, label: f.label }))}
                value={frameStyle}
                onChange={e => setFrameStyle(e.target.value as typeof frameStyle)}
              />
              <Input
                label="Texto da moldura"
                value={frameText}
                onChange={e => setFrameText(e.target.value)}
                placeholder="Ex: Escaneia o nosso menu!"
                leftIcon={<Type size={16} />}
              />
            </div>
          </Card>

          {/* Logo */}
          <Card>
            <Switch
              checked={showLogo}
              onChange={setShowLogo}
              label="Logo central"
              description="Adicione o logo do restaurante no centro do QR Code"
            />
          </Card>

          {/* Size */}
          <Card>
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-300">Tamanho</span>
              <span className="text-sm text-slate-400">{size}px</span>
            </div>
            <input
              type="range"
              min={150}
              max={400}
              step={10}
              value={size}
              onChange={e => setSize(Number(e.target.value))}
              className="w-full accent-green-500"
            />
            <div className="flex justify-between text-xs text-slate-500 mt-1">
              <span>150px</span><span>400px</span>
            </div>
          </Card>
        </div>

        {/* Preview */}
        <div className="space-y-5">
          <Card className="flex flex-col items-center">
            <CardTitle className="mb-6">Preview</CardTitle>

            <div className="relative" ref={qrRef}>
              {frameStyle !== 'none' && (
                <div className={`absolute inset-0 border-2 border-slate-600 ${frameStyle === 'rounded' ? 'rounded-2xl' : ''} pointer-events-none`} />
              )}
              <div className="p-4 rounded-2xl inline-block" style={{ background: bgColor }}>
                <QRCodeSVG
                  value={qrUrl}
                  size={size}
                  fgColor={fgColor}
                  bgColor={bgColor}
                  level="H"
                  imageSettings={showLogo ? {
                    src: '/logo.png',
                    x: undefined,
                    y: undefined,
                    height: size * 0.15,
                    width: size * 0.15,
                    excavate: true,
                  } : undefined}
                />
              </div>
              {frameText && frameStyle !== 'none' && (
                <div className="text-center mt-2 text-sm font-medium" style={{ color: fgColor }}>
                  {frameText}
                </div>
              )}
            </div>

            <div className="mt-6 w-full space-y-3">
              <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-xs text-slate-400 flex-1 truncate">{qrUrl}</span>
                <button onClick={copyUrl} className="text-slate-400 hover:text-white transition-colors flex-shrink-0">
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  fullWidth
                  leftIcon={<Download size={16} />}
                  onClick={() => downloadQR('svg')}
                >
                  SVG
                </Button>
                <Button
                  size="md"
                  fullWidth
                  leftIcon={<Download size={16} />}
                  onClick={() => downloadQR('png')}
                >
                  PNG
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
