import Image from 'next/image';
import Link from 'next/link';

const Header = () => (
  <div className="w-full flex flex-row items-center justify-between gap-4 px-8 py-5 z-10">
    <div className="flex flex-row items-center gap-4">
      <div className="relative w-10 h-10 flex items-center justify-center">
        <Image src="/logo.svg" alt="LOOKIT Logo" width={40} height={40} />
      </div>
      <span className="text-[28px] font-extrabold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text select-none font-pretendard">
        LOOKIT
      </span>
    </div>
    <div className="flex flex-row items-center gap-8">
      <Link
        href="#"
        className="text-white text-[16px] font-medium font-pretendard hover:text-[#b982ff] transition"
      >
        스타일 추천
      </Link>
      <Link
        href="#"
        className="text-white text-[16px] font-medium font-pretendard hover:text-[#b982ff] transition"
      >
        AI 가상 피팅
      </Link>
      <Link
        href="#"
        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#22223a] transition"
      >
        <Image src="/globe.svg" alt="설정" width={28} height={28} />
      </Link>
    </div>
  </div>
);
export default Header;
