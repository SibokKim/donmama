import { PageLink } from '@/components/page-link';
import type { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { StickerStudio } from './sticker-studio';
export const metadata: Metadata = { title: '테이블 스티커' };
export default function StickerPage() {
  return (
    <main className="sticker-studio">
      <header className="studio-header">
        <PageLink href="/" className="back-link">
          <ArrowLeft size={18} />웹 화면 보기
        </PageLink>
        <span className="eyebrow">DONMAMA · TABLE STICKER</span>
      </header>
      <StickerStudio />
    </main>
  );
}
