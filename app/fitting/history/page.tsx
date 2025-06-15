'use client';
import Header from '@/components/Header';
import Background from '@/components/Background';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaSearchPlus, FaTimes } from 'react-icons/fa';

interface FittingResult {
  resultImageUrl: string;
  createdAt: string;
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const yyyy = d.getFullYear();
  const mm = d.getMonth() + 1;
  const dd = d.getDate();
  const hh = String(d.getHours()).padStart(2, '0');
  const min = String(d.getMinutes()).padStart(2, '0');
  return `${yyyy}년 ${mm}월 ${dd}일 ${hh}:${min}`;
}

export default function FittingHistory() {
  const [results, setResults] = useState<FittingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalImg, setModalImg] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem('accessToken');
        const res = await axios.get(
          'http://54.180.245.50/api/v0/virtual-fitting/result',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log('가상피팅 결과 API 응답:', res.data);
        setResults(res.data?.data || []);
      } catch (e: any) {
        setError('가상피팅 결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };
    fetchResults();
  }, []);

  // ESC로 모달 닫기
  useEffect(() => {
    if (!modalImg) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImg(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [modalImg]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0B0B0F]">
      <Background />
      <Header />
      <main className="flex-1 flex flex-col items-center justify-start relative z-10 w-full max-w-[900px] mx-auto gap-8 px-4 py-12">
        <h1 className="text-[28px] font-bold text-white mb-6">가상피팅 내역</h1>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-start">
          {loading ? (
            <div className="text-[#9B51E0] text-center py-12 w-full">
              불러오는 중...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center py-12 w-full">{error}</div>
          ) : results.filter((item) => !!item.resultImageUrl).length === 0 ? (
            <div className="text-[#aaa] text-center py-12 w-full">
              완료된 가상피팅 결과가 없습니다.
            </div>
          ) : (
            results
              .filter((item) => !!item.resultImageUrl)
              .map((item, idx) => (
                <div
                  key={item.resultImageUrl + item.createdAt + idx}
                  className="group relative bg-white/95 rounded-2xl shadow-xl border border-[#e5e5e5] flex flex-col items-center justify-between w-full max-w-[240px] h-[280px] p-4 mx-auto overflow-hidden hover:scale-105 hover:shadow-2xl transition-transform duration-200"
                >
                  <div className="relative w-full h-[170px] flex items-center justify-center bg-[#f7f7fa] rounded-xl border border-[#e5e5e5] cursor-pointer overflow-hidden">
                    <Image
                      src={item.resultImageUrl}
                      alt="result"
                      width={180}
                      height={170}
                      className="object-contain w-full h-full rounded-xl transition-transform duration-200 group-hover:scale-110"
                      style={{ background: '#f7f7fa' }}
                    />
                    {/* 오버레이 + 돋보기 아이콘 */}
                    <div
                      className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-200"
                      onClick={() => setModalImg(item.resultImageUrl)}
                    >
                      <FaSearchPlus className="text-white text-3xl drop-shadow-lg" />
                    </div>
                  </div>
                  <div className="mt-4 px-3 py-1 bg-[#f7f7fa] rounded-full text-xs text-[#666] font-mono w-fit mx-auto shadow-sm border border-[#ececec]">
                    피팅 완료: {formatDate(item.createdAt)}
                  </div>
                </div>
              ))
          )}
        </div>
        {/* 이미지 확대 모달 */}
        {modalImg && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 cursor-zoom-out animate-fadein"
            onClick={() => setModalImg(null)}
          >
            <div className="relative max-w-[90vw] max-h-[90vh] flex items-center justify-center">
              <Image
                src={modalImg}
                alt="확대 이미지"
                width={900}
                height={900}
                className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl border-4 border-white object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                className="absolute top-2 right-2 bg-white/80 hover:bg-white text-[#222] rounded-full p-2 shadow-lg text-xl z-10"
                onClick={() => setModalImg(null)}
                aria-label="닫기"
              >
                <FaTimes />
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
