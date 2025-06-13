import Link from 'next/link';
import Background from '@/components/Background';

export default function Complete() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0B0B0F]">
      <Background />
      {/* 축하 아이콘/일러스트 */}
      <img
        src="/celebration.png"
        alt="축하 아이콘"
        width={80}
        height={80}
        className="mb-6"
      />
      {/* 메인 메시지 */}
      <h1 className="text-[28px] font-bold text-white mb-2 text-center font-pretendard">
        가입이 완료되었습니다!
      </h1>
      {/* 서브 메시지 */}
      <p className="text-[16px] text-[#B982FF] mb-8 text-center font-pretendard">
        이제 다양한 스타일 가이드를
        <br />
        자유롭게 이용하실 수 있습니다.
      </p>
      {/* 홈으로 가기 버튼 */}
      <Link
        href="/home"
        className="px-8 py-3 rounded-[10px] bg-[#b982ff] text-white font-semibold text-[16px] font-pretendard shadow hover:brightness-110 transition"
      >
        홈으로 가기
      </Link>
    </div>
  );
}
