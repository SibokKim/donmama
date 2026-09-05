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
        src={`/images/donmama-${kind}.${kind === 'iberico' ? 'png' : 'webp'}`}
        width={1536}
        height={1024}
        unoptimized
        alt={
          kind === 'grill'
            ? '노릇하게 구운 삼겹살과 김치, 콩나물'
            : kind === 'beef'
              ? '얇게 말아 담은 우삼겹'
              : '결이 선명한 이베리코 목살'
        }
        loading="lazy"
      />
      <figcaption>연출 이미지</figcaption>
    </figure>
  );
}
