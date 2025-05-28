'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMbtiStore } from '@/store/store';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/Card';
import { BarChart, CheckCircle, User, Info, RefreshCw, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ResultsClient() {
  const router = useRouter();
  const { personalityResult, isLoading, error, resetDiagnosis } = useMbtiStore();

  useEffect(() => {
    // If there's no result and not loading (e.g., direct navigation or error during submission),
    // redirect to home.
    if (!personalityResult && !isLoading && !error) {
      router.replace('/');
    }
  }, [personalityResult, isLoading, error, router]);

  const handleTryAgain = () => {
    resetDiagnosis();
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <BarChart className="h-16 w-16 text-sky-600 animate-pulse mb-4" />
        <p className="text-lg text-slate-700">결과를 분석 중입니다...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <Info className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-3xl font-semibold text-red-700 mb-4">결과 로딩 실패</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <Button onClick={handleTryAgain} variant="outline" size="lg">
          <RefreshCw className="mr-2 h-5 w-5" />
          다시 시도하기
        </Button>
      </div>
    );
  }

  if (!personalityResult) {
    // This case should ideally be handled by the useEffect redirect,
    // but as a fallback:
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <User className="w-16 h-16 text-slate-500 mb-4" />
        <h2 className="text-3xl font-semibold text-slate-700 mb-4">진단 결과 없음</h2>
        <p className="text-slate-600 mb-6">
          아직 진단을 완료하지 않으셨거나, 결과를 가져오는 데 실패했습니다.
        </p>
        <Button onClick={handleTryAgain} size="lg">
          <Home className="mr-2 h-5 w-5" />
          처음으로 돌아가기
        </Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl"
    >
      <Card className="w-full shadow-2xl">
        <CardHeader className="text-center bg-sky-600 text-white p-8 rounded-t-xl">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <CardTitle as="h1" className="text-4xl font-bold text-white mb-2">
              🎉 당신의 영업 스타일은 🎉
            </CardTitle>
            <CardDescription className="text-sky-100 text-lg">
              {personalityResult.code} - {personalityResult.animal} 타입입니다!
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent className="p-8 space-y-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold text-sky-700 mb-3 flex items-center">
              <CheckCircle className="h-7 w-7 mr-3 text-green-500" />
              유형 설명
            </h3>
            <p className="text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-md border border-slate-200">
              {personalityResult.description}
            </p>
          </motion.div>
        </CardContent>
        <CardFooter className="p-8 bg-slate-50 rounded-b-xl">
          <Button
            onClick={handleTryAgain}
            size="lg"
            className="w-full md:w-auto group"
            variant="outline"
          >
            <RefreshCw className="mr-2 h-5 w-5 transition-transform group-hover:rotate-180" />
            다시 진단하기
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
