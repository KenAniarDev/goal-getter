'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface Goal {
  id: string;
  title: string;
  progress: number;
  dueDate: string;
}

interface DashboardProps {
  userName?: string;
  goalsCompleted?: number;
  goalsInProgress?: number;
  accountabilityStreak?: number;
  overallProgress?: number;
  goals?: Goal[];
}

const Dashboard: React.FC<DashboardProps> = ({
  userName = 'Evelyn',
  goalsCompleted = 12,
  goalsInProgress = 3,
  accountabilityStreak = 7,
  overallProgress = 80,
  goals = [
    {
      id: '1',
      title: 'Run a marathon',
      progress: 75,
      dueDate: '2024-12-31'
    },
    {
      id: '2',
      title: 'Learn Spanish',
      progress: 50,
      dueDate: '2024-06-30'
    },
    {
      id: '3',
      title: 'Read 12 books',
      progress: 25,
      dueDate: '2024-12-31'
    }
  ]
}) => {
  const router = useRouter();

  const handleCreateGoal = () => {
    router.push('/create-goal');
  };

  return (
    <>
      {/* Welcome Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Welcome back, {userName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Goals Completed
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {goalsCompleted}
          </p>
        </div>
        
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Goals in Progress
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {goalsInProgress}
          </p>
        </div>
        
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Accountability Streak
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {accountabilityStreak}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-white text-base font-medium leading-normal">
            Overall Progress
          </p>
          <p className="text-white text-sm font-normal leading-normal">{overallProgress}%</p>
        </div>
        <div className="rounded bg-[#40474f]">
          <div 
            className="h-2 rounded bg-white" 
            style={{ width: `${overallProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Add New Goal Button */}
      <div className="flex px-4 py-3 justify-end">
        <button 
          onClick={handleCreateGoal}
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#3f7fbf] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#2d5f8f] transition-colors"
        >
          <span className="truncate">Add New Goal</span>
        </button>
      </div>

      {/* Goals Summary */}
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Goals Summary
      </h2>
      
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-xl border border-[#40474f] bg-[#121416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Goal
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Due Date
                </th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal.id} className="border-t border-t-[#40474f]">
                  <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                    {goal.title}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-sm font-normal leading-normal">
                    <div className="flex items-center gap-3">
                      <div className="w-[88px] overflow-hidden rounded-sm bg-[#40474f]">
                        <div
                          className="h-1 rounded-full bg-white"
                          style={{ width: `${goal.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-white text-sm font-medium leading-normal">
                        {goal.progress}
                      </p>
                    </div>
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                    {goal.dueDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard; 