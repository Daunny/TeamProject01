'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMbtiStore } from '@/store/store';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import { CheckCircle, Circle, Loader2, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question } from '@/types';

export default function QuestionnaireClient() {
  const router = useRouter();
  const {
    questions,
    answers,
    currentAxis,
    isLoading,
    error,
    fetchQuestions,
    recordAnswer,
    nextAxis,
    submitDiagnosis,
    isCurrentAxisCompleted,
    getTotalQuestionsForAxis,
    personalityResult,
  } = useMbtiStore();

  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    if (questions.length === 0) {
      fetchQuestions().finally(() => setIsInitialLoading(false));
    } else {
      setIsInitialLoading(false);
    }
  }, [fetchQuestions, questions.length]);

  useEffect(() => {
    if (personalityResult) {
      router.push('/results');
    }
  }, [personalityResult, router]);

  const questionsForCurrentAxis = useMemo(() => {
    return questions.filter(q => q.axis === currentAxis).map((q, idx) => ({...q, displayIndex: idx}));
  }, [questions, currentAxis]);

  const totalQuestionsInCurrentAxis = questionsForCurrentAxis.length;
  
  const handleOptionSelect = (questionOriginalIndex: number, optionIndex: number) => {
    recordAnswer(questionOriginalIndex, optionIndex, currentAxis);
  };

  const handleNext = async () => {
    if (isCurrentAxisCompleted()) {
      if (currentAxis < 4) {
        nextAxis();
      } else {
        await submitDiagnosis();
        // Effect hook will handle navigation to /results
      }
    } else {
      alert('현재 축의 모든 질문에 답변해주세요.');
    }
  };

  if (isInitialLoading || (isLoading && questions.length === 0)) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-16 w-16 text-sky-600 animate-spin mb-4" />
        <p className="text-lg text-slate-700">질문을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
        <h2 className="text-3xl font-semibold text-red-700 mb-4">오류 발생!</h2>
        <p className="text-slate-600 mb-6">{error}</p>
        <Button onClick={() => fetchQuestions().finally(() => setIsInitialLoading(false))} variant="outline" size="lg">
          질문 다시 불러오기
        </Button>
      </div>
    );
  }
  
  const axisTitle = `Axis ${currentAxis}: ${
    currentAxis === 1 ? "P vs R - 접근 방식" :
    currentAxis === 2 ? "S vs F - 가치 전달 방식" :
    currentAxis === 3 ? "E vs T - 관계 구축 방식" :
    "I vs C - 업무 스타일"
  }`;

  return (
    <motion.div
      key={currentAxis} // Animate when axis changes
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -30 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl"
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-3xl mb-2 text-center">{axisTitle}</CardTitle>
          <p className="text-sm text-slate-500 text-center">
            현재 축의 질문 수: {totalQuestionsInCurrentAxis}개
          </p>
        </CardHeader>
        <CardContent>
          {questionsForCurrentAxis.map((question) => {
            const currentAnswer = answers.find(ans => ans.question_index === question.original_index);
            return (
              <motion.div
                key={question.original_index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: question.displayIndex * 0.1 }}
                className="mb-8 p-6 border border-slate-200 rounded-lg shadow-sm bg-slate-50/50"
              >
                <p className="text-lg font-semibold mb-4 text-slate-800">{question.text}</p>
                <div className="space-y-3">
                  {question.options.map((option, optIndex) => (
                    <Button
                      key={optIndex}
                      variant={currentAnswer?.chosen_option_index === optIndex ? 'default' : 'outline'}
                      className="w-full justify-start text-left py-3 px-4"
                      onClick={() => handleOptionSelect(question.original_index!, optIndex)}
                    >
                      {currentAnswer?.chosen_option_index === optIndex ? (
                        <CheckCircle className="mr-3 h-5 w-5 text-white" />
                      ) : (
                        <Circle className="mr-3 h-5 w-5 text-slate-400" />
                      )}
                      {option}
                    </Button>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </CardContent>
        <CardFooter>
          <Button
            onClick={handleNext}
            disabled={isLoading || !isCurrentAxisCompleted()}
            size="lg"
            className="w-full md:w-auto"
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : currentAxis < 4 ? (
              '다음 축으로 이동'
            ) : (
              '결과 보기'
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
