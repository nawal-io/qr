import React from 'react';
import { CryptoTextData } from '../../types';
import { FileText } from 'lucide-react';

interface Props {
  data: CryptoTextData;
  onChange: (data: CryptoTextData) => void;
}

export const CryptoTextForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-[11px] font-mono text-[#8f8f98] uppercase tracking-wider">
            Plain Text or Crypto Address
          </label>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => onChange({ content: 'bitcoin:1NawalIoCryptoAddressSample999' })}
              className="px-2 py-0.5 text-[10px] font-mono bg-[#0d0d0f] border border-[#242428] text-[#ededed] hover:bg-[#242428] rounded-sm transition"
            >
              BTC
            </button>
            <button
              type="button"
              onClick={() => onChange({ content: 'ethereum:0xNawalIoCryptoAddressSample888' })}
              className="px-2 py-0.5 text-[10px] font-mono bg-[#0d0d0f] border border-[#242428] text-[#ededed] hover:bg-[#242428] rounded-sm transition"
            >
              ETH
            </button>
            <button
              type="button"
              onClick={() => onChange({ content: 'solana:NawalIoSolanaAddressSample777' })}
              className="px-2 py-0.5 text-[10px] font-mono bg-[#0d0d0f] border border-[#242428] text-[#ededed] hover:bg-[#242428] rounded-sm transition"
            >
              SOL
            </button>
          </div>
        </div>
        <div className="relative">
          <span className="absolute top-2.5 left-3 pointer-events-none text-[#8f8f98]">
            <FileText size={15} />
          </span>
          <textarea
            rows={4}
            value={data.content}
            onChange={(e) => onChange({ content: e.target.value })}
            placeholder="Enter plain text, notes, secure instructions, or crypto wallet address..."
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono resize-none"
          />
        </div>
      </div>
    </div>
  );
};
