'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function StyleResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResult = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('http://localhost:8080/api/v0/face-mood', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // 서버 응답 예시: { success: true, data: [{ faceMood: 'STRAIGHT_SKELETON' }], error: null }
        setResult(res.data?.data?.[0]?.faceMood || null);
      } catch (err) {
        setError('결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  // 결과값 한글 변환
  const getResultText = (code: string | null) => {
    switch (code) {
      case 'STRAIGHT_SKELETON':
        return '직선 골격형';
      case 'CURVED_VOLUME':
        return '곡선 볼륨형';
      case 'BALANCE_TYPE':
        return '밸런스형';
      default:
        return code || '-';
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[700px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          AI 스타일 추천 - 결과 보고서
        </h1>
        <div className="bg-white/80 rounded-2xl p-8 w-full shadow-lg border border-[#e5e5e5] flex flex-col items-center gap-6">
          {loading ? (
            <div className="text-[#9B51E0] text-lg font-bold">
              결과를 불러오는 중...
            </div>
          ) : error ? (
            <div className="text-red-500 text-lg font-bold">{error}</div>
          ) : (
            <>
              <div className="text-[22px] font-bold text-[#0b0b0f] mb-2">
                분석 결과:{' '}
                <span className="bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text">
                  {getResultText(result)}
                </span>
              </div>
              <div className="text-[16px] text-[#484848] mb-4 text-center">
                AI가 분석한 당신의 얼굴/체형 분위기 결과입니다.
                <br />
                맞춤 스타일 추천을 곧 만나보세요!
              </div>
            </>
          )}
        </div>
        <button
          className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[18px] font-pretendard shadow hover:brightness-110 transition"
          onClick={() => router.push('/style/upload')}
        >
          다시하기
        </button>
      </main>
    </div>
  );
}
