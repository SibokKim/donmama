import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowUpRight,
  ArrowRight,
  ReceiptText,
  Camera,
  Smartphone,
} from 'lucide-react';
import {
  RestaurantHeader,
  RestaurantFooter,
} from '@/components/restaurant-frame';
import { restaurant } from '@/lib/restaurant';
export const metadata: Metadata = { title: '리뷰 혜택' };
const steps = [
  {
    number: '01',
    Icon: ReceiptText,
    title: '직원에게 영수증을 요청해 주세요.',
    description:
      '“리뷰 이벤트 참여할게요”라고 말씀해 주세요. 직원이 영수증과 참여 방법을 안내해 드립니다.',
  },
  {
    number: '02',
    Icon: Camera,
    title: '네이버에 솔직한 후기를 남겨주세요.',
    description:
      '돈마마 네이버 페이지에서 리뷰 쓰기를 선택해 주세요. 영수증으로 방문 인증 후 음식 사진과 함께 후기를 남겨주세요.',
  },
  {
    number: '03',
    Icon: Smartphone,
    title: '작성한 화면을 직원에게 보여주세요.',
    description:
      '직원 확인 후, 대패삼겹 또는 우삼겹 반 인분을 서비스로 드립니다.',
  },
];
export default function ReviewPage() {
  return (
    <>
      <RestaurantHeader current="review" />
      <main className="review-layout">
        <section className="review-intro">
          <p className="eyebrow copper">A LITTLE THANK YOU</p>
          <h1>
            맛있게 드셨나요?
            <br />한 접시의 감사.
          </h1>
          <p className="review-lead">
            함께한 식사의 이야기를 남겨주세요.
            <br />
            솔직한 후기에 작은 선물을 준비했습니다.
          </p>
          <div className="gift-panel">
            <span className="gift-kicker">REVIEW GIFT</span>
            <div className="gift-fraction" aria-hidden="true">
              ½
            </div>
            <div className="gift-description">
              <span>대패삼겹 또는 우삼겹</span>
              <h2>반 인분 서비스</h2>
            </div>
            <span className="gift-bottom">돈마마가 드리는 작은 감사</span>
          </div>
        </section>
        <section className="review-instructions" aria-label="리뷰 참여 방법">
          <h2 className="review-section-title">세 번의 가벼운 순서</h2>
          <ol className="review-steps">
            {steps.map(({ number, Icon, title, description }) => (
              <li key={number}>
                <span className="step-number">{number}</span>
                <div>
                  <Icon
                    size={23}
                    strokeWidth={1.3}
                    className="step-icon"
                    aria-hidden="true"
                  />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={restaurant.reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="naver-action"
          >
            <span className="naver-letter" aria-hidden="true">
              N
            </span>
            <span>네이버 리뷰 쓰러 가기</span>
            <ArrowUpRight size={23} strokeWidth={1.5} />
          </a>
          <p className="review-external-note">
            돈마마 네이버 페이지로 이동합니다.
            <br />
            네이버 로그인과 영수증 인증이 필요할 수 있어요.
          </p>
          <p className="review-small-note">
            참여 조건과 서비스 제공에 관한 자세한 내용은 직원에게 문의해 주세요.
          </p>
          <Link className="return-menu" href="/menu">
            메뉴도 둘러보세요 <ArrowRight size={19} strokeWidth={1.4} />
          </Link>
        </section>
      </main>
      <RestaurantFooter />
    </>
  );
}
