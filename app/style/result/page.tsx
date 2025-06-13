'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function StyleResult() {
  const router = useRouter();
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[700px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          AI 스타일 추천 - 결과 보고서
        </h1>
        <div className="bg-white/80 rounded-2xl p-8 w-full shadow-lg border border-[#e5e5e5] flex flex-col items-center gap-6">
          <div className="text-[22px] font-bold text-[#0b0b0f] mb-2">
            추천 스타일: 캐주얼
          </div>
          <div className="text-[16px] text-[#484848] mb-4 text-center">
            분석 결과, 당신에게는 캐주얼 스타일이 잘 어울립니다!
            <br />
            밝은색, 트렌디, 심플 키워드가 반영되었습니다.
          </div>
          <div className="flex flex-row gap-4 items-center justify-center">
            <div className="w-[120px] h-[160px] bg-[#eee] rounded-lg flex items-center justify-center text-[#aaa]">
              예시 이미지
            </div>
            <div className="w-[120px] h-[160px] bg-[#eee] rounded-lg flex items-center justify-center text-[#aaa]">
              예시 이미지
            </div>
          </div>
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
