import React from 'react';
import { WhatsAppData } from '../../types';
import { MessageSquare, Phone } from 'lucide-react';

interface Props {
  data: WhatsAppData;
  onChange: (data: WhatsAppData) => void;
}

export const WhatsAppForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
          WhatsApp Phone Number
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]">
            <Phone size={15} />
          </span>
          <input
            type="text"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="+628123456789"
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono"
          />
        </div>
        <p className="text-[10px] font-mono text-[#8f8f98] mt-1.5">
          Format with country code (e.g. +62, +1).
        </p>
      </div>

      <div>
        <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
          Pre-filled Message (Optional)
        </label>
        <div className="relative">
          <span className="absolute top-2.5 left-3 pointer-events-none text-[#8f8f98]">
            <MessageSquare size={15} />
          </span>
          <textarea
            rows={3}
            value={data.message}
            onChange={(e) => onChange({ ...data, message: e.target.value })}
            placeholder="Hello! I would like to inquire about..."
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono resize-none"
          />
        </div>
      </div>
    </div>
  );
};
