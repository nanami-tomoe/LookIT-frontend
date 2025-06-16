import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  darkText?: boolean;
  resultPageMode?: boolean;
}

const Header = ({ darkText = false, resultPageMode = false }: HeaderProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const textColor = darkText ? 'text-[#222]' : 'text-white';
  const logoTextColor =
    'bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-transparent bg-clip-text';
  const isStyleResult = pathname === '/style/result' || resultPageMode;

  if (isStyleResult) {
    return (
      <div className="w-full flex flex-row items-center justify-between gap-4 px-8 py-5 z-10 bg-white shadow-sm border-b border-[#ececf3]">
        <div className="flex flex-row items-center gap-4">
          <Link href="/home" className="flex flex-row items-center gap-4 group">
            <div className="relative w-10 h-10 flex items-center justify-center">
              <Image src="/logo.svg" alt="LOOKIT Logo" width={40} height={40} />
            </div>
            <span
              className={`text-[28px] font-extrabold select-none font-pretendard group-hover:opacity-80 transition ${logoTextColor}`}
            >
              LOOKIT
            </span>
          </Link>
        </div>
        <div className="flex flex-row items-center gap-8">
          <span className="text-[16px] font-pretendard font-bold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] bg-clip-text text-transparent cursor-default select-none px-1">
            스타일 추천
          </span>
          <Link
            href="/fitting"
            className={`text-[16px] font-pretendard transition ${textColor}
              hover:font-bold hover:bg-gradient-to-br hover:from-[#9B51E0] hover:to-[#3081ED] hover:bg-clip-text hover:text-transparent`}
          >
            AI 가상 피팅
          </Link>
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full transition group bg-transparent"
            onClick={() => router.push('/fitting/history')}
            type="button"
            tabIndex={0}
            aria-label="가상 피팅 내역"
          >
            <span className="inline-flex items-center justify-center w-8 h-8">
              <Image
                src="/user_icon.svg"
                alt="가상 피팅 내역"
                width={28}
                height={28}
                className="transition group-hover:from-[#9B51E0] group-hover:to-[#3081ED] group-hover:bg-gradient-to-br group-hover:bg-clip-text group-hover:text-transparent"
                style={darkText ? {} : { filter: 'invert(1) brightness(2)' }}
              />
            </span>
          </button>
        </div>
      </div>
    );
  }

  // 기존 헤더 디자인 (다른 페이지)
  return (
    <div className="w-full flex flex-row items-center justify-between gap-4 px-8 py-5 z-10">
      <div className="flex flex-row items-center gap-4">
        <Link href="/home" className="flex flex-row items-center gap-4 group">
          <div className="relative w-10 h-10 flex items-center justify-center">
            <Image src="/logo.svg" alt="LOOKIT Logo" width={40} height={40} />
          </div>
          <span
            className={`text-[28px] font-extrabold select-none font-pretendard group-hover:opacity-80 transition ${logoTextColor}`}
          >
            LOOKIT
          </span>
        </Link>
      </div>
      <div className="flex flex-row items-center gap-8">
        <Link
          href="/style"
          className={`text-[16px] font-pretendard transition ${textColor} ${
            pathname === '/style'
              ? 'font-bold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] bg-clip-text text-transparent'
              : darkText
              ? 'font-medium'
              : 'font-medium'
          }
            hover:font-bold hover:bg-gradient-to-br hover:from-[#9B51E0] hover:to-[#3081ED] hover:bg-clip-text hover:text-transparent`}
        >
          스타일 추천
        </Link>
        <Link
          href="/fitting"
          className={`text-[16px] font-pretendard transition ${textColor} ${
            pathname === '/fitting'
              ? 'font-bold bg-gradient-to-br from-[#9B51E0] to-[#3081ED] bg-clip-text text-transparent'
              : darkText
              ? 'font-medium'
              : 'font-medium'
          }
            hover:font-bold hover:bg-gradient-to-br hover:from-[#9B51E0] hover:to-[#3081ED] hover:bg-clip-text hover:text-transparent`}
        >
          AI 가상 피팅
        </Link>
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#22223a] transition group"
          onClick={() => router.push('/fitting/history')}
        >
          <span
            className={darkText ? 'text-[#222]' : 'text-white'}
            style={
              darkText
                ? { color: '#222' }
                : {
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    color: 'white',
                  }
            }
          >
            <Image
              src="/user_icon.svg"
              alt="가상 피팅 내역"
              width={28}
              height={28}
              style={darkText ? {} : { filter: 'invert(1) brightness(2)' }}
            />
          </span>
        </button>
      </div>
    </div>
  );
};
export default Header;
