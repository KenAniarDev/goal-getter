"use client";
import GoalViewPage from "../../../components/GoalViewPage";

interface GoalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function GoalPage({ params }: GoalPageProps) {
  const { id } = await params;

  return <GoalViewPage goalId={parseInt(id)} />;
}
