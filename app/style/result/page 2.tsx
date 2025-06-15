'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

interface StyleResultData {
  bodyAnalysis: string | null;
  bodyType: string | null;
  faceShape: string | null;
  faceMood: string | null;
}

export default function StyleResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<StyleResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  // 한글 변환 함수
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

  let content = null;
  if (loading) {
    content = (
      <div className="text-[#9B51E0] text-lg font-bold py-12">
        결과를 불러오는 중...
      </div>
    );
  } else if (error) {
    content = (
      <div className="text-red-500 text-lg font-bold py-12">{error}</div>
    );
  } else if (result) {
    if (!result.bodyType || !result.faceMood) {
      content = (
        <div className="flex flex-col items-center gap-4 py-12">
          <Image
            src="/user_icon.svg"
            alt="자가진단 필요"
            width={48}
            height={48}
          />
          <div className="text-[#9B51E0] text-xl font-bold">
            자가진단이 완료되지 않았습니다.
          </div>
          <div className="text-[#666] text-base">
            바디타입/얼굴 분위기 자가진단을 먼저 완료해 주세요.
          </div>
        </div>
      );
    } else if (result.bodyAnalysis == null || result.faceShape == null) {
      content = (
        <div className="flex flex-col items-center gap-4 py-12">
          <Image src="/ai_icon.svg" alt="AI 분석중" width={64} height={64} />
          <div className="text-[#9B51E0] text-xl font-bold">
            AI 분석 중입니다.
          </div>
          <div className="text-[#666] text-base">
            이미지 업로드 후 AI가 분석을 진행 중입니다.
            <br />
            잠시 후 다시 확인해 주세요.
          </div>
        </div>
      );
    } else {
      content = (
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="flex flex-col items-center gap-2">
            <Image src="/celebration.png" alt="축하" width={80} height={80} />
            <div className="text-[22px] font-bold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text">
              AI 스타일 분석 결과
            </div>
            <div className="text-[#666] text-base">
              당신만을 위한 스타일 분석 리포트입니다.
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {/* 카드 데이터 매핑 */}
            {result &&
              cardData.map((card) => {
                const value = result[card.key as keyof typeof result] as
                  | string
                  | null;
                if (!value) return null;
                return (
                  <div
                    key={card.key}
                    className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center"
                  >
                    <img
                      src={card.img[value]}
                      alt={card.title[value]}
                      className="w-full h-48 object-cover rounded-xl mb-4"
                    />
                    <div className="text-lg font-bold mb-2">
                      {card.title[value]}
                    </div>
                    <div className="text-xs text-[#888] mb-1">{card.label}</div>
                    <div className="text-sm text-[#444] text-center">
                      {card.desc[value]}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      );
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-[#F5F5F7]">
      <Header />
      <div className="flex flex-row w-full min-h-screen">
        {/* 좌측 사이드바 */}
        <aside className="hidden md:flex flex-col w-[260px] bg-white border-r border-[#E5E5EA] py-12 px-8 gap-8 sticky top-0 h-screen z-20 shadow-sm">
          <div className="text-[20px] font-bold text-[#9B51E0] mb-6">
            AI 스타일 추천
          </div>
          <nav className="flex flex-col gap-0 w-full">
            <div className="py-3 text-[#222] font-semibold border-b border-[#E5E5EA]">
              00 자가진단 및 머신러닝 분석 결과
            </div>
            <div className="py-3 text-[#666] border-b border-[#E5E5EA]">
              01 체형 보완 스타일 팁
            </div>
            <div className="py-3 text-[#666] border-b border-[#E5E5EA]">
              02 얼굴 분위기에 따른 추천 스타일
            </div>
            <div className="py-3 text-[#666]">
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
            <div className="flex flex-col md:flex-row gap-8 w-full">
              {/* 카드 데이터 매핑 */}
              {result &&
                cardData.map((card) => {
                  const value = result[card.key as keyof typeof result] as
                    | string
                    | null;
                  if (!value) return null;
                  return (
                    <div
                      key={card.key}
                      className="flex-1 bg-white rounded-2xl shadow p-6 flex flex-col items-center"
                    >
                      <img
                        src={card.img[value]}
                        alt={card.title[value]}
                        className="w-full h-48 object-cover rounded-xl mb-4"
                      />
                      <div className="text-lg font-bold mb-2">
                        {card.title[value]}
                      </div>
                      <div className="text-xs text-[#888] mb-1">
                        {card.label}
                      </div>
                      <div className="text-sm text-[#444] text-center">
                        {card.desc[value]}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// 카드 데이터 매핑
interface CardData {
  key: keyof StyleResultData;
  title: Record<string, string>;
  desc: Record<string, string>;
  img: Record<string, string>;
  label: string;
}
const cardData: CardData[] = [
  {
    key: 'bodyType',
    title: {
      STRAIGHT: '스트레이트',
      WAVE: '웨이브',
      NATURAL: '내추럴',
    },
    desc: {
      STRAIGHT:
        '상체와 하체가 전체적으로 곧고 직선적인 실루엣. 심플하고 미니멀한 스타일이 잘 어울립니다.',
      WAVE: '곡선미가 강조되는 실루엣. 부드러운 소재와 곡선 라인의 옷이 잘 어울립니다.',
      NATURAL:
        '골격이 뚜렷하고 중성적인 느낌. 내추럴하고 편안한 스타일이 잘 어울립니다.',
    },
    img: {
      STRAIGHT:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      WAVE: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
      NATURAL:
        'https://images.unsplash.com/photo-1469398715555-76331a6c7b49?auto=format&fit=facearea&w=400&h=400',
    },
    label: '자가진단 바디타입',
  },
  {
    key: 'bodyAnalysis',
    title: {
      UPPER_CURVY: '상체 볼륨형',
      UPPER_STRAIGHT: '상체 직선형',
      LOWER_CURVY: '하체 볼륨형',
      LOWER_STRAIGHT: '하체 직선형',
      BALANCED_CURVY: '균형 볼륨형',
      BALANCED_STRAIGHT: '균형 직선형',
    },
    desc: {
      UPPER_CURVY:
        '상체에 볼륨이 집중된 체형. 상의는 심플하게, 하의는 포인트를 주는 스타일이 어울립니다.',
      UPPER_STRAIGHT:
        '상체가 곧고 직선적인 체형. 다양한 상의 스타일이 잘 어울립니다.',
      LOWER_CURVY:
        '하체에 볼륨이 집중된 체형. 하의는 심플하게, 상의에 포인트를 주는 스타일이 어울립니다.',
      LOWER_STRAIGHT:
        '하체가 곧고 직선적인 체형. 다양한 하의 스타일이 잘 어울립니다.',
      BALANCED_CURVY:
        '상하체가 균형 잡힌 곡선형 체형. 전체적으로 곡선미를 살린 스타일이 어울립니다.',
      BALANCED_STRAIGHT:
        '상하체가 균형 잡힌 직선형 체형. 미니멀하고 심플한 스타일이 잘 어울립니다.',
    },
    img: {
      UPPER_CURVY:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      UPPER_STRAIGHT:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
      LOWER_CURVY:
        'https://images.unsplash.com/photo-1469398715555-76331a6c7b49?auto=format&fit=facearea&w=400&h=400',
      LOWER_STRAIGHT:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      BALANCED_CURVY:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
      BALANCED_STRAIGHT:
        'https://images.unsplash.com/photo-1469398715555-76331a6c7b49?auto=format&fit=facearea&w=400&h=400',
    },
    label: '머신러닝 체형 분석',
  },
  {
    key: 'faceMood',
    title: {
      BALANCE_TYPE: '밸런스형',
      CURVED_VOLUME: '곡선 볼륨형',
      STRAIGHT_SKELETON: '직선 골격형',
    },
    desc: {
      BALANCE_TYPE:
        '얼굴의 각 요소가 균형 잡힌 분위기. 다양한 스타일이 무난하게 어울립니다.',
      CURVED_VOLUME:
        '부드럽고 곡선미가 강조된 얼굴 분위기. 러블리/페미닌 스타일이 잘 어울립니다.',
      STRAIGHT_SKELETON:
        '각지고 직선적인 얼굴 분위기. 시크/모던 스타일이 잘 어울립니다.',
    },
    img: {
      BALANCE_TYPE:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      CURVED_VOLUME:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
      STRAIGHT_SKELETON:
        'https://images.unsplash.com/photo-1469398715555-76331a6c7b49?auto=format&fit=facearea&w=400&h=400',
    },
    label: '자가진단 얼굴 분위기',
  },
  {
    key: 'faceShape',
    title: {
      OVAL: '타원형',
      ROUND: '둥근형',
      SQUARE: '각진형',
      HEART: '하트형',
      OBLONG: '긴형',
    },
    desc: {
      OVAL: '부드러운 곡선의 타원형 얼굴. 다양한 헤어/스타일이 잘 어울립니다.',
      ROUND:
        '둥글고 귀여운 인상의 얼굴형. 러블리/캐주얼 스타일이 잘 어울립니다.',
      SQUARE: '각지고 강인한 인상의 얼굴형. 시크/모던 스타일이 잘 어울립니다.',
      HEART:
        '이마가 넓고 턱이 좁은 하트형 얼굴. 페미닌/로맨틱 스타일이 잘 어울립니다.',
      OBLONG:
        '길고 슬림한 인상의 얼굴형. 미니멀/클래식 스타일이 잘 어울립니다.',
    },
    img: {
      OVAL: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      ROUND:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
      SQUARE:
        'https://images.unsplash.com/photo-1469398715555-76331a6c7b49?auto=format&fit=facearea&w=400&h=400',
      HEART:
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=facearea&w=400&h=400',
      OBLONG:
        'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=facearea&w=400&h=400',
    },
    label: '머신러닝 얼굴형',
  },
];
