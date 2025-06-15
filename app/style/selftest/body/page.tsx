'use client';
import Background from '@/components/Background';
import Header from '@/components/Header';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function BodySelfTest() {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  // 각 문항의 선택지 순서대로 A/B/C로 매핑
  const questionKeys = [
    'body_thickness',
    'muscle_fat_type',
    'neck_length',
    'waist_hip_silhouette',
    'knee_size',
    'clavicle',
    'skin_texture',
    'wrist_bone',
    'pelvis',
    'hand_feature',
  ];
  const answerMap: Record<string, string[]> = {
    body_thickness: ['두께감 있음', '두께감 없음', '골격 다부짐'],
    muscle_fat_type: ['근육 잘 붙음', '지방 잘 붙음', '살 많지 않음'],
    neck_length: ['짧거나 보통', '얇고 김', '두껍고 근육 많음'],
    waist_hip_silhouette: [
      '허리 높고 엉덩이 둥근',
      '허리 낮고 엉덩이 퍼짐',
      '허리 낮고 엉덩이 평평',
    ],
    knee_size: ['작고 눈에 띄지 않음', '둥글게 튀어나옴', '크고 길쭉함'],
    clavicle: ['거의 나오지 않음', '조금 나와 있음', '뚜렷하게 나와 있음'],
    skin_texture: ['탱탱하고 탄력 있음', '부드럽고 얇음', '단단하고 힘줄 있음'],
    wrist_bone: [
      '튼실, 뼈 거의 안 나옴',
      '가늘고 뼈 약간 나옴',
      '가늘고 뼈 확실히 나옴',
    ],
    pelvis: ['튼실, 거의 안 나옴', '작고 약간 나옴', '넓지 않지만 확실히 나옴'],
    hand_feature: ['두께감 있음', '두께 얇음', '힘줄 보임'],
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // 답변 개수 세기
    let countA = 0,
      countB = 0,
      countC = 0;
    for (const key of questionKeys) {
      const value = answers[key];
      if (!value) continue;
      const idx = answerMap[key].indexOf(value);
      if (idx === 0) countA++;
      else if (idx === 1) countB++;
      else if (idx === 2) countC++;
    }
    // 가장 많은 답변 유형 결정
    let bodyType = 'STRAIGHT';
    if (countB > countA && countB >= countC) bodyType = 'WAVE';
    else if (countC > countA && countC > countB) bodyType = 'NATURAL';
    // 동점이면 우선순위: A > B > C
    if (countA === countB && countA > countC)
      bodyType = Math.random() < 0.5 ? 'STRAIGHT' : 'WAVE';
    if (countA === countC && countA > countB)
      bodyType = Math.random() < 0.5 ? 'STRAIGHT' : 'NATURAL';
    if (countB === countC && countB > countA)
      bodyType = Math.random() < 0.5 ? 'WAVE' : 'NATURAL';

    setLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const res = await axios.post(
        'http://54.180.245.50/api/v0/diagnosis',
        { bodyType },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('서버 응답:', res);
      if (res.status === 200 && res.data?.data) {
        router.push('/style/selftest/face');
      } else {
        alert('서버 응답 오류: ' + (res.data?.message || ''));
      }
    } catch (err) {
      alert('서버 요청 실패');
      console.log('에러:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNext = () => {
    router.push('/style/selftest/face');
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 w-full max-w-[600px] mx-auto gap-12 px-4">
        <h1 className="text-[32px] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-center font-pretendard mb-2">
          체형 분석 자가진단
        </h1>
        <div className="flex flex-row items-center justify-center w-full max-w-[500px] mx-auto mt-2 mb-0 select-none gap-[15px]">
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED]" />
          <div className="w-[100px] h-[5px] rounded-[5px] bg-[#D9D9D9]" />
        </div>
        <form
          className="flex flex-col gap-8 w-full mt-8"
          onSubmit={handleSubmit}
        >
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              1. 신체의 두께감은 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="body_thickness"
                value="두께감 있음"
                onChange={handleChange}
              />{' '}
              신체에 두께감이 있다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="body_thickness"
                value="두께감 없음"
                onChange={handleChange}
              />{' '}
              두께감이 없고 연약하다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="body_thickness"
                value="골격 다부짐"
                onChange={handleChange}
              />{' '}
              골격들이 다부지다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              2. 해당하는 타입을 선택해 주세요
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="muscle_fat_type"
                value="근육 잘 붙음"
                onChange={handleChange}
              />{' '}
              근육이 잘 붙는 편이다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="muscle_fat_type"
                value="지방 잘 붙음"
                onChange={handleChange}
              />{' '}
              비교적 근육보다는 지방이 잘 붙는 편이다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="muscle_fat_type"
                value="살 많지 않음"
                onChange={handleChange}
              />{' '}
              살이 많은 느낌은 아니다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              3. 목 길이는 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="neck_length"
                value="짧거나 보통"
                onChange={handleChange}
              />{' '}
              목이 짧은 편에 속하거나 보통인 편이다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="neck_length"
                value="얇고 김"
                onChange={handleChange}
              />{' '}
              목이 얇고 긴 편이다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="neck_length"
                value="두껍고 근육 많음"
                onChange={handleChange}
              />{' '}
              목이 조금 두껍고, 근육이 많아 보인다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              4. 허리에서 엉덩이로 이어지는 실루엣은 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="waist_hip_silhouette"
                value="허리 높고 엉덩이 둥근"
                onChange={handleChange}
              />{' '}
              허리 위치가 높고, 엉덩이는 둥근 느낌(복숭아 모양)
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="waist_hip_silhouette"
                value="허리 낮고 엉덩이 퍼짐"
                onChange={handleChange}
              />{' '}
              허리 위치가 낮고, 엉덩이는 퍼진 느낌(서양배 모양)
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="waist_hip_silhouette"
                value="허리 낮고 엉덩이 평평"
                onChange={handleChange}
              />{' '}
              허리 위치가 낮고, 엉덩이는 평평하고 길쭉한 느낌(피망 모양)
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              5. 무릎의 크기와 나온 정도는 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="knee_size"
                value="작고 눈에 띄지 않음"
                onChange={handleChange}
              />{' '}
              서 있을 때 무릎이 작고 눈에 띄지 않는다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="knee_size"
                value="둥글게 튀어나옴"
                onChange={handleChange}
              />{' '}
              서 있을 때 무릎이 둥글게 튀어 나온다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="knee_size"
                value="크고 길쭉함"
                onChange={handleChange}
              />{' '}
              서 있을 때 무릎이 크고 길쭉하다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              6. 쇄골의 크기와 나온 정도는 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="clavicle"
                value="거의 나오지 않음"
                onChange={handleChange}
              />{' '}
              쇄골이 거의 나오지 않는다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="clavicle"
                value="조금 나와 있음"
                onChange={handleChange}
              />{' '}
              쇄골이 조금 나와 있다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="clavicle"
                value="뚜렷하게 나와 있음"
                onChange={handleChange}
              />{' '}
              쇄골이 뚜렷하게 나와 있다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              7. 피부의 질감은 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="skin_texture"
                value="탱탱하고 탄력 있음"
                onChange={handleChange}
              />{' '}
              탱탱하고 탄력성이 있는 느낌
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="skin_texture"
                value="부드럽고 얇음"
                onChange={handleChange}
              />{' '}
              부드럽고 얇은 느낌
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="skin_texture"
                value="단단하고 힘줄 있음"
                onChange={handleChange}
              />{' '}
              단단하고 힘줄이 있는 느낌
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              8. 손목 뼈의 크기와 나온 정도는 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="wrist_bone"
                value="튼실, 뼈 거의 안 나옴"
                onChange={handleChange}
              />{' '}
              손목은 튼실한 느낌이지만, 뼈는 거의 나와 있지 않다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="wrist_bone"
                value="가늘고 뼈 약간 나옴"
                onChange={handleChange}
              />{' '}
              손목이 가늘고 뼈는 약간 나와 있다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="wrist_bone"
                value="가늘고 뼈 확실히 나옴"
                onChange={handleChange}
              />{' '}
              손목이 가늘고 뼈는 확실하게 나와 있다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              9. 골반의 크기와 나온 정도는 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="pelvis"
                value="튼실, 거의 안 나옴"
                onChange={handleChange}
              />{' '}
              골반이 튼실한 편이지만, 거의 나와 있지 않다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="pelvis"
                value="작고 약간 나옴"
                onChange={handleChange}
              />{' '}
              골반이 작지만 약간 나와 있다.
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="pelvis"
                value="넓지 않지만 확실히 나옴"
                onChange={handleChange}
              />{' '}
              골반이 넓지는 않지만 확실하게 나와 있다.
            </label>
          </div>
          <div>
            <div className="text-[18px] font-semibold text-white mb-2">
              10. 손바닥이나 손등의 특징은 어떤 편인가요?
            </div>
            <label className="block text-white">
              <input
                type="radio"
                name="hand_feature"
                value="두께감 있음"
                onChange={handleChange}
              />{' '}
              두께감이 있는 편
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="hand_feature"
                value="두께 얇음"
                onChange={handleChange}
              />{' '}
              두께가 얇은 편
            </label>
            <label className="block text-white">
              <input
                type="radio"
                name="hand_feature"
                value="힘줄 보임"
                onChange={handleChange}
              />{' '}
              두께감보다는 손등의 힘줄이 보이는 편
            </label>
          </div>
          <div className="flex justify-center w-full">
            <button
              type="submit"
              className="mt-8 w-full max-w-[300px] h-14 rounded-[10px] bg-gradient-to-br from-[#9B51E0] to-[#3081ED] text-white font-semibold text-[18px] font-pretendard shadow hover:brightness-110 transition disabled:opacity-60 mx-auto"
              disabled={loading || questionKeys.some((k) => !answers[k])}
            >
              {loading ? '처리 중...' : '다음 단계로'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
