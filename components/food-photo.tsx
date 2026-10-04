import Image from 'next/image';
export function FoodPhoto({
  kind,
  compact = false,
}: {
  kind: 'grill' | 'beef' | 'iberico';
  compact?: boolean;
}) {
  return (
    <figure className={`food-photo ${compact ? 'food-photo-compact' : ''}`}>
      <Image
        src={
          kind === 'grill'
            ? '/images/donmama-grill-v2.webp'
            : `/images/donmama-${kind}.${kind === 'iberico' ? 'png' : 'webp'}`
        }
        width={1536}
        height={1024}
        unoptimized
        alt={
          kind === 'grill'
            ? '노릇하게 구운 삼겹살과 삼겹살 기름에 볶은 김치, 콩나물'
            : kind === 'beef'
              ? '얇게 말아 담은 우삼겹'
              : '결이 선명한 이베리코 목살'
        }
        loading="lazy"
      />
    </figure>
  );
}
