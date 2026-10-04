'use client';
import { PageLink } from '@/components/page-link';
import { useLayoutEffect, useRef, useState, type PointerEvent } from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { menuGroups, won, type MenuItem } from '@/lib/restaurant';

const meatGroups = menuGroups.filter((group) => group.id !== 'meal');
const mealGroup = menuGroups.find((group) => group.id === 'meal');
type MenuTab = 'meat' | 'meal';

function MenuEntry({ item, meat = false }: { item: MenuItem; meat?: boolean }) {
  return (
    <article className={`menu-item ${meat ? 'meat-card' : ''}`}>
      {item.image && (
        <div className="meat-thumbnail">
          <Image
            src={item.image}
            alt={`${item.name}, 나무 도마에 담은 고기`}
            width={768}
            height={768}
            sizes="(max-width: 480px) 50vw, 216px"
            unoptimized
            loading="lazy"
          />
        </div>
      )}
      <div className="menu-item-copy">
        <h3>{item.name}</h3>
        {meat && (
          <p className="menu-price">
            {won(item.price)}
            <small>원</small>
          </p>
        )}
        {item.weight && (
          <p>
            {item.origin}
            <span aria-hidden="true">·</span>
            {item.weight}g
          </p>
        )}
        {item.season && <p className="season-label">{item.season} 메뉴</p>}
      </div>
      {!meat && (
        <p className="menu-price">
          {won(item.price)}
          <small>원</small>
        </p>
      )}
    </article>
  );
}

export function MenuBook() {
  const [large, setLarge] = useState(false);
  const [activeTab, setActiveTab] = useState<MenuTab>('meat');
  const tabsRef = useRef<HTMLDivElement>(null);
  const scrollTarget = useRef<number | null>(null);
  const swipe = useRef<{
    pointerId: number;
    x: number;
    y: number;
    startedAt: number;
  } | null>(null);

  useLayoutEffect(() => {
    if (scrollTarget.current !== null) {
      window.scrollTo({ top: scrollTarget.current, behavior: 'instant' });
      scrollTarget.current = null;
    }
  }, [activeTab]);

  function selectTab(value: unknown) {
    if ((value !== 'meat' && value !== 'meal') || value === activeTab) return;
    const top = tabsRef.current?.getBoundingClientRect().top;
    if (top !== undefined && top < 0) {
      scrollTarget.current = window.scrollY + top;
    }
    setActiveTab(value);
  }

  function startSwipe(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== 'touch') return;
    swipe.current = null;
    // Keep browser edge gestures, controls, and multi-touch gestures native.
    if (
      !event.isPrimary ||
      event.clientX < 24 ||
      event.clientX > window.innerWidth - 24 ||
      (event.target instanceof Element &&
        event.target.closest('button, a, input, select, textarea'))
    ) {
      return;
    }
    swipe.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      startedAt: event.timeStamp,
    };
  }

  function moveSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    if (!start || start.pointerId !== event.pointerId) return;
    const dx = Math.abs(event.clientX - start.x);
    const dy = Math.abs(event.clientY - start.y);
    if (dy > 10 && dy >= dx) swipe.current = null;
  }

  function endSwipe(event: PointerEvent<HTMLDivElement>) {
    const start = swipe.current;
    swipe.current = null;
    if (!start || start.pointerId !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (
      Math.abs(dx) < 60 ||
      Math.abs(dx) < Math.abs(dy) * 1.5 ||
      event.timeStamp - start.startedAt > 1500
    ) {
      return;
    }
    if (dx < 0 && activeTab === 'meat') selectTab('meal');
    if (dx > 0 && activeTab === 'meal') selectTab('meat');
  }

  return (
    <section
      className={`menu-book ${large ? 'large-type' : ''}`}
      aria-label="돈마마 메뉴판"
    >
      <div className="menu-tools">
        <span>메뉴와 가격</span>
        <label className="type-control" htmlFor="large-menu">
          큰 글씨
          <Switch id="large-menu" checked={large} onCheckedChange={setLarge} />
        </label>
      </div>
      <Tabs
        ref={tabsRef}
        value={activeTab}
        onValueChange={selectTab}
        className="menu-tabs"
        onPointerDown={startSwipe}
        onPointerMove={moveSwipe}
        onPointerUp={endSwipe}
        onPointerCancel={() => {
          swipe.current = null;
        }}
      >
        <TabsList
          variant="line"
          className="category-list"
          aria-label="메뉴 분류"
        >
          <TabsTrigger value="meat" className="category-tab">
            고기
          </TabsTrigger>
          <TabsTrigger value="meal" className="category-tab">
            식사
          </TabsTrigger>
        </TabsList>
        <TabsContent value="meat" className="category-panel">
          {meatGroups.map((group) => (
            <section
              key={group.id}
              className="meat-section"
              aria-labelledby={`menu-group-${group.id}`}
            >
              <div className="meat-section-heading">
                <p className="eyebrow copper">{group.english}</p>
                <h2 id={`menu-group-${group.id}`}>{group.label}</h2>
              </div>
              <div className="menu-items meat-grid">
                {group.items.map((item) => (
                  <MenuEntry key={item.name} item={item} meat />
                ))}
              </div>
            </section>
          ))}
          <p className="menu-unit-note">
            표시된 중량은 1인분 기준입니다.
            <br />
            사진은 메뉴 이해를 돕기 위한 연출 이미지입니다.
          </p>
        </TabsContent>
        {mealGroup && (
          <TabsContent value="meal" className="category-panel">
            <div className="category-heading">
              <div>
                <p className="eyebrow copper">{mealGroup.english}</p>
                <h2>{mealGroup.label}</h2>
                <p>{mealGroup.description}</p>
              </div>
            </div>
            <div className="menu-items">
              {mealGroup.items.map((item) => (
                <MenuEntry key={item.name} item={item} />
              ))}
            </div>
          </TabsContent>
        )}
      </Tabs>
      <Accordion className="origin-accordion">
        <AccordionItem value="origins">
          <AccordionTrigger className="origin-trigger">
            원산지 안내
          </AccordionTrigger>
          <AccordionContent>
            <div className="origin-copy">
              <p>
                돼지고기 국내산 · 소고기 미국산
                <br />
                이베리코 스페인산
              </p>
              <p>그 외 원산지는 매장에 비치된 원산지 표시판을 확인해 주세요.</p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <PageLink href="/review" className="menu-review-link">
        <div>
          <span className="eyebrow copper">A LITTLE THANK YOU</span>
          <p>솔직한 후기, 고기 한 접시로 감사드려요.</p>
        </div>
        <ArrowUpRight size={23} strokeWidth={1.3} />
      </PageLink>
    </section>
  );
}
