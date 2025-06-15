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

    if (error) {
      router.replace('/login?error=' + error);
      return;
    }

    if (code) {
      axios
        .post('/api/auth/login/kakao', { code })
        .then((res: AxiosResponse) => {
          const { data, status } = res.data;
          if (status === 'SUCCESS' && data) {
            const { jwt, is_member } = data;
            localStorage.setItem('accessToken', jwt.accessToken);
            localStorage.setItem('refreshToken', jwt.refreshToken);
            if (is_member) {
              router.replace('/home');
            } else {
              router.replace('/join');
            }
          } else {
            router.replace('/login');
          }
        })
        .catch(() => {
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
