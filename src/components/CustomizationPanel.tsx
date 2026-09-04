import React, { useRef } from 'react';
import { QrOptions, DotStyle, EyeStyle } from '../types';
import { Palette, Image as ImageIcon, RotateCcw, Upload } from 'lucide-react';

interface Props {
  options: QrOptions;
  onChange: (options: QrOptions) => void;
  onReset: () => void;
}

export const CustomizationPanel: React.FC<Props> = ({ options, onChange, onReset }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        onChange({
          ...options,
          logoUrl: uploadEvent.target?.result as string,
          errorCorrectionLevel: 'H',
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const setPresetLogo = (type: 'whatsapp' | 'instagram' | 'wifi' | 'web') => {
    let svgStr = '';
    if (type === 'whatsapp') {
      svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>`;
    } else if (type === 'instagram') {
      svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
    } else if (type === 'wifi') {
      svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><path d="M12 3c-4.97 0-9.5 1.9-12.85 5.02l2.15 2.15c2.65-2.45 6.13-3.92 10.7-3.92s8.05 1.47 10.7 3.92l2.15-2.15c-3.35-3.12-7.88-5.02-12.85-5.02zm0 6c-2.76 0-5.27 1.06-7.14 2.81l2.15 2.15c1.37-1.28 3.16-2.06 4.99-2.06s3.62.78 4.99 2.06l2.15-2.15c-1.87-1.75-4.38-2.81-7.14-2.81zm0 6c-1.38 0-2.64.53-3.57 1.41l3.57 3.57 3.57-3.57c-.93-.88-2.19-1.41-3.57-1.41z"/></svg>`;
    } else {
      svgStr = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#000000"><circle cx="12" cy="12" r="10" fill="#000"/><path d="M12 6v6l4 2" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
    }

    const encoded = `data:image/svg+xml;base64,${btoa(svgStr)}`;
    onChange({
      ...options,
      logoUrl: encoded,
      errorCorrectionLevel: 'H',
    });
  };

  return (
    <div className="space-y-6">
      {/* Quick Action Reset */}
      <div className="flex items-center justify-between pb-4 border-b border-[#242428]">
        <div>
          <h3 className="text-xs font-mono font-bold text-[#ededed] uppercase tracking-wider">QR Code Architecture</h3>
          <p className="text-[10px] font-mono text-[#8f8f98]">Standard classic high-contrast layout</p>
        </div>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm border border-[#242428] transition"
        >
          <RotateCcw size={12} />
          Reset Standard
        </button>
      </div>

      {/* Colors & Quiet Zone */}
      <div className="space-y-4">
        <h4 className="text-xs font-mono font-bold text-[#8f8f98] uppercase tracking-wider flex items-center gap-1.5">
          <Palette size={14} /> Colors & Quiet Zone
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase">Foreground</label>
            <div className="flex items-center gap-2 bg-[#0d0d0f] border border-[#242428] rounded-sm p-1.5">
              <input
                type="color"
                value={options.fgColor}
                onChange={(e) => onChange({ ...options, fgColor: e.target.value })}
                className="w-6 h-6 rounded-none border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs text-[#ededed] font-mono">{options.fgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase">Background</label>
            <div className="flex items-center gap-2 bg-[#0d0d0f] border border-[#242428] rounded-sm p-1.5">
              <input
                type="color"
                value={options.bgColor}
                onChange={(e) => onChange({ ...options, bgColor: e.target.value })}
                className="w-6 h-6 rounded-none border-0 cursor-pointer bg-transparent"
              />
              <span className="text-xs text-[#ededed] font-mono">{options.bgColor}</span>
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-[10px] font-mono text-[#8f8f98] uppercase">Quiet Zone Margin</label>
            <span className="text-xs font-mono text-[#ededed]">{options.margin}</span>
          </div>
          <input
            type="range"
            min={0}
            max={4}
            value={options.margin}
            onChange={(e) => onChange({ ...options, margin: parseInt(e.target.value) })}
            className="w-full accent-white bg-[#242428]"
          />
        </div>
      </div>

      {/* Module & Eye Styling */}
      <div className="space-y-4 pt-4 border-t border-[#242428]">
        <h4 className="text-xs font-mono font-bold text-[#8f8f98] uppercase tracking-wider">Module & Eye Styling</h4>
        
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase">Module Dots</label>
            <select
              value={options.dotStyle}
              onChange={(e) => onChange({ ...options, dotStyle: e.target.value as DotStyle })}
              className="w-full px-3 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] text-xs font-mono focus:outline-none focus:border-[#ededed]"
            >
              <option value="square">Standard Square</option>
              <option value="rounded">Rounded</option>
              <option value="extra-rounded">Extra-Rounded</option>
              <option value="dots">Dots</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase">Eye / Corner</label>
            <select
              value={options.eyeStyle}
              onChange={(e) => onChange({ ...options, eyeStyle: e.target.value as EyeStyle })}
              className="w-full px-3 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] text-xs font-mono focus:outline-none focus:border-[#ededed]"
            >
              <option value="square">Sharp Square</option>
              <option value="circle">Circle</option>
              <option value="rounded">Rounded</option>
              <option value="leaf">Leaf</option>
            </select>
          </div>
        </div>
      </div>

      {/* Logo Customization */}
      <div className="space-y-4 pt-4 border-t border-[#242428]">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-mono font-bold text-[#8f8f98] uppercase tracking-wider flex items-center gap-1.5">
            <ImageIcon size={14} /> Center Logo & Badge
          </h4>
          {options.logoUrl && (
            <button
              onClick={() => onChange({ ...options, logoUrl: null })}
              className="text-[10px] font-mono text-red-400 hover:text-red-300 transition uppercase"
            >
              Remove
            </button>
          )}
        </div>

        {/* Preset Quick Logos */}
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1.5 uppercase">Preset Quick Logos</label>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={() => setPresetLogo('whatsapp')}
              className="py-2 px-1 bg-[#0d0d0f] border border-[#242428] hover:border-[#ededed] rounded-sm text-xs text-[#ededed] font-mono flex flex-col items-center gap-1 transition"
            >
              <span className="font-bold text-xs">WA</span>
              <span className="text-[9px] text-[#8f8f98]">WhatsApp</span>
            </button>
            <button
              onClick={() => setPresetLogo('instagram')}
              className="py-2 px-1 bg-[#0d0d0f] border border-[#242428] hover:border-[#ededed] rounded-sm text-xs text-[#ededed] font-mono flex flex-col items-center gap-1 transition"
            >
              <span className="font-bold text-xs">IG</span>
              <span className="text-[9px] text-[#8f8f98]">Instagram</span>
            </button>
            <button
              onClick={() => setPresetLogo('wifi')}
              className="py-2 px-1 bg-[#0d0d0f] border border-[#242428] hover:border-[#ededed] rounded-sm text-xs text-[#ededed] font-mono flex flex-col items-center gap-1 transition"
            >
              <span className="font-bold text-xs">WiFi</span>
              <span className="text-[9px] text-[#8f8f98]">Access</span>
            </button>
            <button
              onClick={() => setPresetLogo('web')}
              className="py-2 px-1 bg-[#0d0d0f] border border-[#242428] hover:border-[#ededed] rounded-sm text-xs text-[#ededed] font-mono flex flex-col items-center gap-1 transition"
            >
              <span className="font-bold text-xs">WEB</span>
              <span className="text-[9px] text-[#8f8f98]">Portal</span>
            </button>
          </div>
        </div>

        {/* Custom Logo File Upload */}
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleLogoUpload}
            accept="image/png, image/jpeg, image/svg+xml"
            className="hidden"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full py-2 bg-[#0d0d0f] border border-dashed border-[#242428] hover:border-[#ededed] rounded-sm text-xs font-mono text-[#ededed] flex items-center justify-center gap-2 transition uppercase tracking-wider"
          >
            <Upload size={14} />
            {options.logoUrl ? 'Change Logo (PNG/SVG)' : 'Upload Custom Logo'}
          </button>
          <p className="text-[10px] font-mono text-[#8f8f98] mt-1 text-center">
            Auto High Error Correction (Level H) applied.
          </p>
        </div>

        {options.logoUrl && (
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-[10px] font-mono text-[#8f8f98] uppercase">Logo Scale Size</label>
              <span className="text-xs font-mono text-[#ededed]">{options.logoSize}%</span>
            </div>
            <input
              type="range"
              min={15}
              max={32}
              value={options.logoSize}
              onChange={(e) => onChange({ ...options, logoSize: parseInt(e.target.value) })}
              className="w-full accent-white bg-[#242428]"
            />
          </div>
        )}
      </div>
    </div>
  );
};
