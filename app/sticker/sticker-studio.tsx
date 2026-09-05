'use client';
import { useState } from 'react';
import { Download, Printer, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { createStickerSvg, validateQrUrl } from '@/lib/sticker';
import { restaurant } from '@/lib/restaurant';

export function StickerStudio() {
  const [draft, setDraft] = useState(restaurant.siteUrl);
  const [url, setUrl] = useState(restaurant.siteUrl);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const svg = createStickerSvg(url);
  function apply(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = validateQrUrl(draft.trim());
    if (message) {
      setError(message);
      return;
    }
    setError('');
    setUrl(draft.trim());
    setStatus('QR 주소를 반영했습니다.');
  }
  async function download() {
    setBusy(true);
    setStatus('');
    try {
      async function loadFont(path: string) {
        const response = await fetch(path);
        if (!response.ok) throw new Error('글꼴을 불러오지 못했습니다.');
        const bytes = new Uint8Array(await response.arrayBuffer());
        let binary = '';
        for (let i = 0; i < bytes.length; i += 8192)
          binary += String.fromCharCode(...bytes.subarray(i, i + 8192));
        return btoa(binary);
      }
      const [regular, medium] = await Promise.all([
        loadFont('/fonts/NotoSansKR-Regular.ttf'),
        loadFont('/fonts/NotoSansKR-Medium.ttf'),
      ]);
      const output = createStickerSvg(url, regular, medium);
      const blobUrl = URL.createObjectURL(
        new Blob([output], { type: 'image/svg+xml;charset=utf-8' }),
      );
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'donmama-table-sticker-90x120mm.svg';
      document.body.appendChild(link);
      link.click();
      link.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000);
      setStatus('인쇄용 SVG를 저장했습니다.');
    } catch {
      setStatus('파일을 저장하지 못했습니다. 잠시 후 다시 시도해 주세요.');
    } finally {
      setBusy(false);
    }
  }
  return (
    <div className="studio-layout">
      <div className="sticker-display">
        <div
          className="sticker-art"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <p className="sticker-dimensions">90 × 120 mm</p>
      </div>
      <section className="sticker-controls">
        <p className="eyebrow copper">MADE FOR YOUR TABLE</p>
        <h1>
          식탁 위의
          <br />
          작은 메뉴판.
        </h1>
        <p className="studio-description">
          크림색 바탕과 차분한 먹색.
          <br />
          필요한 안내만 간결하게 담았습니다.
        </p>
        <div className="print-specs">
          <div>
            <span>크기</span>
            <strong>90 × 120 mm</strong>
          </div>
          <div>
            <span>권장 마감</span>
            <strong>무광 방수 · 모서리 라운딩</strong>
          </div>
          <div>
            <span>QR</span>
            <strong>여백 포함 약 32 mm</strong>
          </div>
        </div>
        <form onSubmit={apply} className="qr-form">
          <Label htmlFor="qr-url">QR에 연결할 웹 주소</Label>
          <Input
            id="qr-url"
            type="url"
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            aria-invalid={!!error}
            aria-describedby={error ? 'qr-error' : 'qr-hint'}
            className="qr-input"
            required
          />
          <p id="qr-hint">
            현재는 검토용 주소입니다. 손님용 공개 주소가 정해지면 교체해 주세요.
          </p>
          {error && (
            <p id="qr-error" role="alert">
              {error}
            </p>
          )}
          <Button variant="outline" type="submit" className="studio-button">
            QR 주소 반영 <ArrowRight size={17} />
          </Button>
        </form>
        <div className="sticker-downloads">
          <Button
            type="button"
            onClick={download}
            disabled={busy}
            className="studio-button"
          >
            {busy ? '파일 준비 중' : '인쇄용 SVG 저장'}
            <Download size={18} />
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => window.print()}
            className="studio-button"
          >
            인쇄 / PDF 저장
            <Printer size={18} />
          </Button>
        </div>
        <output className="studio-status">{status}</output>
        <p className="print-note">
          인쇄할 때 배율 100%, 배경 그래픽 켜기를 선택해 주세요. 대량 제작 전
          실제 크기로 출력해 QR 인식을 확인해 주세요.
        </p>
      </section>
    </div>
  );
}
