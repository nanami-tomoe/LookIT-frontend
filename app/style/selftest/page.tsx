'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StyleSelfTest() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[600px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          AI 스타일 추천 - 자가진단
        </h1>
        <div className="flex flex-row items-center justify-center w-full max-w-[500px] mx-auto mt-2 mb-0 select-none gap-[15px]">
          <div className="w-[100px] h-[5px] rounded-[5px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
        </div>
        <form className="flex flex-col gap-8 w-full">
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              1. 평소 선호하는 스타일은?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="q1"
                value="캐주얼"
                onChange={handleChange}
              />{' '}
              캐주얼
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="q1"
                value="포멀"
                onChange={handleChange}
              />{' '}
              포멀
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="q1"
                value="스트릿"
                onChange={handleChange}
              />{' '}
              스트릿
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              2. 평소 즐겨 입는 색상은?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="q2"
                value="밝은색"
                onChange={handleChange}
              />{' '}
              밝은색
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="q2"
                value="어두운색"
                onChange={handleChange}
              />{' '}
              어두운색
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="q2"
                value="파스텔톤"
                onChange={handleChange}
              />{' '}
              파스텔톤
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              3. 원하는 스타일 키워드를 선택하세요
            </div>
            <label className="block text-white">
              <input
                type="checkbox"
                name="q3"
                value="트렌디"
                onChange={handleChange}
              />{' '}
              트렌디
            </label>
            <label className="block text-white">
              <input
                type="checkbox"
                name="q3"
                value="심플"
                onChange={handleChange}
              />{' '}
              심플
            </label>
            <label className="block text-white">
              <input
                type="checkbox"
                name="q3"
                value="유니크"
                onChange={handleChange}
              />{' '}
              유니크
            </label>
          </div>
        </form>
        <button
          className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[18px] font-pretendard shadow hover:brightness-110 transition"
          onClick={() => router.push('/style/result')}
        >
          결과 보기
        </button>
      </main>
    </div>
  );
}
