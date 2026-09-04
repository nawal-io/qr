import React from 'react';
import { VCardData } from '../../types';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Building } from 'lucide-react';

interface Props {
  data: VCardData;
  onChange: (data: VCardData) => void;
}

export const VCardForm: React.FC<Props> = ({ data, onChange }) => {
  const update = (field: keyof VCardData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Full Name</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><User size={13} /></span>
            <input
              type="text"
              value={data.fullName}
              onChange={(e) => update('fullName', e.target.value)}
              placeholder="Alex Nawal"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Job Title</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><Briefcase size={13} /></span>
            <input
              type="text"
              value={data.jobTitle}
              onChange={(e) => update('jobTitle', e.target.value)}
              placeholder="Principal Architect"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Company</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><Building size={13} /></span>
            <input
              type="text"
              value={data.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="nawal-io"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Phone</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><Phone size={13} /></span>
            <input
              type="text"
              value={data.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="+1 555-0192"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Email</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><Mail size={13} /></span>
            <input
              type="email"
              value={data.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="alex@nawal.io"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
        <div>
          <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Website</label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8f8f98]"><Globe size={13} /></span>
            <input
              type="text"
              value={data.website}
              onChange={(e) => update('website', e.target.value)}
              placeholder="https://nawal.io"
              className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-[10px] font-mono text-[#8f8f98] mb-1 uppercase tracking-wider">Address</label>
        <div className="relative">
          <span className="absolute top-2 left-3 pointer-events-none text-[#8f8f98]"><MapPin size={13} /></span>
          <input
            type="text"
            value={data.address}
            onChange={(e) => update('address', e.target.value)}
            placeholder="Silicon Valley, CA, USA"
            className="w-full pl-9 pr-3 py-1.5 bg-[#0d0d0f] border border-[#242428] rounded-sm text-[#ededed] placeholder-[#8f8f98]/40 text-xs font-mono focus:outline-none focus:border-[#ededed]"
          />
        </div>
      </div>
    </div>
  );
};
