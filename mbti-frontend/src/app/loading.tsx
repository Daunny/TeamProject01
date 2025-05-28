import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Loader2 className="h-16 w-16 text-sky-600 animate-spin mb-4" />
      <p className="text-lg text-slate-700">데이터를 불러오는 중입니다...</p>
    </div>
  );
}
