import { PageLink } from '@/components/page-link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const reviewGifts = [
  { name: '대패삼겹', image: '/images/gift-pork-v2.webp' },
  { name: '우삼겹', image: '/images/gift-beef-v2.webp' },
];

export default function Home() {
  return (
    <main className="home-shell">
      <section className="welcome-panel">
        <header className="home-header">
          <PageLink href="/" className="wordmark" aria-label="돈마마 홈">
            돈마마
            <span>DONMAMA</span>
            <small>20년 전통 생고기 전문점</small>
          </PageLink>
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
          <PageLink href="/menu" className="home-action primary-action">
            <div>
              <span className="action-kicker">THE MENU</span>
              <h2>메뉴 보기</h2>
              <p>고기부터 식사까지, 편하게 골라보세요.</p>
            </div>
            <ArrowUpRight size={30} strokeWidth={1.3} />
          </PageLink>
          <PageLink href="/review" className="home-action">
            <div>
              <span className="action-kicker">A LITTLE THANK YOU</span>
              <h2>리뷰 쓰고, 고기 한 접시</h2>
              <p>대패삼겹 또는 우삼겹 반 인분 서비스</p>
            </div>
            <ArrowUpRight size={28} strokeWidth={1.3} />
          </PageLink>
        </nav>
        <section className="review-gift-preview" aria-label="리뷰 서비스 메뉴">
          <div className="review-gift-grid">
            {reviewGifts.map((gift) => (
              <figure key={gift.name} className="review-gift-photo">
                <Image
                  src={gift.image}
                  alt={`얇은 ${gift.name}을 노릇하게 구워 접시에 담은 모습`}
                  width={600}
                  height={600}
                  sizes="(max-width: 480px) 50vw, 207px"
                  unoptimized
                  loading="lazy"
                />
                <figcaption>{gift.name}</figcaption>
              </figure>
            ))}
          </div>
          <p className="review-gift-choice">둘 중 한 가지 · 반 인분 서비스</p>
        </section>
        <footer className="home-footer">
          <span>주문은 직원에게 말씀해 주세요.</span>
          <span>정성껏 준비하겠습니다.</span>
        </footer>
      </section>
    </main>
  );
}
