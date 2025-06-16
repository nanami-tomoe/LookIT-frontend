'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function FaceSelfTest() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [faceType, setFaceType] = useState<'A' | 'B' | null>(null);
  const [faceLoading, setFaceLoading] = useState(true);
  const [faceError, setFaceError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFaceType = async () => {
      setFaceLoading(true);
      setFaceError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get('/api/v0/face-analysis/result', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const result = res.data?.data;
        if (result === '진행중') {
          setFaceError('얼굴형 분석이 아직 완료되지 않았습니다.');
          setFaceType(null);
        } else if (['SQUARE', 'HEART', 'OBLONG'].includes(result)) {
          setFaceType('A');
        } else if (['OVAL', 'ROUND'].includes(result)) {
          setFaceType('B');
        } else {
          setFaceError('알 수 없는 얼굴형 결과입니다.');
          setFaceType(null);
        }
      } catch (err) {
        setFaceError('얼굴형 정보를 불러오지 못했습니다.');
        setFaceType(null);
      } finally {
        setFaceLoading(false);
      }
    };
    fetchFaceType();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const isAllChecked =
    faceType && [2, 3, 4, 5, 6, 7, 8, 9, 10].every((i) => answers[`q${i}`]);

  const handleResult = async () => {
    // 1~10번 답변 중 A 개수 세기 (q1은 faceType, 나머지는 answers)
    const allAnswers = { ...answers, q1: faceType };
    const aCount = Object.values(allAnswers).filter((v) => v === 'A').length;
    let faceMood = '';
    if (aCount >= 7) faceMood = 'STRAIGHT_SKELETON';
    else if (aCount >= 4) faceMood = 'BALANCE_TYPE';
    else faceMood = 'CURVED_VOLUME';
    try {
      const token = localStorage.getItem('accessToken');
      // 스타일 팁 POST 요청
      await axios.post(
        '/api/v0/style-tips',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 얼굴 무드 저장
      await axios.post(
        '/api/v0/face-mood',
        { faceMood },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // 결과 페이지로 이동
      router.push('/style/result');
    } catch (err) {
      alert('서버 요청 실패');
      console.log('에러:', err);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header stylePageMode={true} />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[600px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          얼굴형 분석 자가진단
        </h1>
        <div className="flex flex-row items-center justify-center w-full max-w-[500px] mx-auto mt-2 mb-0 select-none gap-[15px]">
          <div className="w-[100px] h-[5px] rounded-[5px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
        </div>
        <form className="flex flex-col gap-8 w-full">
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              1. 얼굴의 전체 형태는? (머신러닝 결과)
            </div>
            {faceLoading ? (
              <div className="text-white">불러오는 중...</div>
            ) : faceError ? (
              <div className="text-red-400">{faceError}</div>
            ) : (
              <>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="A"
                    checked={faceType === 'A'}
                    readOnly
                    disabled
                  />{' '}
                  세로 길이가 길고 턱선이 날카롭다 (긴 얼굴형, 각진 얼굴형,
                  하트형)
                  {faceType === 'A' && (
                    <span className="ml-2 text-[#9B51E0] font-bold">
                      (선택됨)
                    </span>
                  )}
                </label>
                <label className="block text-white">
                  <input
                    type="radio"
                    name="q1"
                    value="B"
                    checked={faceType === 'B'}
                    readOnly
                    disabled
                  />{' '}
                  전체적으로 둥글거나 타원형이다 (계란형, 둥근 얼굴형)
                  {faceType === 'B' && (
                    <span className="ml-2 text-[#9B51E0] font-bold">
                      (선택됨)
                    </span>
                  )}
                </label>
              </>
            )}
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              2. 얼굴의 윤곽선은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q2" value="A" onChange={handleChange} />{' '}
              광대, 턱, 이마 등의 라인이 직선적이다
            </label>
            <label className="block text-white">
              <input type="radio" name="q2" value="B" onChange={handleChange} />{' '}
              전체적으로 부드럽고 곡선적인 느낌이다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              3. 콧대의 모양은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q3" value="A" onChange={handleChange} />{' '}
              콧대가 가파르고 콧등에서 코끝까지 선이 뚜렷하다
            </label>
            <label className="block text-white">
              <input type="radio" name="q3" value="B" onChange={handleChange} />{' '}
              콧대가 완만하고 코끝이 동그랗게 떨어진다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              4. 정면에서 본 코의 형태는?
            </div>
            <label className="block text-white">
              <input type="radio" name="q4" value="A" onChange={handleChange} />{' '}
              코끝이 얇고 선명하게 잡혀 있다
            </label>
            <label className="block text-white">
              <input type="radio" name="q4" value="B" onChange={handleChange} />{' '}
              코끝이 퍼지며 둥글다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              5. 눈의 길이와 방향은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q5" value="A" onChange={handleChange} />{' '}
              눈이 가로로 길며 눈꼬리가 올라가 있다 (날렵한 눈매)
            </label>
            <label className="block text-white">
              <input type="radio" name="q5" value="B" onChange={handleChange} />{' '}
              눈매가 둥글고 아래로 살짝 내려온다 (부드러운 인상)
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              6. 눈의 입체감은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q6" value="A" onChange={handleChange} />{' '}
              눈두덩이 살이 적고 눈이 깊이 들어가 보인다
            </label>
            <label className="block text-white">
              <input type="radio" name="q6" value="B" onChange={handleChange} />{' '}
              눈두덩이가 도톰하고 눈이 크고 또렷해 보인다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              7. 입술 형태는?
            </div>
            <label className="block text-white">
              <input type="radio" name="q7" value="A" onChange={handleChange} />{' '}
              입술이 얇고 가로로 긴 편이다
            </label>
            <label className="block text-white">
              <input type="radio" name="q7" value="B" onChange={handleChange} />{' '}
              입술이 전체적으로 도톰하고 입꼬리가 살짝 올라갔다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              8. 이마의 윤곽은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q8" value="A" onChange={handleChange} />{' '}
              이마 라인이 평평하고 살이 적다
            </label>
            <label className="block text-white">
              <input type="radio" name="q8" value="B" onChange={handleChange} />{' '}
              이마가 둥글고 도톰하다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              9. 턱선의 굴곡은?
            </div>
            <label className="block text-white">
              <input type="radio" name="q9" value="A" onChange={handleChange} />{' '}
              직선형으로 떨어지며 각이 있다
            </label>
            <label className="block text-white">
              <input type="radio" name="q9" value="B" onChange={handleChange} />{' '}
              둥글고 곡선으로 부드럽게 떨어진다
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              10. 옆모습에서 코와 입의 위치관계는?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="q10"
                value="A"
                onChange={handleChange}
              />{' '}
              코가 도드라지고 입은 뒤로 들어간 느낌이다
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="q10"
                value="B"
                onChange={handleChange}
              />{' '}
              코와 입이 비슷한 선상에 있다 (입체감이 적은 편)
            </label>
          </div>
        </form>
        <button
          className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[18px] font-pretendard shadow hover:brightness-110 transition"
          onClick={handleResult}
          disabled={!isAllChecked}
        >
          결과 보기
        </button>
      </main>
    </div>
  );
}
