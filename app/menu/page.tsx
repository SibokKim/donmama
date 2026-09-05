import type { Metadata } from 'next';
import {
  RestaurantHeader,
  RestaurantFooter,
} from '@/components/restaurant-frame';
import { MenuBook } from './menu-book';
export const metadata: Metadata = { title: '메뉴' };
export default function MenuPage() {
  return (
    <>
      <RestaurantHeader current="menu" />
      <main className="menu-layout">
        <div className="menu-intro">
          <p className="eyebrow copper">THE MENU</p>
          <h1>
            한 점부터,
            <br />
            마지막 한 술까지.
          </h1>
          <p>
            취향에 맞는 한 끼를
            <br className="desktop-break" /> 천천히 골라보세요.
          </p>
          <div className="intro-rule" />
          <span className="eyebrow">DONMAMA · KOREAN GRILL</span>
        </div>
        <MenuBook />
      </main>
      <RestaurantFooter />
    </>
  );
}
