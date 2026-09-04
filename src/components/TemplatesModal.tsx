import React from 'react';
import { X, Sparkles, Wifi, MessageSquare, AtSign, User } from 'lucide-react';
import { InputData, QrOptions } from '../types';

interface TemplateItem {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: React.ReactNode;
  payload: InputData;
  styling: Partial<QrOptions>;
}

const TEMPLATES: TemplateItem[] = [
  {
    id: 'cafe-wifi',
    name: 'Cafe Guest Wi-Fi',
    description: 'Instant WPA2 Wi-Fi access point for patrons',
    category: 'Connectivity',
    icon: <Wifi className="text-[#ededed]" size={18} />,
    payload: {
      type: 'wifi',
      data: { ssid: 'nawal-cafe-guest', security: 'WPA', password: 'freshcoffee123', hidden: false }
    },
    styling: { fgColor: '#111111', bgColor: '#ffffff', dotStyle: 'square', eyeStyle: 'square' }
  },
  {
    id: 'wa-booking',
    name: 'WhatsApp Concierge',
    description: 'Direct inquiry chat with pre-filled greeting',
    category: 'Messaging',
    icon: <MessageSquare className="text-[#ededed]" size={18} />,
    payload: {
      type: 'whatsapp',
      data: { phone: '+628123456789', message: 'Hello! I would like to book a table at nawal-io.' }
    },
    styling: { fgColor: '#000000', bgColor: '#ffffff', dotStyle: 'square', eyeStyle: 'square' }
  },
  {
    id: 'ig-social',
    name: 'Instagram Creator Profile',
    description: 'Direct deep-link to creator or brand profile',
    category: 'Social Media',
    icon: <AtSign className="text-[#ededed]" size={18} />,
    payload: {
      type: 'instagram',
      data: { username: 'nawal.io' }
    },
    styling: { fgColor: '#111111', bgColor: '#ffffff', dotStyle: 'square', eyeStyle: 'square' }
  },
  {
    id: 'exec-vcard',
    name: 'Executive Business Card',
    description: 'vCard 3.0 digital contact sharing card',
    category: 'Networking',
    icon: <User className="text-[#ededed]" size={18} />,
    payload: {
      type: 'vcard',
      data: {
        fullName: 'Alex Nawal',
        phone: '+1 555-0192',
        email: 'alex@nawal.io',
        company: 'nawal-io suite',
        jobTitle: 'Principal Architect',
        address: 'Silicon Valley, CA',
        website: 'https://nawal.io'
      }
    },
    styling: { fgColor: '#111111', bgColor: '#ffffff', dotStyle: 'square', eyeStyle: 'square' }
  }
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (payload: InputData, styling: Partial<QrOptions>) => void;
}

export const TemplatesModal: React.FC<Props> = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xs p-4">
      <div className="bg-[#161618] border border-[#242428] rounded-sm w-full max-w-xl overflow-hidden shadow-2xl flex flex-col">
        <div className="flex items-center justify-between px-6 py-3 border-b border-[#242428]">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-[#ededed]" />
            <h2 className="text-xs font-mono font-bold text-[#ededed] uppercase tracking-wider">Preset Templates Library</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-sm text-[#8f8f98] hover:text-[#ededed] hover:bg-[#242428] transition"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
          {TEMPLATES.map((tmpl) => (
            <div
              key={tmpl.id}
              onClick={() => {
                onSelectTemplate(tmpl.payload, tmpl.styling);
                onClose();
              }}
              className="flex items-start gap-4 p-4 bg-[#0d0d0f] border border-[#242428] hover:border-[#ededed] rounded-sm cursor-pointer transition group"
            >
              <div className="p-2.5 bg-[#161618] border border-[#242428] rounded-sm">
                {tmpl.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-xs font-mono font-bold text-[#ededed] group-hover:text-white uppercase">{tmpl.name}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-[#242428] text-[#8f8f98] rounded-sm uppercase">
                    {tmpl.category}
                  </span>
                </div>
                <p className="text-xs font-mono text-[#8f8f98]">{tmpl.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-3 border-t border-[#242428] bg-[#0d0d0f] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#161618] border border-[#242428] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
