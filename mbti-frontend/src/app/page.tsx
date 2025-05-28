import Link from 'next/link';
import { Button } from '@/components/ui/Button'; // Assuming a Button component will be created
import { ArrowRight } from 'lucide-react';

export default function WelcomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6 bg-gradient-to-br from-slate-100 to-sky-100">
      <header className="mb-12">
        <h1 className="text-5xl font-bold text-sky-700 mb-4">
          나의 영업 스타일 MBTI 찾기 🚀
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          간단한 질문을 통해 당신의 영업 페르소나를 발견하고, 강점을 활용하여 성공적인 영업 전략을 수립해보세요!
        </p>
      </header>

      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-semibold text-sky-600 mb-6">준비되셨나요?</h2>
        <p className="text-slate-500 mb-8">
          총 48개의 질문으로 구성되어 있으며, 각 축(Axis)별로 12개의 질문이 제시됩니다. 
          솔직하고 빠르게 답변하여 당신의 진짜 영업 스타일을 알아보세요!
        </p>
        <Link href="/diagnose" passHref>
          <Button size="lg" className="w-full group">
            진단 시작하기 <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>

      <footer className="mt-12 text-sm text-slate-500">
        <p>&copy; {new Date().getFullYear()} Sales MBTI Test. All rights reserved.</p>
        <p className="mt-1">당신의 성공적인 영업 활동을 응원합니다!</p>
      </footer>
    </div>
  );
}

// Basic Button component (to be created at src/components/ui/Button.tsx)
// For now, this is just a placeholder to make the page runnable.
// You would typically define this in its own file.
// const Button = ({ children, className, ...props }: any) => (
//   <button 
//     className={`bg-sky-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 flex items-center justify-center ${className}`}
//     {...props}
//   >
//     {children}
//   </button>
// );
