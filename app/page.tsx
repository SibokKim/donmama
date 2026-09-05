import Link from 'next/link';
import { FoodPhoto } from '@/components/food-photo';
import { ArrowUpRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="home-shell">
      <section className="welcome-panel">
        <header className="home-header">
          <Link href="/" className="wordmark" aria-label="돈마마 홈">
            돈마마<span>DONMAMA</span>
          </Link>
          <span className="eyebrow">AT YOUR TABLE</span>
        </header>
        <div className="welcome-copy">
          <p className="eyebrow copper">A GOOD MEAL, A GOOD MOMENT</p>
          <h1>
            좋은 고기,
            <br />
            함께하는 여유.
          </h1>
          <p className="welcome-description">
            돈마마의 메뉴와 작은 선물을 만나보세요.
          </p>
        </div>
        <nav className="home-actions" aria-label="테이블 안내">
          <Link href="/menu" className="home-action primary-action">
            <div>
              <span className="action-kicker">THE MENU</span>
              <h2>메뉴 보기</h2>
              <p>고기부터 식사까지, 편하게 골라보세요.</p>
            </div>
            <ArrowUpRight size={30} strokeWidth={1.3} />
          </Link>
          <Link href="/review" className="home-action">
            <div>
              <span className="action-kicker">A LITTLE THANK YOU</span>
              <h2>리뷰 쓰고, 고기 한 접시</h2>
              <p>대패삼겹 또는 우삼겹 반 인분 서비스</p>
            </div>
            <ArrowUpRight size={28} strokeWidth={1.3} />
          </Link>
        </nav>
        <FoodPhoto kind="grill" compact />
        <footer className="home-footer">
          <span>주문은 직원에게 말씀해 주세요.</span>
          <span>정성껏 준비하겠습니다.</span>
        </footer>
      </section>
    </main>
  );
}
