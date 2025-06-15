import { NextRequest, NextResponse } from 'next/server';

const API_BASE = 'http://54.180.245.50';

function buildTargetUrl(params: { slug?: string[] }, req: NextRequest) {
  const path = params.slug ? '/' + params.slug.join('/') : '';
  const search = req.nextUrl.search || '';
  return `${API_BASE}${path}${search}`;
}

async function proxyRequest(
  req: NextRequest,
  method: string,
  params: { slug?: string[] }
) {
  const url = buildTargetUrl(params, req);
  const headers: Record<string, string> = {};
  req.headers.forEach((value, key) => {
    // 인증, 쿠키 등 필요한 헤더만 전달 (보안상)
    if (
      [
        'authorization',
        'content-type',
        'cookie',
        'accept',
        'x-access-token',
        'x-refresh-token',
      ].includes(key.toLowerCase())
    ) {
      headers[key] = value;
    }
  });
  const init: RequestInit = {
    method,
    headers,
    body: ['POST', 'PUT', 'PATCH'].includes(method)
      ? await req.text() // body를 그대로 전달
      : undefined,
    // credentials: 'include', // 필요시
  };
  const response = await fetch(url, init);
  const contentType = response.headers.get('content-type') || '';
  let body;
  if (contentType.includes('application/json')) {
    body = await response.json();
    return NextResponse.json(body, { status: response.status });
  } else {
    body = await response.text();
    return new NextResponse(body, {
      status: response.status,
      headers: { 'content-type': contentType },
    });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  return proxyRequest(req, 'GET', params);
}
export async function POST(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  return proxyRequest(req, 'POST', params);
}
export async function PUT(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  return proxyRequest(req, 'PUT', params);
}
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  return proxyRequest(req, 'PATCH', params);
}
export async function DELETE(
  req: NextRequest,
  { params }: { params: { slug?: string[] } }
) {
  return proxyRequest(req, 'DELETE', params);
}
