import QRCode from 'qrcode';
import { QrOptions } from '../types';

export interface RenderQrParams {
  canvas: HTMLCanvasElement;
  payload: string;
  options: QrOptions;
  size?: number; // target output pixel size (e.g. 400)
}

export async function renderQrCode({ canvas, payload, options, size = 400 }: RenderQrParams): Promise<void> {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // 1. Generate QR matrix data using qrcode library
  const qrData = QRCode.create(payload, {
    errorCorrectionLevel: options.logoUrl ? 'H' : options.errorCorrectionLevel,
  });

  const moduleCount = qrData.modules.size;
  const quietZone = options.margin !== undefined ? options.margin : 4;
  const totalModules = moduleCount + quietZone * 2;

  // Set canvas display and buffer resolution for crisp rendering
  const dpr = window.devicePixelRatio || 1;
  canvas.width = size * dpr;
  canvas.height = size * dpr;
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;

  ctx.scale(dpr, dpr);

  // Background
  ctx.fillStyle = options.bgColor;
  ctx.fillRect(0, 0, size, size);

  const cellSize = size / totalModules;

  // Helper to check if a coordinate (row, col) is part of finder pattern (eyes)
  // Finder patterns are 7x7 blocks at top-left (0,0), top-right (n-7, 0), bottom-left (0, n-7)
  const isFinderPattern = (r: number, c: number) => {
    const n = moduleCount;
    return (
      (r < 7 && c < 7) || // top-left
      (r < 7 && c >= n - 7) || // top-right
      (r >= n - 7 && c < 7) // bottom-left
    );
  };

  const fgColor = options.fgColor;
  const dotStyle = options.dotStyle || 'square';
  const eyeStyle = options.eyeStyle || 'square';

  // Draw modules
  for (let r = 0; r < moduleCount; r++) {
    for (let c = 0; c < moduleCount; c++) {
      if (qrData.modules.get(r, c)) {
        const isFinder = isFinderPattern(r, c);
        const x = (c + quietZone) * cellSize;
        const y = (r + quietZone) * cellSize;

        if (isFinder) {
          // Skip drawing standard modules in finder zones; eyes will be rendered separately
          continue;
        }

        ctx.fillStyle = fgColor;

        if (dotStyle === 'dots') {
          ctx.beginPath();
          ctx.arc(
            x + cellSize / 2,
            y + cellSize / 2,
            cellSize * 0.42,
            0,
            Math.PI * 2
          );
          ctx.fill();
        } else if (dotStyle === 'rounded') {
          const radius = cellSize * 0.25;
          ctx.beginPath();
          ctx.roundRect(x + cellSize * 0.05, y + cellSize * 0.05, cellSize * 0.9, cellSize * 0.9, radius);
          ctx.fill();
        } else if (dotStyle === 'extra-rounded') {
          const radius = cellSize * 0.45;
          ctx.beginPath();
          ctx.roundRect(x, y, cellSize, cellSize, radius);
          ctx.fill();
        } else {
          // Standard sharp square (classic default)
          ctx.fillRect(x, y, cellSize + 0.5, cellSize + 0.5); // +0.5 to prevent subpixel seams
        }
      }
    }
  }

  // Draw Finder Patterns (Eyes)
  const drawEye = (startRow: number, startCol: number) => {
    const x = (startCol + quietZone) * cellSize;
    const y = (startRow + quietZone) * cellSize;
    const sizePx = 7 * cellSize;

    ctx.save();
    ctx.strokeStyle = fgColor;
    ctx.fillStyle = fgColor;

    if (eyeStyle === 'circle') {
      // Outer ring
      ctx.lineWidth = cellSize;
      ctx.beginPath();
      ctx.arc(x + sizePx / 2, y + sizePx / 2, sizePx / 2 - cellSize / 2, 0, Math.PI * 2);
      ctx.stroke();

      // Inner core
      ctx.beginPath();
      ctx.arc(x + sizePx / 2, y + sizePx / 2, cellSize * 1.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (eyeStyle === 'rounded') {
      const radius = cellSize * 1.5;
      ctx.lineWidth = cellSize;
      ctx.beginPath();
      ctx.roundRect(x, y, sizePx, sizePx, radius);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize, radius * 0.5);
      ctx.fill();
    } else if (eyeStyle === 'leaf') {
      const radius = cellSize * 2.5;
      ctx.lineWidth = cellSize;
      ctx.beginPath();
      ctx.roundRect(x, y, sizePx, sizePx, [radius, 0, radius, 0]);
      ctx.stroke();

      ctx.beginPath();
      ctx.roundRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize, cellSize);
      ctx.fill();
    } else {
      // Standard Sharp Square (classic default)
      // Outer box
      ctx.lineWidth = cellSize;
      ctx.strokeRect(x + cellSize / 2, y + cellSize / 2, sizePx - cellSize, sizePx - cellSize);

      // Inner solid square
      ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
    }
    ctx.restore();
  };

  drawEye(0, 0); // top-left
  drawEye(0, moduleCount - 7); // top-right
  drawEye(moduleCount - 7, 0); // bottom-left

  // Draw Logo in center if provided
  if (options.logoUrl) {
    await new Promise<void>((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const logoFraction = (options.logoSize || 24) / 100;
        const logoPx = size * logoFraction;
        const logoX = (size - logoPx) / 2;
        const logoY = (size - logoPx) / 2;

        // Clean white background patch for high readability & scannability
        const padding = 6;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.roundRect(
          logoX - padding,
          logoY - padding,
          logoPx + padding * 2,
          logoPx + padding * 2,
          12
        );
        ctx.fill();
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;
        ctx.stroke();

        // Draw logo image
        ctx.save();
        ctx.beginPath();
        ctx.roundRect(logoX, logoY, logoPx, logoPx, 8);
        ctx.clip();
        ctx.drawImage(img, logoX, logoY, logoPx, logoPx);
        ctx.restore();
        resolve();
      };
      img.onerror = () => resolve();
      img.src = options.logoUrl!;
    });
  }
}
