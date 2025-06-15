import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
    if (!API_KEY) {
      return NextResponse.json(
        { error: true, message: 'API_KEY 환경변수가 없습니다.' },
        { status: 500 }
      );
    }
    const apiUrl = `http://openapi.seoul.go.kr:8088/${API_KEY}/json/culturalEventInfo/1/5/`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    if (!data.culturalEventInfo) {
      throw new Error(data.RESULT?.MESSAGE || 'API 호출 실패');
    }
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: true, message: error.message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
