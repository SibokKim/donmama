import QRCode from 'qrcode';

export function validateQrUrl(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:')
      return 'http 또는 https로 시작하는 웹 주소를 입력해 주세요.';
    if (url.username || url.password)
      return '로그인 정보가 포함되지 않은 웹 주소를 입력해 주세요.';
    if (value.length > 1000)
      return 'QR 인식을 위해 더 짧은 웹 주소를 입력해 주세요.';
    return null;
  } catch {
    return '전체 웹 주소를 입력해 주세요. 예: https://example.com';
  }
}
export function createStickerSvg(url: string, embeddedFont?: string) {
  const error = validateQrUrl(url);
  if (error) throw new Error(error);
  const qr = QRCode.create(url, { errorCorrectionLevel: 'M' });
  const n = qr.modules.size;
  const quiet = 4;
  let path = '';
  for (let row = 0; row < n; row++) {
    for (let col = 0; col < n; col++) {
      if (qr.modules.get(row, col))
        path += `M${col + quiet} ${row + quiet}h1v1h-1z`;
    }
  }
  const font = embeddedFont
    ? `@font-face{font-family:StickerSerif;src:url(data:font/ttf;base64,${embeddedFont}) format('truetype');}`
    : '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="90mm" height="120mm" viewBox="0 0 900 1200" role="img" aria-labelledby="sticker-title sticker-desc"><title id="sticker-title">돈마마 테이블 QR 스티커</title><desc id="sticker-desc">메뉴 보기와 네이버 영수증 리뷰 혜택. 대패삼겹 또는 우삼겹 반 인분 서비스.</desc><defs><style>${font}.serif{font-family:StickerSerif,'Gowun Batang',Batang,serif}.sans{font-family:Arial,'Malgun Gothic',sans-serif}</style></defs><rect width="900" height="1200" rx="28" fill="#f7f5ef"/><rect x="22" y="22" width="856" height="1156" rx="17" fill="none" stroke="#858e78" stroke-width="1.5"/><g text-anchor="middle" fill="#29392e"><text x="450" y="152" class="serif" font-size="78" letter-spacing="10">돈마마</text><text x="454" y="210" class="sans" font-size="21" letter-spacing="7">DONMAMA</text><path d="M328 255H572" fill="none" stroke="#a08263" stroke-width="1.5"/><text x="450" y="342" class="serif" font-size="51" letter-spacing="-2">메뉴는 편하게,</text><text x="450" y="412" class="serif" font-size="51" letter-spacing="-2">고기는 한 접시 더.</text><svg x="292" y="478" width="316" height="316" viewBox="0 0 ${n + quiet * 2} ${n + quiet * 2}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="#ffffff"/><path d="${path}" fill="#171c17"/></svg><text x="450" y="866" class="serif" font-size="30">메뉴 보기 · 네이버 리뷰</text><text x="450" y="918" class="serif" font-size="26" fill="#636b5d">휴대폰 카메라로 QR을 비춰주세요</text><path d="M115 965H785" fill="none" stroke="#c8ccbf"/><text x="450" y="1019" class="serif" font-size="27" fill="#8b6041">영수증 리뷰 참여 시</text><text x="450" y="1067" class="serif" font-size="28">대패삼겹 또는 우삼겹 반 인분 서비스</text><text x="450" y="1134" class="serif" font-size="25" fill="#636b5d">앱 설치 없이 바로 열려요</text></g></svg>`;
}
