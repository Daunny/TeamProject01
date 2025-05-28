'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { AlertTriangle } from 'lucide-react';

export default function DiagnoseError({
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
      <h2 className="text-3xl font-semibold text-red-700 mb-4">오류 발생!</h2>
      <p className="text-slate-600 mb-6">
        진단 중 오류가 발생했습니다: {error.message || "알 수 없는 오류입니다."}
      </p>
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
    </div>
  );
}
