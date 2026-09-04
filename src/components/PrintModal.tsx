import React, { useState } from 'react';
import { X, Printer } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  canvasDataUrl: string;
  title: string;
  payloadText: string;
}

export const PrintModal: React.FC<Props> = ({ isOpen, onClose, canvasDataUrl, title, payloadText }) => {
  const [signageTitle, setSignageTitle] = useState(title || 'SCAN TO CONNECT');
  const [signageSubtitle, setSignageSubtitle] = useState('Point camera to scan');

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
      <div className="bg-[#161618] border border-[#242428] rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#242428]">
          <div className="flex items-center gap-2">
            <Printer size={16} className="text-[#ededed]" />
            <h2 className="text-xs font-mono font-bold text-[#ededed] uppercase tracking-wider">Physical Signage & Print Mode</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#8f8f98] hover:text-[#ededed] hover:bg-[#242428] transition"
          >
            <X size={16} />
          </button>
        </div>

        {/* Controls */}
        <div className="p-6 space-y-4 border-b border-[#242428] bg-[#0d0d0f]">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Signage Title</label>
              <input
                type="text"
                value={signageTitle}
                onChange={(e) => setSignageTitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#161618] border border-[#242428] rounded-sm text-[#ededed] text-xs font-mono focus:outline-none focus:border-[#ededed]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Subtitle / Instruction</label>
              <input
                type="text"
                value={signageSubtitle}
                onChange={(e) => setSignageSubtitle(e.target.value)}
                className="w-full px-3 py-1.5 bg-[#161618] border border-[#242428] rounded-sm text-[#ededed] text-xs font-mono focus:outline-none focus:border-[#ededed]"
              />
            </div>
          </div>
        </div>

        {/* Printable Preview Area */}
        <div className="p-8 overflow-y-auto flex-1 flex items-center justify-center bg-zinc-950">
          <div className="bg-white text-black p-10 rounded-sm shadow-2xl flex flex-col items-center text-center w-[400px]">
            <div className="text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-mono">nawal-io qr-studio</div>
            <h1 className="text-xl font-mono font-bold tracking-tight mb-1 text-zinc-900 uppercase">{signageTitle}</h1>
            <p className="text-xs font-mono text-zinc-600 mb-6">{signageSubtitle}</p>
            
            <div className="p-4 bg-white border-2 border-zinc-900 rounded-sm shadow-inner mb-6">
              {canvasDataUrl ? (
                <img src={canvasDataUrl} alt="QR Code" className="w-48 h-48 object-contain" />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-zinc-100 text-zinc-400 font-mono text-xs">QR Preview</div>
              )}
            </div>

            <div className="text-[10px] font-mono text-zinc-500 break-all max-w-[260px] bg-zinc-100 p-2 rounded-sm">
              {payloadText}
            </div>
            
            <div className="mt-6 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
              nawal-io privacy-first suite
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-[#242428] bg-[#161618]">
          <div className="text-[10px] font-mono text-[#8f8f98]">
            Optimized for A4 and thermal rolls.
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm border border-[#242428] transition"
            >
              Cancel
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-1.5 bg-white hover:bg-[#ededed] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition"
            >
              <Printer size={14} />
              Print Signage Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
