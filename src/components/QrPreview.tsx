import React, { useEffect, useRef, useState } from 'react';
import { QrOptions } from '../types';
import { renderQrCode } from '../utils/qrRenderer';
import { Download, Copy, Check, FileCode, Printer } from 'lucide-react';

interface Props {
  payload: string;
  options: QrOptions;
  onOpenPrint: () => void;
}

export const QrPreview: React.FC<Props> = ({ payload, options, onOpenPrint }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [copiedImage, setCopiedImage] = useState(false);
  const [downloadMultiplier, setDownloadMultiplier] = useState<number>(2);
  const [isRendering, setIsRendering] = useState(false);
  const [canvasDataUrl, setCanvasDataUrl] = useState<string>('');

  useEffect(() => {
    if (!canvasRef.current) return;
    setIsRendering(true);
    renderQrCode({
      canvas: canvasRef.current,
      payload: payload || 'https://nawal.io',
      options,
      size: 300,
    }).then(() => {
      setIsRendering(false);
      if (canvasRef.current) {
        setCanvasDataUrl(canvasRef.current.toDataURL('image/png'));
      }
    });
  }, [payload, options]);

  const handleDownloadPng = async () => {
    const tempCanvas = document.createElement('canvas');
    const targetSize = 400 * downloadMultiplier;
    await renderQrCode({
      canvas: tempCanvas,
      payload: payload || 'https://nawal.io',
      options,
      size: targetSize,
    });

    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.png`;
    link.href = tempCanvas.toDataURL('image/png');
    link.click();
  };

  const handleDownloadSvg = async () => {
    const tempCanvas = document.createElement('canvas');
    await renderQrCode({
      canvas: tempCanvas,
      payload: payload || 'https://nawal.io',
      options,
      size: 800,
    });
    const dataUrl = tempCanvas.toDataURL('image/png');
    const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800"><image href="${dataUrl}" width="800" height="800"/></svg>`;
    const blob = new Blob([svgContent], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = `qr-code-${Date.now()}.svg`;
    link.href = url;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyPayload = () => {
    navigator.clipboard.writeText(payload);
    setCopiedPayload(true);
    setTimeout(() => setCopiedPayload(false), 2000);
  };

  const handleCopyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
          setCopiedImage(true);
          setTimeout(() => setCopiedImage(false), 2000);
        }
      });
    } catch (err) {
      console.error('Failed to copy image', err);
    }
  };

  return (
    <div className="bg-[#161618] border border-[#242428] rounded-sm p-6 flex flex-col items-center sticky top-20 shadow-2xl">
      <div className="w-full flex items-center justify-between mb-4 pb-3 border-b border-[#242428]">
        <h3 className="text-xs font-mono font-bold text-[#8f8f98] uppercase tracking-wider">Live QR Preview</h3>
        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#0d0d0f] text-[#ededed] border border-[#242428] rounded-sm">
          CANVAS-RENDERED
        </span>
      </div>

      {/* QR Code Canvas Box */}
      <div className="relative p-4 bg-white rounded-sm shadow-inner border border-zinc-300 mb-5">
        <canvas ref={canvasRef} className="block rounded-none" />
        {isRendering && (
          <div className="absolute inset-0 bg-white/90 flex items-center justify-center">
            <div className="w-5 h-5 border-2 border-black border-t-transparent animate-spin"></div>
          </div>
        )}
      </div>

      {/* Payload Display */}
      <div className="w-full bg-[#0d0d0f] border border-[#242428] rounded-sm p-3 mb-5">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-mono text-[#8f8f98] uppercase tracking-wider">Payload Data</span>
          <button
            onClick={handleCopyPayload}
            className="text-[10px] font-mono text-[#ededed] hover:underline flex items-center gap-1 transition uppercase"
          >
            {copiedPayload ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
            <span>{copiedPayload ? 'Copied' : 'Copy Text'}</span>
          </button>
        </div>
        <p className="text-xs font-mono text-[#ededed] truncate">{payload}</p>
      </div>

      {/* Export & Action Controls */}
      <div className="w-full space-y-3">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleDownloadPng}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-[#ededed] text-black text-xs font-mono font-bold uppercase tracking-wider rounded-sm transition"
          >
            <Download size={14} />
            <span>Download PNG</span>
          </button>

          <button
            onClick={handleDownloadSvg}
            className="flex items-center justify-center gap-2 py-2 px-3 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono font-bold uppercase tracking-wider rounded-sm border border-[#242428] transition"
          >
            <FileCode size={14} />
            <span>Vector SVG</span>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleCopyImage}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm border border-[#242428] transition"
          >
            {copiedImage ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
            <span>{copiedImage ? 'Copied!' : 'Copy Image'}</span>
          </button>

          <button
            onClick={onOpenPrint}
            className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#0d0d0f] hover:bg-[#242428] text-[#ededed] text-xs font-mono uppercase tracking-wider rounded-sm border border-[#242428] transition"
          >
            <Printer size={13} />
            <span>Print Signage</span>
          </button>
        </div>

        {/* Resolution Multiplier selector */}
        <div className="flex items-center justify-between pt-2 px-1">
          <span className="text-[10px] font-mono text-[#8f8f98] uppercase">Resolution Multiplier:</span>
          <div className="flex gap-1 bg-[#0d0d0f] p-1 rounded-sm border border-[#242428]">
            {[1, 2, 4].map((mult) => (
              <button
                key={mult}
                onClick={() => setDownloadMultiplier(mult)}
                className={`px-2 py-0.5 text-[10px] font-mono rounded-none ${
                  downloadMultiplier === mult
                    ? 'bg-white text-black font-bold'
                    : 'text-[#8f8f98] hover:text-[#ededed]'
                } transition`}
              >
                {mult}x ({mult * 400}px)
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
