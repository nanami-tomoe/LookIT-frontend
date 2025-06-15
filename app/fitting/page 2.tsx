'use client';

import Background from '@/components/Background';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRef, useState } from 'react';

export default function Fitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const clothInputRef = useRef<HTMLInputElement>(null);

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserImage(URL.createObjectURL(e.target.files[0]));
    }
  };
  const handleClothImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClothImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[1300px] mx-auto gap-12 px-4">
        <div className="flex flex-row w-full gap-8 justify-center items-start">
          {/* 내 사진 업로드 영역 */}
          <section className="flex flex-col items-center bg-white/80 rounded-2xl p-8 w-[380px] shadow-lg border border-[#e5e5e5]">
            <h2 className="text-[20px] font-medium text-[#0b0b0f] text-center font-pretendard mb-4">
              옷을 입힐 사진을 업로드해주세요
            </h2>
            <div
              className="flex flex-col items-center justify-center w-full h-[320px] bg-white border border-[#d5d5d5] rounded-lg mb-4 cursor-pointer hover:border-[#b982ff] transition overflow-hidden"
              onClick={() => userInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={userInputRef}
                style={{ display: 'none' }}
                onChange={handleUserImageChange}
              />
              {userImage ? (
                <img src={userImage} alt="미리보기" className="max-h-[300px] max-w-full rounded-lg" />
              ) : (
                <span className="text-[#484848] text-[16px] text-center font-inter">
                  업로드할 이미지를 이 영역으로
                  <br />
                  드래그하거나 클릭하세요
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] flex items-center justify-center">
                {/* 안내 아이콘(임시) */}
                <span className="text-white text-lg font-bold">i</span>
              </div>
              <span className="text-[#898CA9] text-[14px]">
                얼굴이 잘 나온 정면 사진을 권장해요
              </span>
            </div>
          </section>

          {/* 옷 이미지 업로드 영역 */}
          <section className="flex flex-col items-center bg-white/80 rounded-2xl p-8 w-[380px] shadow-lg border border-[#e5e5e5]">
            <h2 className="text-[20px] font-medium text-[#0b0b0f] text-center font-pretendard mb-4">
              의류 이미지를 업로드해주세요
            </h2>
            <div
              className="flex flex-col items-center justify-center w-full h-[320px] bg-white border border-[#d5d5d5] rounded-lg mb-4 cursor-pointer hover:border-[#b982ff] transition overflow-hidden"
              onClick={() => clothInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={clothInputRef}
                style={{ display: 'none' }}
                onChange={handleClothImageChange}
              />
              {clothImage ? (
                <img src={clothImage} alt="미리보기" className="max-h-[300px] max-w-full rounded-lg" />
              ) : (
                <span className="text-[#484848] text-[16px] text-center font-inter">
                  업로드할 이미지를 이 영역으로
                  <br />
                  드래그하거나 클릭하세요
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-row items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] flex items-center justify-center">
                {/* 안내 아이콘(임시) */}
                <span className="text-white text-lg font-bold">i</span>
              </div>
              <span className="text-[#898CA9] text-[14px]">
                정면이 잘 보이는 옷 이미지를 권장해요
              </span>
            </div>
          </section>

          {/* 결과 및 RUN 버튼 영역 */}
          <section className="flex flex-col items-center bg-white/80 rounded-2xl p-8 w-[380px] shadow-lg border border-[#e5e5e5]">
            <h2 className="text-[20px] font-medium text-[#0b0b0f] text-center font-pretendard mb-4">
              "RUN" 버튼을 눌러주세요
            </h2>
            <div className="flex flex-col items-center justify-center w-full h-[320px] bg-white border border-[#d5d5d5] rounded-lg mb-2">
              <span className="text-[#484848] text-[16px] text-center font-inter">
                가상 피팅된 이미지가 출력됩니다
              </span>
            </div>
            <button className="mt-4 w-full h-14 rounded-[10px] bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] text-white font-semibold text-[16px] font-inter shadow hover:brightness-110 transition">
              RUN
            </button>
          </section>
        </div>
      </main>
    </div>
  );
}
