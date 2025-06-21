'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiService, Goal, DashboardSummary } from '../services/api';

const Dashboard: React.FC = () => {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardSummary>({
    goalsCompleted: 0,
    goalsInProgress: 0,
    accountabilityStreak: 0,
    overallProgress: 0,
    userName: 'User'
  });
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both summary and goals in parallel
        const [summaryData, goalsData] = await Promise.all([
          apiService.getDashboardSummary(),
          apiService.getAllGoals()
        ]);
        
        setSummary(summaryData);
        setGoals(goalsData);
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateGoal = () => {
    router.push('/create-goal');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Header */}
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Welcome back, {summary.userName}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="flex flex-wrap gap-4 p-4">
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Goals Completed
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {summary.goalsCompleted}
          </p>
        </div>
        
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Goals in Progress
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {summary.goalsInProgress}
          </p>
        </div>
        
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#2c3035]">
          <p className="text-white text-base font-medium leading-normal">
            Accountability Streak
          </p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {summary.accountabilityStreak}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div className="flex flex-col gap-3 p-4">
        <div className="flex gap-6 justify-between">
          <p className="text-white text-base font-medium leading-normal">
            Overall Progress
          </p>
          <p className="text-white text-sm font-normal leading-normal">{summary.overallProgress}%</p>
        </div>
        <div className="rounded bg-[#40474f]">
          <div 
            className="h-2 rounded bg-white" 
            style={{ width: `${summary.overallProgress}%` }}
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
        {goals.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-[#2c3035] rounded-xl">
            <p className="text-[#a2abb3] text-base">No goals found. Create your first goal to get started!</p>
          </div>
        ) : (
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
                  <th className="px-4 py-3 text-left text-white w-[200px] text-sm font-medium leading-normal">
                    Status
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
                          {Math.round(goal.progress)}%
                        </p>
                      </div>
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                      {formatDate(goal.targetDate)}
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[200px] text-sm font-normal leading-normal">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        goal.status === 'Completed' ? 'bg-green-900/20 text-green-400' :
                        goal.status === 'InProgress' ? 'bg-blue-900/20 text-blue-400' :
                        goal.status === 'Failed' ? 'bg-red-900/20 text-red-400' :
                        'bg-gray-900/20 text-gray-400'
                      }`}>
                        {goal.status.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard; 