export const restaurant = {
  name: '돈마마',
  reviewUrl: 'https://m.place.naver.com/restaurant/18363630/review/visitor',
  siteUrl: 'https://sibokkim.github.io/donmama/',
  benefit: '대패삼겹 또는 우삼겹 반 인분',
};

export type MenuItem = {
  name: string;
  price: number;
  weight?: number;
  origin?: string;
  season?: string;
  image?: string;
};
export const menuGroups: {
  id: string;
  label: string;
  english: string;
  description: string;
  items: MenuItem[];
}[] = [
  {
    id: 'pork',
    label: '돼지고기',
    english: 'PORK',
    description: '돈마마의 국내산 돼지고기',
    items: [
      {
        name: '생오겹목살',
        price: 17000,
        weight: 180,
        origin: '국내산',
        image: '/images/menu/fresh-pork-v4.webp',
      },
      {
        name: '유황생삼겹살',
        price: 17000,
        weight: 150,
        origin: '국내산',
        image: '/images/menu/pork-belly-v2.webp',
      },
      {
        name: '덜미살 / 꼬들살',
        price: 18000,
        weight: 180,
        origin: '국내산',
        image: '/images/menu/pork-neck.webp',
      },
    ],
  },
  {
    id: 'beef',
    label: '소고기',
    english: 'BEEF',
    description: '불판 위에서 즐기는 소고기',
    items: [
      {
        name: '우삼겹살',
        price: 15000,
        weight: 180,
        origin: '미국산',
        image: '/images/menu/beef-belly.webp',
      },
      {
        name: '차돌박이',
        price: 18000,
        weight: 150,
        origin: '미국산',
        image: '/images/menu/beef-brisket.webp',
      },
      {
        name: '소갈비살',
        price: 24000,
        weight: 150,
        origin: '미국산',
        image: '/images/menu/beef-rib.webp',
      },
    ],
  },
  {
    id: 'iberico',
    label: '이베리코',
    english: 'IBÉRICO',
    description: '스페인산 이베리코 흑돼지',
    items: [
      {
        name: '이베리코 목살',
        price: 18000,
        weight: 150,
        origin: '스페인산',
        image: '/images/menu/iberico-collar.webp',
      },
      {
        name: '이베리코 갈비살',
        price: 22000,
        weight: 150,
        origin: '스페인산',
        image: '/images/menu/iberico-rib.webp',
      },
    ],
  },
  {
    id: 'meal',
    label: '식사',
    english: 'TO COMPLETE YOUR MEAL',
    description: '고기와 함께, 든든한 마무리',
    items: [
      { name: '된장술밥', price: 10000 },
      { name: '차돌된장', price: 9000 },
      { name: '뚝배기알밥', price: 9000 },
      { name: '비빔국수', price: 9000 },
      { name: '열무국수', price: 9000, season: '하절기' },
      { name: '우동', price: 8000, season: '동절기' },
      { name: '누룽지탕', price: 8000, season: '동절기' },
      { name: '계란찜', price: 4000 },
      { name: '된장찌개', price: 3000 },
      { name: '공기밥', price: 1000 },
    ],
  },
];
export const won = (price: number) => price.toLocaleString('ko-KR');
