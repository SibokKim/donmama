import Image from 'next/image';
export function FoodPhoto({
  kind,
  compact = false,
}: {
  kind: 'grill' | 'beef';
  compact?: boolean;
}) {
  return (
    <figure className={`food-photo ${compact ? 'food-photo-compact' : ''}`}>
      <Image
        src={`/images/donmama-${kind}.webp`}
        width={1536}
        height={1024}
        unoptimized
        alt={
          kind === 'grill'
            ? '노릇하게 구운 삼겹살과 김치, 콩나물'
            : '얇게 말아 담은 우삼겹'
        }
        loading="lazy"
      />
      <figcaption>연출 이미지</figcaption>
    </figure>
  );
}
