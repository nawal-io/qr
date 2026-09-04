import React from 'react';
import { WifiData } from '../../types';
import { Wifi, Key } from 'lucide-react';

interface Props {
  data: WifiData;
  onChange: (data: WifiData) => void;
}

export const WifiForm: React.FC<Props> = ({ data, onChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
          Network SSID (Wi-Fi Name)
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]">
            <Wifi size={15} />
          </span>
          <input
            type="text"
            value={data.ssid}
            onChange={(e) => onChange({ ...data, ssid: e.target.value })}
            placeholder="MyCafe_Guest_WiFi"
            className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
            Security Type
          </label>
          <select
            value={data.security}
            onChange={(e) => onChange({ ...data, security: e.target.value as any })}
            className="w-full px-3 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] text-xs font-mono focus:outline-none focus:border-[#ededed]"
          >
            <option value="WPA">WPA / WPA2</option>
            <option value="WEP">WEP</option>
            <option value="nopass">No Password (Open)</option>
          </select>
        </div>

        <div>
          <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
            Hidden SSID
          </label>
          <div className="flex items-center h-[34px] px-3 bg-[#0d0d0f] border border-[#242428] rounded-sm">
            <label className="flex items-center cursor-pointer select-none text-xs font-mono text-[#ededed]">
              <input
                type="checkbox"
                checked={data.hidden}
                onChange={(e) => onChange({ ...data, hidden: e.target.checked })}
                className="mr-2 rounded-none bg-[#161618] border-[#242428] text-white focus:ring-0"
              />
              Hidden
            </label>
          </div>
        </div>
      </div>

      {data.security !== 'nopass' && (
        <div>
          <label className="block text-[11px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">
            Network Password
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]">
              <Key size={15} />
            </span>
            <input
              type="text"
              value={data.password}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder="securepassword123"
              className="w-full pl-10 pr-4 py-2 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 focus:outline-none focus:border-[#ededed] transition text-xs font-mono"
            />
          </div>
        </div>
      )}
    </div>
  );
};
