'use client';

import Image from 'next/image';
import Background from '@/components/Background';
import Header from '@/components/Header';

export default function MainHome() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[1172px] mx-auto gap-20 px-4">
        {/* 상단 영역: 로고, 설명 */}
        <section className="flex flex-col items-center gap-6 w-full">
          <div className="flex flex-row items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center">
              <Image src="/logo.svg" alt="LOOKIT 로고" width={64} height={64} />
            </div>
            <span
              className="text-[40px] font-extrabold leading-[1.2] text-transparent bg-clip-text select-none font-pretendard"
              style={{
                backgroundImage:
                  'linear-gradient(36.02deg, #9B51E0 0%, #3081ED 100%)',
              }}
            >
              LOOKIT
            </span>
          </div>
          <div className="mt-2 text-[32px] font-normal text-center text-[#fff] leading-[0.75]">
            오늘은 어떤 스타일 서비스를 이용하시겠어요?
          </div>
        </section>

        {/* 서비스 카드 영역 */}
        <section className="flex flex-row gap-10 w-full justify-center">
          {/* AI 스타일 추천 카드 */}
          <div className="flex flex-col items-center bg-[rgba(26,27,35,0.7)] rounded-[25px] p-8 gap-8 w-[380px] shadow-lg">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2">
                {/* 예시 아이콘: 교체 필요 */}
                <Image
                  src="/ai-style-icon.svg"
                  alt="AI 스타일 추천"
                  width={56}
                  height={56}
                />
              </div>
              <div className="text-[32px] font-bold text-white font-pretendard text-center">
                AI 스타일 추천
              </div>
              <div className="text-[16px] text-[#898CA9] text-center leading-[1.5]">
                AI가 나에게 어울리는 스타일을 추천해줘요
              </div>
            </div>
            <button className="mt-2 h-14 rounded-[10px] bg-[#b982ff] text-white font-semibold text-[16px] font-pretendard shadow hover:brightness-110 transition flex flex-row items-center justify-center gap-2 w-full">
              <span>Get Started</span>
              <Image
                src="/arrow-right.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
          {/* AI 가상 피팅 카드 */}
          <div className="flex flex-col items-center bg-[rgba(26,27,35,0.7)] rounded-[25px] p-8 gap-8 w-[380px] shadow-lg">
            <div className="flex flex-col items-center gap-4 w-full">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mb-2">
                {/* 예시 아이콘: 교체 필요 */}
                <Image
                  src="/ai-fitting-icon.svg"
                  alt="AI 가상 피팅"
                  width={56}
                  height={56}
                />
              </div>
              <div className="text-[32px] font-bold text-white font-pretendard text-center">
                AI 가상 피팅
              </div>
              <div className="text-[16px] text-[#898CA9] text-center leading-[1.5]">
                AI로 옷을 가상으로 입어볼 수 있어요
              </div>
            </div>
            <button className="mt-2 h-14 rounded-[10px] bg-[#b982ff] text-white font-semibold text-[16px] font-pretendard shadow hover:brightness-110 transition flex flex-row items-center justify-center gap-2 w-full">
              <span>Get Started</span>
              <Image
                src="/arrow-right.svg"
                alt="arrow"
                width={24}
                height={24}
              />
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
