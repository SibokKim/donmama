import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: { default: '돈마마 | 메뉴와 리뷰 혜택', template: '%s | 돈마마' },
  description:
    '돈마마의 고기와 식사 메뉴를 편하게 살펴보세요. 네이버 영수증 리뷰 참여 방법과 서비스 혜택을 안내합니다.',
  robots: { index: false, follow: false },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
