import { InputData } from '../types';

export function generatePayload(input: InputData): string {
  switch (input.type) {
    case 'url': {
      let raw = input.data.url.trim();
      if (!raw) return 'https://nawal.io';
      if (!/^https?:\/\//i.test(raw)) {
        raw = 'https://' + raw;
      }
      return raw;
    }
    case 'whatsapp': {
      const phone = input.data.phone.replace(/[^\d+]/g, '');
      const msg = encodeURIComponent(input.data.message || '');
      return `https://wa.me/${phone}${msg ? `?text=${msg}` : ''}`;
    }
    case 'instagram': {
      let username = input.data.username.trim().replace(/^@/, '');
      if (username.startsWith('http://') || username.startsWith('https://')) {
        return username;
      }
      return `https://instagram.com/${username}`;
    }
    case 'wifi': {
      const { ssid, security, password, hidden } = input.data;
      const escapedSsid = ssid.replace(/([\\;,":])/g, '\\$1');
      const escapedPass = password.replace(/([\\;,":])/g, '\\$1');
      const sec = security === 'nopass' ? 'nopass' : security;
      return `WIFI:S:${escapedSsid};T:${sec};P:${escapedPass};H:${hidden ? 'true' : 'false'};;`;
    }
    case 'vcard': {
      const { fullName, phone, email, company, jobTitle, address, website } = input.data;
      return [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `FN:${fullName || 'N/A'}`,
        `ORG:${company || ''}`,
        `TITLE:${jobTitle || ''}`,
        `TEL;TYPE=CELL:${phone || ''}`,
        `EMAIL:${email || ''}`,
        `URL:${website || ''}`,
        `ADR:;;${address || ''};;;;`,
        'END:VCARD'
      ].filter(Boolean).join('\n');
    }
    case 'crypto': {
      return input.data.content || 'https://nawal.io';
    }
    default:
      return 'https://nawal.io';
  }
}
