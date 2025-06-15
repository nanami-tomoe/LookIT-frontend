'use client';

export const dynamic = 'force-dynamic';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import type { AxiosResponse } from 'axios';

function KakaoCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    console.log('인가 코드:', code);
    console.log('에러:', error);

    if (error) {
      router.replace('/login?error=' + error);
      return;
    }

    if (code) {
      axios
        .get('http://54.180.245.50/api/auth/login/kakao', { params: { code } })
        .then((res: AxiosResponse) => {
          console.log('백엔드 응답:', res.data);
          const { data, status, success } = res.data;
          if ((status === 'SUCCESS' || success === true) && data) {
            const { jwt, is_member } = data;
            localStorage.setItem('accessToken', jwt.accessToken);
            localStorage.setItem('refreshToken', jwt.refreshToken);
            localStorage.setItem('isMember', is_member ? 'true' : 'false');
            if (is_member) {
              console.log('기존 회원, 홈으로 이동');
              router.replace('/home');
            } else {
              console.log('신규 회원, join으로 이동');
              router.replace('/join');
            }
          } else {
            console.log('로그인 실패, 다시 로그인으로');
            router.replace('/login');
          }
        })
        .catch((e) => {
          console.log('에러 발생:', e);
          router.replace('/login');
        });
    } else {
      router.replace('/login');
    }
  }, [searchParams, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <p>카카오 로그인 처리 중...</p>
    </div>
  );
}

export default function KakaoCallbackPage() {
  return (
    <Suspense>
      <KakaoCallback />
    </Suspense>
  );
}
