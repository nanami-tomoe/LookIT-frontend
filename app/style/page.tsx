'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useState } from 'react';

export default function StyleIntro() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    setLoading(true);
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
      console.log('API 응답:', res.data);
      const data = res.data?.data;
      if (
        data &&
        data.bodyAnalysis &&
        data.bodyType &&
        data.faceShape &&
        data.faceMood
      ) {
        router.push('/style/result');
      } else {
        router.push('/style/upload');
      }
    } catch (e) {
      router.push('/style/upload');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[700px] mx-auto gap-12 px-4">
        <h1 className="text-[36px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-4">
          AI 스타일 추천
        </h1>
        <div className="bg-white/80 rounded-2xl p-8 w-full shadow-lg border border-[#e5e5e5] flex flex-col items-center gap-6">
          <div className="text-[20px] font-bold text-[#0b0b0f] mb-2 text-center">
            나만의 스타일을 AI가 추천해드려요!
          </div>
          <ul className="text-[16px] text-[#484848] mb-4 text-center flex flex-col gap-2">
            <li>1. 얼굴/체형 사진을 업로드하세요</li>
            <li>2. 간단한 자가진단을 진행하세요</li>
            <li>3. AI가 분석한 맞춤 스타일 결과를 확인하세요</li>
          </ul>
        </div>
        <button
          className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[20px] font-pretendard shadow hover:brightness-110 transition"
          onClick={handleStart}
          disabled={loading}
        >
          {loading ? '로딩 중...' : '시작하기'}
        </button>
      </main>
    </div>
  );
}
