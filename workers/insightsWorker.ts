import { buildTechnologyInsights } from '../components/profile/profileContent';
import type { CVData } from '../types';
import type { TechnologyInsight } from '../components/profile/profileContent';

type IncomingMessage = { type: 'compute'; data: CVData };
type OutgoingMessage = { type: 'result'; insights: TechnologyInsight[] };

self.onmessage = (event: MessageEvent<IncomingMessage>) => {
  if (event.data.type === 'compute') {
    const insights = buildTechnologyInsights(event.data.data);
    const message: OutgoingMessage = { type: 'result', insights };
    self.postMessage(message);
  }
};
