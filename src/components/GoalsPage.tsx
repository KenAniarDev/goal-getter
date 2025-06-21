'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface Goal {
  id: string;
  title: string;
  category: string;
  deadline: string;
  progress: number;
  status: 'In Progress' | 'Completed' | 'Not Started' | 'Failed';
}

interface GoalsPageProps {
  goals?: Goal[];
}

const GoalsPage: React.FC<GoalsPageProps> = ({
  goals = [
    {
      id: '1',
      title: 'Run a marathon',
      category: 'Fitness',
      deadline: '2024-12-31',
      progress: 75,
      status: 'In Progress'
    },
    {
      id: '2',
      title: 'Learn Spanish',
      category: 'Personal Development',
      deadline: '2024-06-30',
      progress: 50,
      status: 'In Progress'
    },
    {
      id: '3',
      title: 'Read 12 books',
      category: 'Personal Development',
      deadline: '2024-12-31',
      progress: 100,
      status: 'Completed'
    },
    {
      id: '4',
      title: 'Save $5,000',
      category: 'Finance',
      deadline: '2024-12-31',
      progress: 25,
      status: 'In Progress'
    },
    {
      id: '5',
      title: 'Launch a side project',
      category: 'Career',
      deadline: '2024-09-30',
      progress: 0,
      status: 'Not Started'
    }
  ]
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('All Goals');
  const router = useRouter();

  const filterOptions = ['All Goals', 'Active', 'Completed', 'Failed'];

  const getStatusButtonClass = (status: string) => {
    return "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#2c3035] text-white text-sm font-medium leading-normal w-full";
  };

  const getActionText = (status: string) => {
    return status === 'Completed' ? 'View' : 'Edit';
  };

  const handleAddNewGoal = () => {
    router.push('/create-goal');
  };

  return (
    <>
      {/* Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <div className="flex min-w-72 flex-col gap-3">
          <p className="text-white text-[32px] font-bold leading-tight">
            My Goals
          </p>
          <p className="text-[#a2abb3] text-sm font-normal leading-normal">
            Track your progress and stay motivated
          </p>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleAddNewGoal}
            className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-white px-4 py-2 text-sm font-medium leading-normal text-black hover:bg-gray-100"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12.6667 8H3.33333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Add New Goal
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-3 p-3 flex-wrap pr-4">
        {filterOptions.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl pl-4 pr-4 ${
              activeFilter === filter
                ? 'bg-[#2c3035] text-white'
                : 'bg-transparent text-[#a2abb3] hover:bg-[#2c3035] hover:text-white'
            }`}
          >
            <p className="text-sm font-medium leading-normal">
              {filter}
            </p>
          </button>
        ))}
      </div>

      {/* Goals Table */}
      <div className="px-4 py-3">
        <div className="flex overflow-hidden rounded-xl border border-[#40474f] bg-[#121416]">
          <table className="flex-1">
            <thead>
              <tr className="bg-[#1e2124]">
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Goal
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Deadline
                </th>
                <th className="px-4 py-3 text-left text-white w-[400px] text-sm font-medium leading-normal">
                  Progress
                </th>
                <th className="px-4 py-3 text-left text-white w-60 text-sm font-medium leading-normal">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-[#a2abb3] w-60 text-sm font-medium leading-normal">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {goals.map((goal) => (
                <tr key={goal.id} className="border-t border-t-[#40474f]">
                  <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                    {goal.title}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                    {goal.category}
                  </td>
                  <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                    {goal.deadline}
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
                  <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                    <button className={getStatusButtonClass(goal.status)}>
                      <span className="truncate">{goal.status}</span>
                    </button>
                  </td>
                  <td className="h-[72px] px-4 py-2 w-60 text-[#a2abb3] text-sm font-bold leading-normal tracking-[0.015em]">
                    {getActionText(goal.status)}
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

export default GoalsPage; 