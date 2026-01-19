import { Metadata } from 'next';

import Quiz from '@/features/Quiz';

export const metadata: Metadata = {
  title: 'Quiz | AOT APP'
};

export default function QuizPage() {
  return <Quiz />;
}
