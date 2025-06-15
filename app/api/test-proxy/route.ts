import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const res = await fetch('http://54.180.245.50/api/v0/body-analysis', {
      method: 'OPTIONS', // 실제 백엔드가 허용하는 메서드로 변경 가능
    });
    const text = await res.text();
    return NextResponse.json({
      ok: true,
      status: res.status,
      statusText: res.statusText,
      body: text,
      headers: Object.fromEntries(res.headers.entries()),
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        ok: false,
        error: e.message,
        stack: e.stack,
      },
      { status: 500 }
    );
  }
}
