'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUserAlt, FaRegSmile, FaRegIdCard, FaRegStar } from 'react-icons/fa';

interface StyleResultData {
  bodyAnalysis: string | null;
  bodyType: string | null;
  faceShape: string | null;
  faceMood: string | null;
}

const getBodyTypeText = (code: string | null) => {
  switch (code) {
    case 'STRAIGHT':
      return '스트레이트';
    case 'WAVE':
      return '웨이브';
    case 'NATURAL':
      return '내추럴';
    default:
      return code || '-';
  }
};
const getBodyAnalysisText = (code: string | null) => {
  switch (code) {
    case 'UPPER_CURVY':
      return '상체 볼륨형';
    case 'UPPER_STRAIGHT':
      return '상체 직선형';
    case 'LOWER_CURVY':
      return '하체 볼륨형';
    case 'LOWER_STRAIGHT':
      return '하체 직선형';
    case 'BALANCED_CURVY':
      return '균형 볼륨형';
    case 'BALANCED_STRAIGHT':
      return '균형 직선형';
    default:
      return code || '-';
  }
};
const getFaceMoodText = (code: string | null) => {
  switch (code) {
    case 'BALANCE_TYPE':
      return '밸런스형';
    case 'CURVED_VOLUME':
      return '곡선 볼륨형';
    case 'STRAIGHT_SKELETON':
      return '직선 골격형';
    default:
      return code || '-';
  }
};
const getFaceShapeText = (code: string | null) => {
  switch (code) {
    case 'OVAL':
      return '타원형';
    case 'ROUND':
      return '둥근형';
    case 'SQUARE':
      return '각진형';
    case 'HEART':
      return '하트형';
    case 'OBLONG':
      return '긴형';
    default:
      return code || '-';
  }
};

const resultCardMeta = [
  {
    key: 'bodyType',
    label: '자가진단 바디타입',
    icon: <FaUserAlt size={32} className="text-[#9B51E0]" />,
    getText: getBodyTypeText,
    color: 'from-[#E0C3FC] to-[#8EC5FC] bg-gradient-to-br',
    desc: '자가진단을 통해 직접 선택한 바디타입입니다.',
  },
  {
    key: 'bodyAnalysis',
    label: '머신러닝 체형 분석',
    icon: <FaRegIdCard size={32} className="text-[#3081ED]" />,
    getText: getBodyAnalysisText,
    color: 'from-[#FDCB82] to-[#F7CE68] bg-gradient-to-br',
    desc: 'AI가 분석한 체형 결과입니다.',
  },
  {
    key: 'faceMood',
    label: '자가진단 얼굴 분위기',
    icon: <FaRegSmile size={32} className="text-[#F2994A]" />,
    getText: getFaceMoodText,
    color: 'from-[#FDCB82] to-[#F7CE68] bg-gradient-to-br',
    desc: '자가진단을 통해 직접 선택한 얼굴 분위기입니다.',
  },
  {
    key: 'faceShape',
    label: '머신러닝 얼굴형',
    icon: <FaRegStar size={32} className="text-[#27AE60]" />,
    getText: getFaceShapeText,
    color: 'from-[#C2FFD8] to-[#465EFB] bg-gradient-to-br',
    desc: 'AI가 분석한 얼굴형 결과입니다.',
  },
];

// 얼굴 골격 유형별 추천 스타일 데이터 상수 추가
const FACE_BONE_STYLES = [
  {
    type: '직선 골격형',
    code: 'STRAIGHT_SKELETON',
    desc: '얼굴에 뼈가 입체감을 담당, 콧대와 턱선, 티존이 뚜렷함',
    styles: [
      '오피스룩',
      '시크룩',
      '미니멀룩',
      '프레피룩',
      '드뮤어룩',
      '젠더리스룩',
      '댄디룩',
    ],
    detail: [
      '직선적인 실루엣이 잘 어울림',
      '구조적인 핏과 깔끔한 라인 강조',
      '하이넥, 테일러드, 셔츠류 잘 받음',
    ],
    keywords: ['시크', '모던', '섹시', '심플', '직선', '중성적', '도회적'],
    hair: [
      '미디움 길이: 너무 곡선의 둥근 느낌이 나지 않도록 스트레이트 또는 아웃컬',
      '긴 머리: 컬이 없는 자연스러운 스트레이트 롱 헤어 또는 묶은머리',
      '페이스라인컷, 허쉬컷, 네추럴업',
    ],
    hairImages: ['/faceline.png', '/hush.png', '/naturalup.png'],
  },
  {
    type: '곡선 볼륨형',
    code: 'CURVED_VOLUME',
    desc: '얼굴의 볼륨감이 부드럽게 느껴짐, 도톰한 이마와 앞광대가 볼륨을 담당',
    styles: [
      '러블리룩',
      '로맨틱룩',
      '코티지코어룩',
      '보헤미안룩',
      '빈티지룩',
      '오버핏룩',
    ],
    detail: [
      '곡선 디테일이 있는 옷이 잘 어울림',
      '프릴, 러플, 플라워, 레이스 추천',
      '둥근 카라나 A라인 스커트와 궁합 좋음',
    ],
    keywords: ['러블리', '귀여움', '여성스러움', '부드러움', '볼륨'],
    hair: [
      '긴머리 & 미디움 길이: 컬이 있는 펌',
      '단발: 굵은 C컬이 들어간 볼륨감 있는 단발',
      '빌드펌, 엘리자벳펌, 로우번',
    ],
    hairImages: ['/build.png', '/elizabeth.png', '/lowbun.png'],
  },
  {
    type: '밸런스형',
    code: 'BALANCE_TYPE',
    desc: '직선/곡선이 혼합된 중간형',
    styles: [
      '모던룩',
      '컨템포러리룩',
      '미니멀룩',
      '오버핏룩',
      '프레피룩',
      '젠더리스룩',
      '빈티지룩',
    ],
    detail: [
      '어느 정도 스타일을 두루 소화',
      '실루엣에 따라 직선/곡선 강조 가능',
    ],
    keywords: ['자연스러움', '적절한균형', '페미닌'],
    hair: [
      '긴머리: 자연스럽고 느슨하게 흐르는 컬',
      '미디움 길이: 스트레이트한 헤어의 경우 부드러운 아웃컬을 넣어주거나 앞머리나 윗 볼륨으로 곡선요소 섞기',
      '단발: 끝처리가 샤프하지 않은 C컬펌',
      '프릴펌, 포니테일, 보니펌',
    ],
    hairImages: ['/pril.png', '/ponytail.png', '/ccurl.png'],
  },
];

export default function StyleResult() {
  const router = useRouter();
  const [result, setResult] = useState<StyleResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stylingTips, setStylingTips] = useState<string | null>(null);
  const [tipsLoading, setTipsLoading] = useState(true);
  const [tipsError, setTipsError] = useState<string | null>(null);
  const [brands, setBrands] = useState<{ name: string; url: string }[] | null>(
    null
  );
  const [brandsLoading, setBrandsLoading] = useState(true);
  const [brandsError, setBrandsError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('/api/v0/style-analysis/result', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setResult(res.data?.data || null);
      } catch (err) {
        setError('결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  useEffect(() => {
    setTipsLoading(true);
    setTipsError(null);
    const token = localStorage.getItem('accessToken');
    axios
      .get('/api/v0/style-tips', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.data?.stylingTips) {
          setStylingTips(res.data.data.stylingTips);
        } else {
          console.error('스타일 팁 응답 형식 오류:', res.data);
          setStylingTips(null);
        }
      })
      .catch((e) => {
        console.error('스타일 팁 API 에러:', e);
        setTipsError('스타일 팁을 불러오지 못했습니다.');
      })
      .finally(() => setTipsLoading(false));
  }, []);

  useEffect(() => {
    setBrandsLoading(true);
    setBrandsError(null);
    const token = localStorage.getItem('accessToken');
    axios
      .get('/api/v0/brands/recommendation', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data?.success && Array.isArray(res.data.data)) {
          setBrands(res.data.data);
        } else {
          console.error('브랜드 추천 응답 형식 오류:', res.data);
          setBrandsError('브랜드 추천 데이터를 불러오지 못했습니다.');
        }
      })
      .catch((err) => {
        console.error('브랜드 추천 API 에러:', err);
        setBrandsError('브랜드 추천 데이터를 불러오지 못했습니다.');
      })
      .finally(() => setBrandsLoading(false));
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F5F5F7]">
      <Header />
      <div className="flex flex-row w-full min-h-screen">
        {/* 좌측 사이드바 목차 */}
        <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-[#E5E5EA] py-12 px-8 gap-8 sticky top-0 h-screen z-20 shadow-sm">
          <div className="text-[20px] font-bold text-[#9B51E0] mb-6">
            AI 스타일 추천
          </div>
          <nav className="flex flex-col gap-0 w-full">
            <div
              className="py-3 text-[#9B51E0] font-bold border-b border-[#E5E5EA] bg-[#f7f3ff] cursor-pointer"
              onClick={() =>
                document
                  .getElementById('section-00')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              00 자가진단 및 머신러닝 분석 결과
            </div>
            <div
              className="py-3 text-[#666] border-b border-[#E5E5EA] hover:bg-[#f7f3ff] cursor-pointer"
              onClick={() =>
                document
                  .getElementById('section-01')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              01 체형 보완 스타일 팁
            </div>
            <div
              className="py-3 text-[#666] border-b border-[#E5E5EA] hover:bg-[#f7f3ff] cursor-pointer"
              onClick={() =>
                document
                  .getElementById('section-02')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              02 얼굴 분위기에 따른 추천 스타일
            </div>
            <div
              className="py-3 text-[#666] hover:bg-[#f7f3ff] cursor-pointer"
              onClick={() =>
                document
                  .getElementById('section-03')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              03 바디타입과 얼굴 분위기에 따른 브랜드 추천
            </div>
          </nav>
        </aside>
        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col items-center px-4 md:px-16 py-12">
          <div className="w-full max-w-5xl">
            <h1
              id="section-00"
              className="text-[28px] md:text-[32px] font-extrabold text-[#222] mb-2"
            >
              00 자가진단 및 머신러닝 분석 결과
            </h1>
            <div className="w-full h-[2px] bg-[#E5E5EA] mb-10" />
            {/* 결과 카드 그리드 */}
            {loading ? (
              <div className="text-[#9B51E0] text-lg font-bold py-12">
                결과를 불러오는 중...
              </div>
            ) : error ? (
              <div className="text-red-500 text-lg font-bold py-12">
                {error}
              </div>
            ) : result ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-3xl mx-auto mb-12">
                {resultCardMeta.map((meta) => (
                  <div
                    key={meta.key}
                    className={`rounded-2xl shadow-lg p-7 flex flex-col items-center justify-center min-h-[180px] ${meta.color} text-[#222] relative overflow-hidden`}
                  >
                    <div className="absolute right-4 top-4 opacity-10 text-[60px] pointer-events-none select-none">
                      {meta.icon}
                    </div>
                    <div className="flex flex-row items-center gap-3 z-10">
                      <span className="text-[22px] font-bold">
                        {meta.label}
                      </span>
                    </div>
                    <div className="mt-4 text-[28px] font-extrabold text-[#222]">
                      {meta.getText(result[meta.key as keyof StyleResultData])}
                    </div>
                    <div className="mt-1 text-[16px] text-[#666] font-mono">
                      {result[meta.key as keyof StyleResultData] || '-'}
                    </div>
                    <div className="mt-3 text-[15px] text-[#555] text-center">
                      {meta.desc}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
            {/* 01~03번 섹션 목차만 표시 */}
            <div className="mt-16">
              <h2
                id="section-01"
                className="text-[22px] font-bold text-[#9B51E0] mb-4"
              >
                01 체형 보완 스타일 팁
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              {tipsLoading ? (
                <div className="text-[#9B51E0] text-lg font-bold py-12">
                  스타일 팁을 불러오는 중...
                </div>
              ) : tipsError ? (
                <div className="text-red-500 text-lg font-bold py-12">
                  {tipsError}
                </div>
              ) : stylingTips ? (
                <div className="whitespace-pre-line text-[#333] text-[16px] leading-relaxed bg-white/80 rounded-xl p-6 shadow max-w-2xl mx-auto">
                  {stylingTips}
                </div>
              ) : (
                <div className="text-[#aaa] text-base">(추후 제공 예정)</div>
              )}
            </div>
            <div className="mt-16">
              <h2
                id="section-02"
                className="text-[22px] font-bold text-[#9B51E0] mb-4"
              >
                02 얼굴 분위기에 따른 추천 스타일
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              {loading ? (
                <div className="text-[#9B51E0] text-lg font-bold py-12">
                  결과를 불러오는 중...
                </div>
              ) : error ? (
                <div className="text-red-500 text-lg font-bold py-12">
                  {error}
                </div>
              ) : result && result.faceMood ? (
                (() => {
                  const data = FACE_BONE_STYLES.find(
                    (item) => item.code === result.faceMood
                  );
                  if (!data) return <div>분석 결과를 찾을 수 없습니다.</div>;
                  return (
                    <div className="rounded-xl bg-white/90 p-8 shadow-lg max-w-2xl mx-auto">
                      <h3 className="text-xl font-bold mb-2">{data.type}</h3>
                      <div className="text-gray-600 mb-4">{data.desc}</div>
                      <div className="mb-4">
                        <b>추천 스타일:</b> {data.styles.join(', ')}
                      </div>
                      <ul className="mb-4 list-disc pl-5">
                        {data.detail.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                      <div className="mb-4">
                        <b>키워드:</b> {data.keywords.join(', ')}
                      </div>
                      <div className="mb-4">
                        <b>추천 헤어스타일:</b>
                        <ul className="list-disc pl-5">
                          {data.hair.map((h, i) => (
                            <li key={i}>{h}</li>
                          ))}
                        </ul>
                        <div className="flex gap-2 mt-2">
                          {data.hairImages.map((src, i) => (
                            <img
                              key={i}
                              src={src}
                              alt="헤어스타일 예시"
                              className="w-24 h-24 object-cover rounded-lg border"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : (
                <div className="text-[#aaa] text-base">
                  분석 결과가 없습니다.
                </div>
              )}
            </div>
            <div className="mt-16">
              <h2
                id="section-03"
                className="text-[22px] font-bold text-[#9B51E0] mb-4"
              >
                03 바디타입과 얼굴 분위기에 따른 브랜드 추천
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              {brandsLoading ? (
                <div className="text-[#9B51E0] text-lg font-bold py-12">
                  브랜드 추천을 불러오는 중...
                </div>
              ) : brandsError ? (
                <div className="text-red-500 text-lg font-bold py-12">
                  {brandsError}
                </div>
              ) : brands && brands.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {brands.map((brand, i) => (
                    <a
                      key={brand.name + brand.url}
                      href={brand.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block rounded-xl bg-white/90 shadow p-6 hover:shadow-lg transition border border-[#e5e5e5] hover:border-[#b982ff] group"
                    >
                      <div className="text-[18px] font-bold text-[#222] group-hover:text-[#9B51E0] mb-2 truncate">
                        {i + 1}. {brand.name}
                      </div>
                      <div className="text-[14px] text-[#3081ED] underline break-all">
                        {brand.url}
                      </div>
                    </a>
                  ))}
                </div>
              ) : (
                <div className="text-[#aaa] text-base">
                  추천 브랜드가 없습니다.
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
