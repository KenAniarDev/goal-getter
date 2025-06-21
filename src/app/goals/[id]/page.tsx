"use client";

import { useRouter } from 'next/navigation';
import GoalViewPage from '../../../components/GoalViewPage';

interface GoalPageProps {
  params: {
    id: string;
  };
}

export default function GoalPage({ params }: GoalPageProps) {
  const router = useRouter();


  return <GoalViewPage goalId={parseInt(params.id)} />;
} 