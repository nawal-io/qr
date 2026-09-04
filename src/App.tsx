import React, { useState } from 'react';
import { DataType, InputData, QrOptions } from './types';
import { generatePayload } from './utils/qrEncoder';
import { Header } from './components/Header';
import { QrPreview } from './components/QrPreview';
import { CustomizationPanel } from './components/CustomizationPanel';
import { PrintModal } from './components/PrintModal';
import { TemplatesModal } from './components/TemplatesModal';
import { UrlForm } from './components/forms/UrlForm';
import { WhatsAppForm } from './components/forms/WhatsAppForm';
import { InstagramForm } from './components/forms/InstagramForm';
import { WifiForm } from './components/forms/WifiForm';
import { VCardForm } from './components/forms/VCardForm';
import { CryptoTextForm } from './components/forms/CryptoTextForm';
import { Globe, MessageSquare, AtSign, Wifi, User, FileText, Settings, Sliders } from 'lucide-react';

const DEFAULT_OPTIONS: QrOptions = {
  fgColor: '#111111',
  bgColor: '#ffffff',
  dotStyle: 'square',
  eyeStyle: 'square',
  margin: 4,
  errorCorrectionLevel: 'M',
  logoUrl: null,
  logoSize: 24,
};

export default function App() {
  const [activeTab, setActiveTab] = useState<DataType>('url');
  const [mobileActiveSubTab, setMobileActiveSubTab] = useState<'input' | 'style'>('input');
  
  const [inputData, setInputData] = useState<InputData>({
    type: 'url',
    data: { url: 'https://nawal.io' }
  });

  const [options, setOptions] = useState<QrOptions>(DEFAULT_OPTIONS);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState(false);
  const [isTemplatesModalOpen, setIsTemplatesModalOpen] = useState(false);

  const handleDataTypeChange = (type: DataType) => {
    setActiveTab(type);
    switch (type) {
      case 'url':
        setInputData({ type: 'url', data: { url: 'https://nawal.io' } });
        break;
      case 'whatsapp':
        setInputData({ type: 'whatsapp', data: { phone: '+628123456789', message: 'Hello from nawal-io!' } });
        break;
      case 'instagram':
        setInputData({ type: 'instagram', data: { username: 'nawal.io' } });
        break;
      case 'wifi':
        setInputData({ type: 'wifi', data: { ssid: 'nawal-guest', security: 'WPA', password: 'securepassword', hidden: false } });
        break;
      case 'vcard':
        setInputData({ type: 'vcard', data: { fullName: 'Alex Nawal', phone: '+1 555-0192', email: 'alex@nawal.io', company: 'nawal-io', jobTitle: 'Principal Architect', address: 'Silicon Valley, CA', website: 'https://nawal.io' } });
        break;
      case 'crypto':
        setInputData({ type: 'crypto', data: { content: 'https://nawal.io' } });
        break;
    }
  };

  const handleResetClassic = () => {
    setOptions(DEFAULT_OPTIONS);
  };

  const currentPayload = generatePayload(inputData);

  const dataTypeButtons: { type: DataType; label: string; icon: React.ReactNode }[] = [
    { type: 'url', label: 'Website', icon: <Globe size={15} /> },
    { type: 'whatsapp', label: 'WhatsApp', icon: <MessageSquare size={15} /> },
    { type: 'instagram', label: 'Instagram', icon: <AtSign size={15} /> },
    { type: 'wifi', label: 'Wi-Fi', icon: <Wifi size={15} /> },
    { type: 'vcard', label: 'vCard 3.0', icon: <User size={15} /> },
    { type: 'crypto', label: 'Text / Crypto', icon: <FileText size={15} /> },
  ];

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-[#ededed] font-mono selection:bg-white selection:text-black pb-16">
      <Header
        onOpenTemplates={() => setIsTemplatesModalOpen(true)}
        onOpenPrint={() => setIsPrintModalOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        {/* Mobile sub-tab switcher */}
        <div className="flex sm:hidden bg-[#161618] border border-[#242428] p-1 rounded-sm mb-6">
          <button
            onClick={() => setMobileActiveSubTab('input')}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition ${
              mobileActiveSubTab === 'input' ? 'bg-white text-black font-bold' : 'text-[#8f8f98]'
            }`}
          >
            <Settings size={14} /> Data & Input
          </button>
          <button
            onClick={() => setMobileActiveSubTab('style')}
            className={`flex-1 py-2 text-xs font-mono uppercase tracking-wider rounded-sm flex items-center justify-center gap-1.5 transition ${
              mobileActiveSubTab === 'style' ? 'bg-white text-black font-bold' : 'text-[#8f8f98]'
            }`}
          >
            <Sliders size={14} /> Branding & Style
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Panel (60% on desktop) */}
          <div className={`lg:col-span-7 space-y-6 ${mobileActiveSubTab === 'style' ? 'hidden sm:block' : ''}`}>
            {/* Data Type Selector */}
            <div className="bg-[#161618] border border-[#242428] rounded-sm p-5 shadow-xl">
              <h2 className="text-[11px] font-mono text-[#8f8f98] uppercase tracking-wider mb-3">
                1. Select Data Type
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {dataTypeButtons.map((btn) => (
                  <button
                    key={btn.type}
                    onClick={() => handleDataTypeChange(btn.type)}
                    className={`flex items-center gap-2 p-2.5 rounded-sm border text-xs font-mono transition text-left ${
                      activeTab === btn.type
                        ? 'bg-white text-black font-bold border-white'
                        : 'bg-[#0d0d0f] border-[#242428] text-[#8f8f98] hover:border-[#ededed]/40'
                    }`}
                  >
                    <span className={activeTab === btn.type ? 'text-black' : 'text-[#8f8f98]'}>
                      {btn.icon}
                    </span>
                    <span className="truncate">{btn.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Active Form Input */}
            <div className="bg-[#161618] border border-[#242428] rounded-sm p-6 shadow-xl">
              <h2 className="text-[11px] font-mono text-[#8f8f98] uppercase tracking-wider mb-4">
                2. Configure {dataTypeButtons.find((b) => b.type === activeTab)?.label} Payload
              </h2>

              {activeTab === 'url' && (
                <UrlForm
                  data={inputData.type === 'url' ? inputData.data : { url: '' }}
                  onChange={(data) => setInputData({ type: 'url', data })}
                />
              )}
              {activeTab === 'whatsapp' && (
                <WhatsAppForm
                  data={inputData.type === 'whatsapp' ? inputData.data : { phone: '', message: '' }}
                  onChange={(data) => setInputData({ type: 'whatsapp', data })}
                />
              )}
              {activeTab === 'instagram' && (
                <InstagramForm
                  data={inputData.type === 'instagram' ? inputData.data : { username: '' }}
                  onChange={(data) => setInputData({ type: 'instagram', data })}
                />
              )}
              {activeTab === 'wifi' && (
                <WifiForm
                  data={inputData.type === 'wifi' ? inputData.data : { ssid: '', security: 'WPA', password: '', hidden: false }}
                  onChange={(data) => setInputData({ type: 'wifi', data })}
                />
              )}
              {activeTab === 'vcard' && (
                <VCardForm
                  data={inputData.type === 'vcard' ? inputData.data : { fullName: '', phone: '', email: '', company: '', jobTitle: '', address: '', website: '' }}
                  onChange={(data) => setInputData({ type: 'vcard', data })}
                />
              )}
              {activeTab === 'crypto' && (
                <CryptoTextForm
                  data={inputData.type === 'crypto' ? inputData.data : { content: '' }}
                  onChange={(data) => setInputData({ type: 'crypto', data })}
                />
              )}
            </div>

            {/* Customization Suite (Desktop view) */}
            <div className="hidden sm:block bg-[#161618] border border-[#242428] rounded-sm p-6 shadow-xl">
              <h2 className="text-[11px] font-mono text-[#8f8f98] uppercase tracking-wider mb-4">
                3. Branding & Customization Suite
              </h2>
              <CustomizationPanel
                options={options}
                onChange={setOptions}
                onReset={handleResetClassic}
              />
            </div>
          </div>

          {/* Mobile Branding Tab Content */}
          <div className={`lg:col-span-7 space-y-6 sm:hidden ${mobileActiveSubTab === 'style' ? 'block' : 'hidden'}`}>
            <div className="bg-[#161618] border border-[#242428] rounded-sm p-6 shadow-xl">
              <h2 className="text-[11px] font-mono text-[#8f8f98] uppercase tracking-wider mb-4">
                Branding & Customization Suite
              </h2>
              <CustomizationPanel
                options={options}
                onChange={setOptions}
                onReset={handleResetClassic}
              />
            </div>
          </div>

          {/* Right Panel (40% on desktop) - Sticky Preview & Export */}
          <div className="lg:col-span-5">
            <QrPreview
              payload={currentPayload}
              options={options}
              onOpenPrint={() => setIsPrintModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Modals */}
      <PrintModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        canvasDataUrl=""
        title={dataTypeButtons.find((b) => b.type === activeTab)?.label + ' Signage'}
        payloadText={currentPayload}
      />

      <TemplatesModal
        isOpen={isTemplatesModalOpen}
        onClose={() => setIsTemplatesModalOpen(false)}
        onSelectTemplate={(payload, styling) => {
          setInputData(payload);
          setActiveTab(payload.type);
          if (styling) {
            setOptions((prev) => ({ ...prev, ...styling }));
          }
        }}
      />
    </div>
  );
}
