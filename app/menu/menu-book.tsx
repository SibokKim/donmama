'use client';
import { PageLink } from '@/components/page-link';
import { useState } from 'react';
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
import { menuGroups, won } from '@/lib/restaurant';

export function MenuBook() {
  const [large, setLarge] = useState(false);
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
      <Tabs defaultValue="pork" className="menu-tabs">
        <TabsList
          variant="line"
          className="category-list"
          aria-label="메뉴 분류"
        >
          {menuGroups.map((g) => (
            <TabsTrigger key={g.id} value={g.id} className="category-tab">
              {g.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {menuGroups.map((g, index) => (
          <TabsContent key={g.id} value={g.id} className="category-panel">
            <div className="category-heading">
              <div>
                <p className="eyebrow copper">{g.english}</p>
                <h2>{g.label}</h2>
                <p>{g.description}</p>
              </div>
              <span className="category-number">0{index + 1}</span>
            </div>
            <div
              className={
                g.id === 'meal' ? 'menu-items' : 'menu-items meat-grid'
              }
            >
              {g.items.map((item) => (
                <article
                  key={item.name}
                  className={`menu-item ${g.id !== 'meal' ? 'meat-card' : ''}`}
                >
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
                    {g.id !== 'meal' && (
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
                    {item.season && (
                      <p className="season-label">{item.season} 메뉴</p>
                    )}
                  </div>
                  {g.id === 'meal' && (
                    <p className="menu-price">
                      {won(item.price)}
                      <small>원</small>
                    </p>
                  )}
                </article>
              ))}
            </div>
            {g.id !== 'meal' && (
              <p className="menu-unit-note">
                표시된 중량은 1인분 기준입니다.
                <br />
                사진은 메뉴 이해를 돕기 위한 연출 이미지입니다.
              </p>
            )}
          </TabsContent>
        ))}
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
