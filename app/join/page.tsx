'use client';

import Image from 'next/image';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRouter } from 'next/navigation';

export default function Join() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push('/complete');
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[659px] mx-auto">
        {/* info-block 복원: 회원가입 단계 UI */}
        <div className="w-full rounded-[25px] p-0 relative">
          {/* 배경만 투명 */}
          <div className="absolute inset-0 w-full h-full bg-[#1A1B23] rounded-[25px] opacity-50 z-0" />
          {/* 컨텐츠는 불투명 */}
          <div className="relative z-10 p-12 flex flex-col gap-12">
            {/* 타이틀 및 단계 */}
            <div className="flex flex-col items-center gap-[30px]">
              <div className="text-[32px] font-bold tracking-widest text-white font-pretendard text-center">
                회원가입
              </div>
              {/* 단계 표시 UI */}
              <div className="flex flex-row items-end gap-[10px] relative">
                {/* 계정 인증 */}
                <div className="flex flex-col items-center">
                  <img
                    src="/check_icon.svg"
                    alt="체크 아이콘"
                    width={40}
                    height={40}
                    className="mb-1"
                  />
                  <span className="text-[12px] text-white font-pretendard text-center">
                    계정 인증
                  </span>
                </div>
                {/* 구분선 */}
                <span
                  className="w-[65px] h-0.5 bg-[#b982ff] rounded-full"
                  style={{ position: 'relative', top: '-35px' }}
                />
                {/* 정보 입력 */}
                <div className="flex flex-col items-center">
                  <img
                    src="/edit_icon.svg"
                    alt="수정 아이콘"
                    width={30}
                    height={30}
                    className="mb-[6px]"
                  />
                  <span className="text-[12px] text-white font-pretendard text-center mt-0.5 translate-y-0.49">
                    정보 입력
                  </span>
                </div>
              </div>
            </div>
            {/* 회원가입 입력 폼 */}
            <form
              className="flex flex-col gap-6 w-full max-w-[353px] mx-auto"
              onSubmit={handleSubmit}
            >
              {/* 이름 */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="text-[14px] text-white font-pretendard font-medium"
                >
                  이름
                </label>
                <input
                  id="name"
                  type="text"
                  className="h-14 px-4 rounded-[10px] bg-white text-black placeholder-black/50 outline-none border border-[#d8dadc] focus:border-[#B982FF] transition text-[16px] font-pretendard"
                  placeholder="이름을 입력해주세요"
                />
                {/* 에러 메시지 자리 */}
                {/* <span className="text-[13px] text-[#e64646] font-medium font-inter mt-1">Error</span> */}
              </div>
              {/* 성별 */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-[14px] text-white font-pretendard font-medium"
                >
                  성별
                </label>
                <select
                  id="gender"
                  name="gender"
                  className="h-14 px-4 rounded-[10px] bg-white text-black placeholder-black/50 outline-none border border-[#d8dadc] focus:border-[#B982FF] transition text-[16px] font-pretendard appearance-none"
                >
                  <option value="" disabled selected>
                    성별을 선택해주세요
                  </option>
                  <option value="male">남자</option>
                  <option value="female">여자</option>
                </select>
                {/* 에러 메시지 자리 */}
                {/* <span className="text-[13px] text-[#e64646] font-medium font-inter mt-1">Error</span> */}
              </div>
              {/* 생년월일 */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="birth"
                  className="text-[14px] text-white font-pretendard font-medium"
                >
                  생년월일
                </label>
                <input
                  id="birth"
                  type="text"
                  className="h-14 px-4 rounded-[10px] bg-white text-black placeholder-black/50 outline-none border border-[#d8dadc] focus:border-[#B982FF] transition text-[16px] font-pretendard"
                  placeholder="YYYY.MM.DD"
                  maxLength={10}
                />
                {/* 에러 메시지 자리 */}
                {/* <span className="text-[13px] text-[#e64646] font-medium font-inter mt-1">Error</span> */}
              </div>
              {/* 가입하기 버튼 */}
              <button
                type="submit"
                className="mt-2 h-14 rounded-[10px] bg-[#b982ff] text-white font-semibold text-[16px] font-pretendard shadow hover:brightness-110 transition"
              >
                가입하기
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
