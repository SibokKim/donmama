import Link from 'next/link';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';

export function RestaurantHeader({ current }: { current: 'menu' | 'review' }) {
  return (
    <header className="page-header">
      <div className="page-header-inner">
        <Link href="/" className="back-link">
          <ArrowLeft size={19} strokeWidth={1.5} />
          <span>처음으로</span>
        </Link>
        <Link href="/" className="wordmark" aria-label="돈마마 홈">
          돈마마<span>DONMAMA</span>
        </Link>
        <Link
          href={current === 'menu' ? '/review' : '/menu'}
          className="header-crosslink"
        >
          {current === 'menu' ? '리뷰 혜택' : '메뉴 보기'}
          <ArrowUpRight size={17} strokeWidth={1.5} />
        </Link>
      </div>
    </header>
  );
}
export function RestaurantFooter() {
  return (
    <footer className="restaurant-footer">
      <span className="footer-wordmark">돈마마</span>
      <p>주문은 직원에게 말씀해 주세요.</p>
      <span className="eyebrow">GOOD FOOD. GOOD COMPANY.</span>
    </footer>
  );
}
