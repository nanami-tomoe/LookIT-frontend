'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function StyleUpload() {
  const [faceImage, setFaceImage] = useState<string | null>(null);
  const [bodyImage, setBodyImage] = useState<string | null>(null);
  const [faceFile, setFaceFile] = useState<File | null>(null);
  const [bodyFile, setBodyFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const faceInputRef = useRef<HTMLInputElement>(null);
  const bodyInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleFaceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFaceImage(URL.createObjectURL(e.target.files[0]));
      setFaceFile(e.target.files[0]);
    }
  };
  const handleBodyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBodyImage(URL.createObjectURL(e.target.files[0]));
      setBodyFile(e.target.files[0]);
    }
  };

  const handleNext = async () => {
    if (!faceFile || !bodyFile) return;
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('accessToken');
      // 체형 분석 요청
      const bodyForm = new FormData();
      bodyForm.append('analysis', bodyFile);
      const bodyRes = await axios.post('/api/v0/body-analysis', bodyForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('체형 분석 응답:', bodyRes.data);
      // 얼굴 분석 요청
      const faceForm = new FormData();
      faceForm.append('analysis', faceFile);
      const faceRes = await axios.post('/api/v0/face-analysis', faceForm, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('얼굴 분석 응답:', faceRes.data);
      router.push('/style/selftest/body');
    } catch (e: any) {
      setError(
        e?.response?.data?.message || '이미지 분석 요청에 실패했습니다.'
      );
      console.log('이미지 업로드 에러:', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      {/* 얇은 선 3개만 가로로 나란히 (헤더 바로 아래) */}
      <div className="flex flex-row items-center justify-center w-full max-w-[500px] mx-auto mt-2 mb-0 select-none gap-[15px]">
        <div className="w-[100px] h-[5px] rounded-[5px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED]" />
        <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
        <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
      </div>
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[900px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          AI 스타일 추천 - 사진 업로드
        </h1>
        <div className="flex flex-row gap-8 w-full justify-center">
          {/* 얼굴 사진 업로드 */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl p-8 w-[320px] shadow-lg border border-[#e5e5e5]">
            <h2 className="text-[18px] font-medium text-[#0b0b0f] text-center mb-4">
              얼굴 사진 업로드
            </h2>
            <div
              className="flex flex-col items-center justify-center w-full h-[220px] bg-white border border-[#d5d5d5] rounded-lg mb-2 cursor-pointer hover:border-[#b982ff] transition overflow-hidden"
              onClick={() => faceInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={faceInputRef}
                style={{ display: 'none' }}
                onChange={handleFaceChange}
              />
              {faceImage ? (
                <img
                  src={faceImage}
                  alt="얼굴 미리보기"
                  className="max-h-[200px] max-w-full rounded-lg"
                />
              ) : (
                <span className="text-[#484848] text-[15px] text-center font-inter">
                  얼굴 사진을 업로드하세요
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-row items-center gap-2 w-full">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] flex items-center justify-center">
                <span className="text-white text-xs font-bold">i</span>
              </div>
              <span className="text-[#898CA9] text-[13px]">
                정면 사진, 얼굴이 잘 드러나는 환경
              </span>
            </div>
          </div>
          {/* 체형 사진 업로드 */}
          <div className="flex flex-col items-center bg-white/80 rounded-2xl p-8 w-[320px] shadow-lg border border-[#e5e5e5]">
            <h2 className="text-[18px] font-medium text-[#0b0b0f] text-center mb-4">
              체형 사진 업로드
            </h2>
            <div
              className="flex flex-col items-center justify-center w-full h-[220px] bg-white border border-[#d5d5d5] rounded-lg mb-2 cursor-pointer hover:border-[#b982ff] transition overflow-hidden"
              onClick={() => bodyInputRef.current?.click()}
            >
              <input
                type="file"
                accept="image/*"
                ref={bodyInputRef}
                style={{ display: 'none' }}
                onChange={handleBodyChange}
              />
              {bodyImage ? (
                <img
                  src={bodyImage}
                  alt="체형 미리보기"
                  className="max-h-[200px] max-w-full rounded-lg"
                />
              ) : (
                <span className="text-[#484848] text-[15px] text-center font-inter">
                  체형 사진을 업로드하세요
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-col items-start gap-2 w-full">
              <div className="flex flex-row items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#982dec] via-[#dc8df8] to-[#a9c4f3] flex items-center justify-center">
                  <span className="text-white text-xs font-bold">i</span>
                </div>
                <span className="text-[#898CA9] text-[13px]">
                  반드시 머리부터 발끝까지 나오고, 달라붙는 옷을 입고 양쪽 팔이
                  몸에서 떨어져 있어야 해요.
                </span>
                <button
                  type="button"
                  className="ml-2 p-0.5 rounded hover:bg-[#f3f3fa] border border-[#e5e5e5] transition"
                  onClick={() => setShowModal(true)}
                  aria-label="체형 사진 예시 크게 보기"
                >
                  <img
                    src="/ex.jpg"
                    alt="체형 사진 예시 썸네일"
                    className="w-8 h-8 object-cover rounded"
                  />
                </button>
              </div>
              {/* 모달 */}
              {showModal && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
                  onClick={() => setShowModal(false)}
                >
                  <div
                    className="bg-white rounded-lg p-4 max-w-[90vw] max-h-[90vh] flex flex-col items-center relative"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <img
                      src="/ex.jpg"
                      alt="체형 사진 예시 크게 보기"
                      className="max-w-[80vw] max-h-[70vh] object-contain rounded"
                    />
                    <button
                      className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
                      onClick={() => setShowModal(false)}
                      aria-label="닫기"
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <button
          className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[18px] font-pretendard shadow hover:brightness-110 transition"
          onClick={handleNext}
          disabled={!faceImage || !bodyImage || loading}
        >
          {loading ? '분석 중...' : '다음 단계로'}
        </button>
        {error && (
          <div className="mt-4 text-red-500 text-center text-[15px]">
            {error}
          </div>
        )}
      </main>
    </div>
  );
}
