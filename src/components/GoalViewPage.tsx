"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiService, Goal, GoalTask } from "../services/api";

interface GoalViewPageProps {
  goalId: number;
}

const GoalViewPage: React.FC<GoalViewPageProps> = ({ goalId }) => {
  const router = useRouter();
  const [goal, setGoal] = useState<Goal | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);
  const [newTask, setNewTask] = useState("");

  const fetchGoal = async (refetch = false) => {
    try {
      if (refetch) {
        const goalData = await apiService.getGoalById(goalId);
        setGoal(goalData);
        return;
      }

      setLoading(true);
      setError(null);
      const goalData = await apiService.getGoalById(goalId);
      setGoal(goalData);
    } catch (err) {
      console.error("Error fetching goal:", err);
      setError("Failed to load goal. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoal();
  }, [goalId]);

  const handleBackToGoals = () => {
    // Navigate back with a parameter to indicate updates were made
    router.push("/goals?updated=true");
  };

  const handleStatusUpdate = async (
    newStatus: "NotStarted" | "InProgress" | "Completed" | "Failed"
  ) => {
    if (!goal) return;

    try {
      setUpdating(true);
      await apiService.updateGoal(goalId, { status: newStatus });
      setGoal((prev) => (prev ? { ...prev, status: newStatus } : null));
      fetchGoal(true);
    } catch (err) {
      console.error("Error updating goal status:", err);
      setError("Failed to update goal status. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const handleTaskToggle = async (taskId: number, isCompleted: boolean) => {
    if (!goal) return;

    try {
      setUpdating(true);
      await apiService.updateTask(goalId, taskId, { isCompleted });

      // Update local state
      setGoal((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          tasks:
            prev.tasks?.map((task) =>
              task.id === taskId ? { ...task, isCompleted } : task
            ) || [],
        };
      });
      fetchGoal(true);
    } catch (err) {
      console.error("Error updating task:", err);
      setError("Failed to update task. Please try again.");
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-900/20 text-green-400 border-green-500/50";
      case "InProgress":
        return "bg-blue-900/20 text-blue-400 border-blue-500/50";
      case "Failed":
        return "bg-red-900/20 text-red-400 border-red-500/50";
      case "NotStarted":
        return "bg-gray-900/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-[#2c3035] text-white border-[#404550]";
    }
  };

  const getStatusOptions = (currentStatus: string) => {
    const allStatuses = ["NotStarted", "InProgress", "Completed", "Failed"];
    return allStatuses.filter((status) => status !== currentStatus);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121416]">
        <div className="text-white text-lg">Loading goal...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121416]">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  if (!goal) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#121416]">
        <div className="text-white text-lg">Goal not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121416]">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-[#121416] border-[#2c3035] p-4">
        <div className="flex items-center gap-4 pt-6 px-6">
          <button
            onClick={handleBackToGoals}
            className="flex items-center gap-2 text-[#a2abb3] hover:text-white transition-colors cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              viewBox="0 0 256 256"
            >
              <path d="M224,128a8,8,0,0,1-8,8H59.31l58.35,58.34a8,8,0,0,1-11.32,11.32l-72-72a8,8,0,0,1,0-11.32l72-72a8,8,0,0,1,11.32,11.32L59.31,120H216A8,8,0,0,1,224,128Z"></path>
            </svg>
            <span className="text-sm font-medium">Back to Goals</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl gap-1 px-6 flex flex-1 justify-center py-5 bg-[#121416]">
        <div className="layout-content-container flex flex-col flex-1">
          <div className="flex flex-col px-4">
            {/* Goal Header */}
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1">
                <h1 className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72 mb-2">
                  {goal.title}
                </h1>
                <div className="flex items-center gap-4 text-[#a2abb3] text-sm">
                  <span>Category: {goal.category || "Uncategorized"}</span>
                  <span>Due: {formatDate(goal.targetDate)}</span>
                  <span>Progress: {Math.round(goal.progress)}%</span>
                </div>
              </div>

              {/* Status Update */}
              <div className="flex flex-col gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(
                    goal.status
                  )}`}
                >
                  {goal.status.replace(/([A-Z])/g, " $1").trim()}
                </span>
                <select
                  value=""
                  onChange={(e) =>
                    e.target.value && handleStatusUpdate(e.target.value as any)
                  }
                  disabled={updating}
                  className="bg-[#2c3035] text-white rounded-lg px-3 py-1 text-sm border border-[#404550] focus:outline-none focus:ring-1 focus:ring-[#3f7fbf] disabled:opacity-50"
                >
                  <option value="">Change Status</option>
                  {getStatusOptions(goal.status).map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/([A-Z])/g, " $1").trim()}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-sm font-medium">
                  Overall Progress
                </span>
                <span className="text-[#a2abb3] text-sm">
                  {Math.round(goal.progress)}%
                </span>
              </div>
              <div className="w-full bg-[#40474f] rounded-full h-3">
                <div
                  className="bg-white h-3 rounded-full transition-all duration-300"
                  style={{ width: `${goal.progress}%` }}
                ></div>
              </div>
            </div>

            <div className="flex gap-6">
              {/* Left Column - Goal Details */}
              <div className="flex-1 space-y-6">
                {/* Description */}
                {goal.description && (
                  <div>
                    <h3 className="text-white text-lg font-bold mb-3">
                      Description
                    </h3>
                    <div className="bg-[#2c3035] rounded-xl p-4 border border-[#404550]">
                      <p className="text-white text-sm leading-relaxed">
                        {goal.description}
                      </p>
                    </div>
                  </div>
                )}

                {/* Plan */}
                {goal.plan && (
                  <div>
                    <h3 className="text-white text-lg font-bold mb-3">Plan</h3>
                    <div className="bg-[#2c3035] rounded-xl p-4 border border-[#404550]">
                      <p className="text-white text-sm leading-relaxed whitespace-pre-line">
                        {goal.plan}
                      </p>
                    </div>
                  </div>
                )}

                {/* Goal Info */}
                <div>
                  <h3 className="text-white text-lg font-bold mb-3">
                    Goal Information
                  </h3>
                  <div className="bg-[#2c3035] rounded-xl p-4 space-y-3 border border-[#404550]">
                    <div className="flex justify-between">
                      <span className="text-[#a2abb3] text-sm">Created:</span>
                      <span className="text-white text-sm">
                        {formatDate(goal.createdAt)}
                      </span>
                    </div>
                    {goal.updatedAt && (
                      <div className="flex justify-between">
                        <span className="text-[#a2abb3] text-sm">
                          Last Updated:
                        </span>
                        <span className="text-white text-sm">
                          {formatDate(goal.updatedAt)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-[#a2abb3] text-sm">
                        Tasks Completed:
                      </span>
                      <span className="text-white text-sm">
                        {goal.completedTasks} / {goal.totalTasks}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Tasks */}
              <div className="flex-1">
                <h3 className="text-white text-lg font-bold mb-3">Tasks</h3>

                {/* Tasks List */}
                <div className="space-y-2">
                  {goal.tasks && goal.tasks.length > 0 ? (
                    goal.tasks.map((task) => (
                      <div
                        key={task.id}
                        className={`bg-[#2c3035] rounded-xl p-4 border transition-all ${
                          task.isCompleted
                            ? "border-green-500/50 bg-green-900/10"
                            : "border-[#404550]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() =>
                                handleTaskToggle(task.id, !task.isCompleted)
                              }
                              disabled={updating}
                              className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                                task.isCompleted
                                  ? "bg-green-500 border-green-500"
                                  : "border-[#a2abb3] hover:border-white"
                              } disabled:opacity-50`}
                            >
                              {task.isCompleted && (
                                <svg
                                  width="12"
                                  height="12"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                >
                                  <path
                                    d="M20 6L9 17L4 12"
                                    stroke="white"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </button>
                            <span
                              className={`text-sm flex-1 ${
                                task.isCompleted
                                  ? "text-[#a2abb3] line-through"
                                  : "text-white"
                              }`}
                            >
                              {task.description}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="bg-[#2c3035] rounded-xl p-4 text-center border border-[#404550]">
                      <p className="text-[#a2abb3] text-sm">
                        No tasks yet. Add your first task above!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoalViewPage;
