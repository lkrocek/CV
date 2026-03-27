import { useEffect, useRef, useState } from 'react';
import type { CVData } from '../types';
import type { TechnologyInsight } from '../components/profile/profileContent';

export const useTechnologyInsights = (data: CVData) => {
  const [insights, setInsights] = useState<TechnologyInsight[]>([]);
  const [ready, setReady] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  useEffect(() => {
    const worker = new Worker(
      new URL('../workers/insightsWorker.ts', import.meta.url),
      { type: 'module' }
    );
    workerRef.current = worker;

    worker.onmessage = (event: MessageEvent<{ type: 'result'; insights: TechnologyInsight[] }>) => {
      if (event.data.type === 'result') {
        setInsights(event.data.insights);
        setReady(true);
      }
    };

    return () => worker.terminate();
  }, []);

  useEffect(() => {
    if (workerRef.current && data.companies.length > 0 && data.skills.length > 0) {
      workerRef.current.postMessage({ type: 'compute', data });
    }
  }, [data]);

  return { insights, ready };
};
