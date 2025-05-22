'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Background from '@/components/Background';
// import Header from '@/components/Header';

export default function Login() {
  const router = useRouter();

  const handleKakaoLogin = () => {
    // 여기에 실제 카카오 로그인 로직 구현 예정
    // 현재는 클릭 시 회원가입 페이지(/join)로 이동만 구현
    router.push('/join');
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]">
      <Background />
      {/* <Header /> 삭제 */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-[1172px] px-4 flex-1">
        {/* 로고 및 텍스트 그룹 */}
        <div className="flex flex-col items-center gap-6 w-full">
          {/* LOOKIT 로고 (피그마 구조 반영) */}
          <div className="flex flex-row items-center gap-4">
            {/* 로고 심볼 */}
            <div className="relative w-16 h-16 flex items-center justify-center">
              {/* SVG 로고로 교체 */}
              <Image src="/logo.svg" alt="LOOKIT 로고" width={64} height={64} />
            </div>
            {/* LOOKIT 텍스트 */}
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
          {/* 설명 텍스트 */}
          <div className="mt-2 text-[32px] font-normal text-center text-[#fff] leading-[0.75]">
            여러분의 스타일 가이드 룩잇에 오신걸 환영합니다 :)
          </div>
          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="mt-8 flex items-center justify-center gap-2 w-[320px] h-14 bg-[#FEE500] rounded-lg shadow font-semibold text-[#3C1E1E] text-lg hover:brightness-95 transition-all"
            onClick={handleKakaoLogin}
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
