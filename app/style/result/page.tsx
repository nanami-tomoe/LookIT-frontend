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

export default function StyleResult() {
  const router = useRouter();
  const [result, setResult] = useState<StyleResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(
          'http://localhost:8080/api/v0/style-analysis/result',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResult(res.data?.data || null);
      } catch (err) {
        setError('결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
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
            <div className="py-3 text-[#9B51E0] font-bold border-b border-[#E5E5EA] bg-[#f7f3ff]">
              00 자가진단 및 머신러닝 분석 결과
            </div>
            <div className="py-3 text-[#666] border-b border-[#E5E5EA] hover:bg-[#f7f3ff] cursor-pointer">
              01 체형 보완 스타일 팁
            </div>
            <div className="py-3 text-[#666] border-b border-[#E5E5EA] hover:bg-[#f7f3ff] cursor-pointer">
              02 얼굴 분위기에 따른 추천 스타일
            </div>
            <div className="py-3 text-[#666] hover:bg-[#f7f3ff] cursor-pointer">
              03 바디타입과 얼굴 분위기에 따른 브랜드 추천
            </div>
          </nav>
        </aside>
        {/* 메인 컨텐츠 */}
        <main className="flex-1 flex flex-col items-center px-4 md:px-16 py-12">
          <div className="w-full max-w-5xl">
            <h1 className="text-[28px] md:text-[32px] font-extrabold text-[#222] mb-2">
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
              <h2 className="text-[22px] font-bold text-[#9B51E0] mb-4">
                01 체형 보완 스타일 팁
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              <div className="text-[#aaa] text-base">(추후 제공 예정)</div>
            </div>
            <div className="mt-16">
              <h2 className="text-[22px] font-bold text-[#9B51E0] mb-4">
                02 얼굴 분위기에 따른 추천 스타일
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              <div className="text-[#aaa] text-base">(추후 제공 예정)</div>
            </div>
            <div className="mt-16">
              <h2 className="text-[22px] font-bold text-[#9B51E0] mb-4">
                03 바디타입과 얼굴 분위기에 따른 브랜드 추천
              </h2>
              <div className="w-full h-[1px] bg-[#E5E5EA] mb-8" />
              <div className="text-[#aaa] text-base">(추후 제공 예정)</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
