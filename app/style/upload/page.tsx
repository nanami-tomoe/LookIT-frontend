'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY || '';
const LOGIN_REDIRECT = process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT || '';
const KAKAO_LOGOUT_URL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${encodeURIComponent(
  LOGIN_REDIRECT
)}`;

// axios 401, 500 인터셉터: 토큰 만료 또는 서버 에러 시 자동 로그아웃 및 로그인 페이지 이동
if (typeof window !== 'undefined') {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        (error.response.status === 401 || error.response.status === 500)
      ) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('isMember');
        window.location.href = KAKAO_LOGOUT_URL;
      }
      return Promise.reject(error);
    }
  );
}

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
  const [showModal, setShowModal] = useState<null | 'face' | 'body'>(null);

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
      <Header stylePageMode={true} />
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
              <button
                type="button"
                className="text-[#898CA9] text-[13px] underline hover:text-[#9B51E0] transition font-medium"
                onClick={() => setShowModal('face')}
                aria-label="얼굴 사진 주의사항 보기"
              >
                설명 보기
              </button>
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
            <div className="mt-2 flex flex-row items-center gap-2 w-full">
              <button
                type="button"
                className="text-[#898CA9] text-[13px] underline hover:text-[#9B51E0] transition font-medium"
                onClick={() => setShowModal('body')}
                aria-label="체형 사진 주의사항 보기"
              >
                설명 보기
              </button>
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
      {/* 설명 모달 */}
      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
          onClick={() => setShowModal(null)}
        >
          <div
            className="bg-white rounded-lg p-6 max-w-[90vw] max-h-[90vh] flex flex-col items-center relative min-w-[320px]"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-3 text-[#9B51E0]">
              {showModal === 'face'
                ? '얼굴 사진 업로드 주의사항'
                : '체형 사진 업로드 주의사항'}
            </h3>
            <ul className="text-[15px] text-[#333] mb-3 list-disc pl-5 text-left w-full max-w-md">
              <li>
                업로드 파일 이름에 <b>한글이 포함되면 안 됩니다</b>.
              </li>
              <li>
                확장자는 <b>jpg, jpeg, png, webp, gif, avif</b>만 가능합니다.
              </li>
              <li>
                뒷배경이 <b>깔끔할수록</b> 좋아요.
              </li>
              {showModal === 'face' ? (
                <>
                  <li>정면 사진, 얼굴이 잘 드러나는 환경에서 촬영해 주세요.</li>
                </>
              ) : (
                <>
                  <li>
                    반드시 <b>머리부터 발끝까지</b> 나오고, <b>달라붙는 옷</b>을
                    입고 <b>양쪽 팔이 몸에서 떨어져</b> 있어야 해요.
                  </li>
                  <li className="mt-2">아래는 예시 이미지입니다.</li>
                  <img
                    src="/ex.jpg"
                    alt="체형 사진 예시"
                    className="w-48 h-48 object-contain rounded border mt-2 mb-2 mx-auto"
                  />
                </>
              )}
            </ul>
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl font-bold"
              onClick={() => setShowModal(null)}
              aria-label="닫기"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
