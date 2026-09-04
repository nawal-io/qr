export type DataType = 'url' | 'whatsapp' | 'instagram' | 'wifi' | 'vcard' | 'crypto';

export type DotStyle = 'square' | 'rounded' | 'extra-rounded' | 'dots';
export type EyeStyle = 'square' | 'circle' | 'rounded' | 'leaf';

export interface QrOptions {
  fgColor: string;
  bgColor: string;
  dotStyle: DotStyle;
  eyeStyle: EyeStyle;
  margin: number; // Quiet zone module count (0-4)
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  logoUrl: string | null;
  logoSize: number; // percentage of QR code (15-30)
}

export interface UrlData {
  url: string;
}

export interface WhatsAppData {
  phone: string;
  message: string;
}

export interface InstagramData {
  username: string;
}

export interface WifiData {
  ssid: string;
  security: 'WPA' | 'WEP' | 'nopass';
  password: string;
  hidden: boolean;
}

export interface VCardData {
  fullName: string;
  phone: string;
  email: string;
  company: string;
  jobTitle: string;
  address: string;
  website: string;
}

export interface CryptoTextData {
  content: string;
}

export type InputData = 
  | { type: 'url'; data: UrlData }
  | { type: 'whatsapp'; data: WhatsAppData }
  | { type: 'instagram'; data: InstagramData }
  | { type: 'wifi'; data: WifiData }
  | { type: 'vcard'; data: VCardData }
  | { type: 'crypto'; data: CryptoTextData };

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  iconName: string;
  payload: InputData;
  styling: Partial<QrOptions>;
}
