'use client';

import Background from '@/components/Background';
import Header from '@/components/Header';
import Image from 'next/image';
import { useRef, useState } from 'react';
import axios from 'axios';

export default function Fitting() {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [clothImage, setClothImage] = useState<string | null>(null);
  const [userFile, setUserFile] = useState<File | null>(null);
  const [clothFile, setClothFile] = useState<File | null>(null);
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [imageTaskId, setImageTaskId] = useState<string | null>(null);
  const userInputRef = useRef<HTMLInputElement>(null);
  const clothInputRef = useRef<HTMLInputElement>(null);

  const handleUserImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUserImage(URL.createObjectURL(e.target.files[0]));
      setUserFile(e.target.files[0]);
    }
  };
  const handleClothImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClothImage(URL.createObjectURL(e.target.files[0]));
      setClothFile(e.target.files[0]);
    }
  };

  const handleRun = async () => {
    if (!userFile || !clothFile) return;
    setStatus('loading');
    setErrorMsg(null);
    setImageTaskId(null);
    try {
      const formData = new FormData();
      formData.append('body', userFile);
      formData.append('clothes', clothFile);
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        'http://54.180.245.50/api/v0/virtual-fitting',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const taskId = res.data?.data?.imageTaskId;
      setImageTaskId(taskId || null);
      setStatus('success');
    } catch (e: any) {
      setStatus('error');
      setErrorMsg(e?.response?.data?.message || '요청에 실패했습니다.');
    }
  };

  const handleReset = () => {
    setUserImage(null);
    setClothImage(null);
    setUserFile(null);
    setClothFile(null);
    setStatus('idle');
    setErrorMsg(null);
    setImageTaskId(null);
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[900px] mx-auto gap-12 px-4">
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
                <img
                  src={userImage}
                  alt="미리보기"
                  className="max-h-[300px] max-w-full rounded-lg"
                />
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
                <img
                  src={clothImage}
                  alt="미리보기"
                  className="max-h-[300px] max-w-full rounded-lg"
                />
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
        </div>
        {/* RUN 버튼/안내/새로운 요청 - 카드 아래 중앙 */}
        <div className="flex flex-col items-center justify-center w-full max-w-[800px] mx-auto mt-8">
          {status !== 'success' && (
            <button
              className="w-full max-w-[380px] h-14 rounded-[10px] bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] text-white font-semibold text-[16px] font-inter shadow hover:brightness-110 transition disabled:opacity-50"
              onClick={handleRun}
              disabled={!userFile || !clothFile || status === 'loading'}
            >
              RUN
            </button>
          )}
          {status === 'loading' && (
            <span className="mt-3 text-[#9B51E0] text-[16px] text-center font-inter animate-pulse">
              가상피팅 요청 중...
            </span>
          )}
          {status === 'success' && (
            <div className="mt-3 flex flex-col items-center w-full">
              <span className="text-[#3081ED] text-[16px] text-center font-inter mb-2">
                요청이 완료되었습니다!
                <br />
                <b>프로필 아이콘</b>에서 결과를 확인할 수 있습니다.
                <br />
                <span className="text-[#aaa] text-[13px]">
                  (imageTaskId: {imageTaskId})
                </span>
              </span>
              <button
                className="w-full max-w-[380px] h-12 rounded-[8px] border border-[#b982ff] text-[#9B51E0] font-semibold text-[15px] font-inter bg-white hover:bg-[#f3f3fa] transition"
                onClick={handleReset}
              >
                새로운 요청하기
              </button>
            </div>
          )}
          {status === 'error' && (
            <span className="mt-3 text-red-500 text-[16px] text-center font-inter">
              {errorMsg}
            </span>
          )}
        </div>
      </main>
    </div>
  );
}
