import Image from 'next/image';

export default function Join() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]">
      {/* 배경 그라데이션 및 블러 효과 */}
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#00C2FF00] to-[#FF29C3] blur-[200px] opacity-80 z-0" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-b from-[#184BFF00] to-[#174AFF] blur-[200px] opacity-80 z-0" />

      {/* 상단 바 */}
      <div className="w-full flex flex-row items-center gap-4 px-8 py-5 shadow-md bg-[#0B0B0F]/80 z-10">
        {/* 로고 심볼 */}
        <div className="relative w-10 h-10 flex items-center justify-center">
          <div className="absolute w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED]" />
          <div className="absolute left-1.5 top-1.5 w-7 h-7 rounded-[12px] bg-white" />
        </div>
        <span className="text-[28px] font-extrabold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text select-none font-pretendard">
          LOOKIT
        </span>
      </div>

      {/* 회원가입 info-block */}
      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-[833px] mt-16">
        <div className="w-full bg-[#1A1B23] rounded-[25px] p-12 flex flex-col gap-12 shadow-lg">
          {/* 타이틀 및 단계 */}
          <div className="flex flex-col items-center gap-4">
            <div className="text-[32px] font-bold tracking-widest text-white font-pretendard">
              회원가입
            </div>
            <div className="flex flex-row items-center gap-4">
              <span className="text-xs text-white font-pretendard">
                계정 인증
              </span>
              <span className="w-4 h-0.5 bg-[#B982FF] rounded-full" />
              <span className="text-xs text-white font-pretendard">
                정보 입력
              </span>
            </div>
          </div>
          {/* 입력 폼 */}
          <form className="flex flex-col gap-8 items-center w-full max-w-[353px] mx-auto">
            {/* 이름 */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-white font-pretendard">
                이름
              </label>
              <input
                type="text"
                placeholder="이름을 입력해주세요"
                className="w-full px-4 py-3 rounded-[10px] border border-[#D8DADC] bg-white text-black placeholder:text-black/50 font-pretendard"
              />
            </div>
            {/* 성별 */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-white font-pretendard">
                성별
              </label>
              <select className="w-full px-4 py-3 rounded-[10px] border border-[#D8DADC] bg-white text-black font-pretendard">
                <option value="">성별을 선택해주세요</option>
                <option value="male">남성</option>
                <option value="female">여성</option>
                <option value="other">기타</option>
              </select>
            </div>
            {/* 생년월일 */}
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium text-white font-pretendard">
                생년월일
              </label>
              <input
                type="text"
                placeholder="YYYY.MM.DD"
                className="w-full px-4 py-3 rounded-[10px] border border-[#D8DADC] bg-white text-black placeholder:text-black/50 font-pretendard"
              />
            </div>
            {/* 가입하기 버튼 */}
            <button
              type="submit"
              className="w-full py-4 mt-4 rounded-[10px] bg-[#B982FF] text-white font-semibold text-lg font-pretendard hover:brightness-95 transition-all"
            >
              가입하기
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
