'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function ResultsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
      <AlertTriangle className="w-16 h-16 text-red-500 mb-4" />
      <h2 className="text-3xl font-semibold text-red-700 mb-4">결과 표시 오류!</h2>
      <p className="text-slate-600 mb-6">
        결과를 표시하는 중 오류가 발생했습니다: {error.message || "알 수 없는 오류입니다."}
      </p>
      <div className="space-x-4">
        <Button
          onClick={
            // Attempt to recover by trying to re-render the segment
            () => reset()
          }
          variant="outline"
          size="lg"
        >
          다시 시도
        </Button>
        <Link href="/" passHref>
          <Button size="lg">
            처음으로 돌아가기
          </Button>
        </Link>
      </div>
    </div>
  );
}
