import React from 'react';
import { QrCode, Sparkles, Printer, Download } from 'lucide-react';

interface Props {
  onOpenTemplates: () => void;
  onOpenPrint: () => void;
}

export const Header: React.FC<Props> = ({ onOpenTemplates, onOpenPrint }) => {
  return (
    <header className="border-b border-[#242428] bg-[#161618] sticky top-0 z-30 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-mono font-bold text-xs rounded-sm">
            QR
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-mono font-bold text-[#ededed] tracking-widest uppercase">qr-studio</h1>
              <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#242428] text-[#8f8f98] rounded-sm">
                nawal.io
              </span>
            </div>
            <p className="text-[11px] font-mono text-[#8f8f98]">100% CLIENT-SIDE • PRIVACY-FIRST QR ENGINE</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenTemplates}
            className="flex items-center gap-1.5 px-3 py-2 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm border border-[#242428] transition"
          >
            <Sparkles size={13} />
            <span>Templates</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-[#ededed] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition"
          >
            <Printer size={13} />
            <span>Print Signage</span>
          </button>
        </div>
      </div>
    </header>
  );
};
