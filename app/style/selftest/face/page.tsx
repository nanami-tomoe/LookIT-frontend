'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function FaceSelfTest() {
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
          얼굴형 분석 자가진단
        </h1>
        <form className="flex flex-col gap-8 w-full">
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              1. 얼굴형은?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="faceShape"
                value="둥근형"
                onChange={handleChange}
              />{' '}
              둥근형
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="faceShape"
                value="각진형"
                onChange={handleChange}
              />{' '}
              각진형
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="faceShape"
                value="계란형"
                onChange={handleChange}
              />{' '}
              계란형
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="faceShape"
                value="긴형"
                onChange={handleChange}
              />{' '}
              긴형
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              2. 턱선은?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="jaw"
                value="뾰족"
                onChange={handleChange}
              />{' '}
              뾰족
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="jaw"
                value="각짐"
                onChange={handleChange}
              />{' '}
              각짐
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="jaw"
                value="둥글"
                onChange={handleChange}
              />{' '}
              둥글
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              3. 이마는?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="forehead"
                value="넓음"
                onChange={handleChange}
              />{' '}
              넓음
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="forehead"
                value="보통"
                onChange={handleChange}
              />{' '}
              보통
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="forehead"
                value="좁음"
                onChange={handleChange}
              />{' '}
              좁음
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
