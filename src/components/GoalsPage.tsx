'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { apiService, Goal } from '../services/api';

const GoalsPage: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [filteredGoals, setFilteredGoals] = useState<Goal[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('All Goals');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const router = useRouter();
  const searchParams = useSearchParams();

  const filterOptions = ['All Goals', 'Active', 'Completed', 'Failed'];

  // Check if we're returning from a goal update
  useEffect(() => {
    const fromGoalUpdate = searchParams.get('updated');
    if (fromGoalUpdate === 'true') {
      // Clear the URL parameter
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('updated');
      window.history.replaceState({}, '', newUrl.toString());
      
      // Trigger a refresh
      setRefreshKey(prev => prev + 1);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        setError(null);
        const goalsData = await apiService.getAllGoals();
        setGoals(goalsData);
      } catch (err) {
        console.error('Error fetching goals:', err);
        setError('Failed to load goals. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoals();
  }, [refreshKey]); // Add refreshKey as dependency to trigger refetch

  useEffect(() => {
    let filtered = goals;
    
    switch (activeFilter) {
      case 'Active':
        filtered = goals.filter(goal => goal.status === 'InProgress' || goal.status === 'NotStarted');
        break;
      case 'Completed':
        filtered = goals.filter(goal => goal.status === 'Completed');
        break;
      case 'Failed':
        filtered = goals.filter(goal => goal.status === 'Failed');
        break;
      default:
        filtered = goals;
    }
    
    setFilteredGoals(filtered);
  }, [goals, activeFilter]);

  const getStatusButtonClass = (status: string) => {
    const baseClass = "flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 text-white text-sm font-medium leading-normal w-full";
    
    switch (status) {
      case 'Completed':
        return `${baseClass} bg-green-900/20 text-green-400`;
      case 'InProgress':
        return `${baseClass} bg-blue-900/20 text-blue-400`;
      case 'Failed':
        return `${baseClass} bg-red-900/20 text-red-400`;
      case 'NotStarted':
        return `${baseClass} bg-gray-900/20 text-gray-400`;
      default:
        return `${baseClass} bg-[#2c3035]`;
    }
  };

  const getActionText = (status: string) => {
    return status === 'Completed' ? 'View' : 'Edit';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatStatus = (status: string) => {
    return status.replace(/([A-Z])/g, ' $1').trim();
  };

  const handleAddNewGoal = () => {
    router.push('/create-goal');
  };

  const handleGoalClick = (goalId: number) => {
    router.push(`/goals/${goalId}`);
  };

  const handleActionClick = (e: React.MouseEvent, goalId: number) => {
    e.stopPropagation(); // Prevent row click
    router.push(`/goals/${goalId}`);
  };

  // Function to manually refresh goals data
  const refreshGoals = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-lg">Loading goals...</div>
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
        <div className="flex items-center gap-2">
          <button
            onClick={refreshGoals}
            className="flex h-10 items-center justify-center gap-x-2 rounded-xl bg-[#2c3035] px-4 py-2 text-sm font-medium leading-normal text-white hover:bg-[#404550] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 4V10H7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
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
        {filteredGoals.length === 0 ? (
          <div className="flex items-center justify-center h-32 bg-[#2c3035] rounded-xl">
            <p className="text-[#a2abb3] text-base">
              {goals.length === 0 
                ? "No goals found. Create your first goal to get started!" 
                : `No ${activeFilter.toLowerCase()} goals found.`
              }
            </p>
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
                {filteredGoals.map((goal) => (
                  <tr 
                    key={goal.id} 
                    className="border-t border-t-[#40474f] hover:bg-[#2c3035] cursor-pointer transition-colors"
                    onClick={() => handleGoalClick(goal.id)}
                  >
                    <td className="h-[72px] px-4 py-2 w-[400px] text-white text-sm font-normal leading-normal">
                      {goal.title}
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                      {goal.category || 'Uncategorized'}
                    </td>
                    <td className="h-[72px] px-4 py-2 w-[400px] text-[#a2abb3] text-sm font-normal leading-normal">
                      {formatDate(goal.targetDate)}
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
                    <td className="h-[72px] px-4 py-2 w-60 text-sm font-normal leading-normal">
                      <button 
                        className={getStatusButtonClass(goal.status)}
                        onClick={(e) => handleActionClick(e, goal.id)}
                      >
                        <span className="truncate">{formatStatus(goal.status)}</span>
                      </button>
                    </td>
                    <td className="h-[72px] px-4 py-2 w-60 text-[#a2abb3] text-sm font-bold leading-normal tracking-[0.015em]">
                      <button
                        onClick={(e) => handleActionClick(e, goal.id)}
                        className="hover:text-white transition-colors"
                      >
                        {getActionText(goal.status)}
                      </button>
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

export default GoalsPage; 