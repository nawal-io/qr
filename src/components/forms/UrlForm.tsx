import React from 'react';
import { UrlData } from '../../types';
import { Globe } from 'lucide-react';

interface Props {
  data: UrlData;
  onChange: (data: UrlData) => void;
}

export const UrlForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value;
    onChange({ url: val });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
          Website URL
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]">
            <Globe size={15} />
          </span>
          <input
            type="text"
            value={data.url}
            onChange={handleChange}
            placeholder="https://example.com"
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono"
          />
        </div>
        <p className="text-[10px] font-mono text-[#8f8f98] mt-1.5">
          Automatic protocol check: https:// prepended if omitted.
        </p>
      </div>
    </div>
  );
};
