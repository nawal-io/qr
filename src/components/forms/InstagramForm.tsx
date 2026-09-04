import React from 'react';
import { InstagramData } from '../../types';
import { AtSign } from 'lucide-react';

interface Props {
  data: InstagramData;
  onChange: (data: InstagramData) => void;
}

export const InstagramForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
          Instagram Username or Profile URL
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]">
            <AtSign size={15} />
          </span>
          <input
            type="text"
            value={data.username}
            onChange={(e) => onChange({ username: e.target.value })}
            placeholder="nawal.io or @username"
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono"
          />
        </div>
        <p className="text-[10px] font-mono text-[#8f8f98] mt-1.5">
          Generates direct instagram.com/username deep link.
        </p>
      </div>
    </div>
  );
};
