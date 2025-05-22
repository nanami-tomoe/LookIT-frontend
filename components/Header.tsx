import Image from 'next/image';

const Header = () => (
  <div className="w-full flex flex-row items-center gap-4 px-8 py-5 z-10">
    <div className="relative w-10 h-10 flex items-center justify-center">
      <Image src="/logo.svg" alt="LOOKIT Logo" width={40} height={40} />
    </div>
    <span className="text-[28px] font-extrabold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text select-none font-pretendard">
      LOOKIT
    </span>
  </div>
);
export default Header;
