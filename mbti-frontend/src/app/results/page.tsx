import ResultsClient from '@/components/ResultsClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales MBTI - 진단 결과',
  description: '당신의 영업 스타일 진단 결과입니다.',
};

export default function ResultsPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-sky-100 to-indigo-100">
      <ResultsClient />
    </div>
  );
}
