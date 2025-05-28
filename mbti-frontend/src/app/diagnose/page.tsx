import QuestionnaireClient from '@/components/QuestionnaireClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sales MBTI - 진단 중',
  description: '당신의 영업 스타일을 진단합니다.',
};

export default function DiagnosePage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center py-12 px-4 bg-gradient-to-br from-slate-100 to-sky-100">
      <QuestionnaireClient />
    </div>
  );
}
