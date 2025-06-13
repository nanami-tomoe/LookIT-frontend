import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]">
      {/* 배경 그라데이션 및 블러 효과 */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#00C2FF00] to-[#FF29C3] blur-[200px] opacity-80 z-0" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#184BFF00] to-[#174AFF] blur-[200px] opacity-80 z-0" />

      {/* 메인 컨테이너 */}
      <main className="relative z-10 flex flex-col items-center gap-12 w-full max-w-[1172px] px-4">
        {/* 로고 및 텍스트 그룹 */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* LOOKIT 로고 (피그마 구조 반영) */}
          <div className="flex flex-row items-center gap-4">
            {/* SVG 로고로 교체 */}
            <Image src="/logo.svg" alt="LOOKIT 로고" width={64} height={64} />
            {/* LOOKIT 텍스트 */}
            <span className="text-[40px] font-extrabold leading-[1.2] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text select-none font-pretendard">
              LOOKIT
            </span>
          </div>
          {/* 설명 텍스트 */}
          <div className="mt-2 text-[32px] font-normal text-center text-[#fff] leading-[0.75]">
            여러분의 스타일 가이드 룩잇에 오신걸 환영합니다 :)
          </div>
          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="mt-8 flex items-center justify-center gap-2 w-[320px] h-14 bg-[#FEE500] rounded-lg shadow font-semibold text-[#3C1E1E] text-lg hover:brightness-95 transition-all"
          >
            {/* 카카오 로고 SVG */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <ellipse cx="12" cy="12" rx="12" ry="12" fill="#3C1E1E" />
              <path
                d="M12 6C8.68629 6 6 8.23858 6 10.95C6 12.5632 7.18444 13.9632 9.00001 14.7L8.5 17L11.0711 15.4853C11.3742 15.4951 11.6852 15.5 12 15.5C15.3137 15.5 18 13.2614 18 10.55C18 8.23858 15.3137 6 12 6Z"
                fill="#FEE500"
              />
            </svg>
            카카오로 시작하기
          </button>
        </div>
        {/* 이미지/텍스처/추가 요소 자리 (필요시 public에 추가) */}
        {/* <div className="w-full h-80 bg-gray-800 rounded-2xl opacity-70" /> */}
      </main>
    </div>
  );
}
