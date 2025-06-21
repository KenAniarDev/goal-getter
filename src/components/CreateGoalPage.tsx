"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AICoach from "./AICoach";
import { apiService, Category } from "../services/api";

interface CreateGoalForm {
  title: string;
  description: string;
  plan: string;
  targetDate: string;
  categoryId: string;
  tasks: string[];
  newTask: string;
}

const CreateGoalPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<CreateGoalForm>({
    title: "",
    description: "",
    plan: "",
    targetDate: "",
    categoryId: "",
    tasks: [],
    newTask: "",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await apiService.getAllCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error fetching categories:', err);
        // Categories will fall back to default values in the API service
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (field: keyof CreateGoalForm, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleAddTask = () => {
    if (formData.newTask.trim()) {
      setFormData((prev) => ({
        ...prev,
        tasks: [...prev.tasks, prev.newTask],
        newTask: "",
      }));
    }
  };

  const handleRemoveTask = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      tasks: prev.tasks.filter((_, i) => i !== index),
    }));
  };

  const handleBackToGoals = () => {
    router.push("/goals");
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError("Goal title is required");
      return false;
    }
    if (!formData.categoryId) {
      setError("Please select a category");
      return false;
    }
    if (!formData.targetDate) {
      setError("Target date is required");
      return false;
    }
    if (new Date(formData.targetDate) < new Date()) {
      setError("Target date cannot be in the past");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const goalData = {
        title: formData.title.trim(),
        description: formData.description.trim() || undefined,
        plan: formData.plan.trim() || undefined,
        categoryId: parseInt(formData.categoryId),
        targetDate: new Date(formData.targetDate).toISOString(),
        tasks: formData.tasks.length > 0 ? formData.tasks : undefined,
      };

      await apiService.createGoal(goalData);
      
      setSuccess(true);
      
      // Redirect to goals page after a short delay
      setTimeout(() => {
        router.push("/goals");
      }, 1500);
      
    } catch (err) {
      console.error('Error creating goal:', err);
      setError(err instanceof Error ? err.message : 'Failed to create goal. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAddTask();
    }
  };

  return (
    <>
      {/* Sticky Header */}
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
      <div className="mx-auto max-w-7xl gap-1 px-6 flex flex-1 justify-center py-5">
        {/* Form */}
        <div className="layout-content-container flex flex-col flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col px-4">
            <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
              Set a New Goal
            </p>

            {/* Success Message */}
            {success && (
              <div className="mt-4 p-4 bg-green-900/20 border border-green-500/50 rounded-xl">
                <p className="text-green-400 text-sm font-medium">
                  Goal created successfully! Redirecting to goals page...
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mt-4 p-4 bg-red-900/20 border border-red-500/50 rounded-xl">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <div className="flex gap-4 py-3">
              {/* Left Half - All Inputs */}
              <div className="flex flex-col flex-1 space-y-3">
                {/* Goal Title, Category, and Target Date on same line */}
                <label className="flex flex-col flex-1">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Goal Title *
                  </p>
                  <input
                    type="text"
                    placeholder="e.g., Run a marathon"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
                    disabled={submitting}
                  />
                </label>

                <div className="flex gap-4">
                  <label className="flex flex-col flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Category *
                    </p>
                    <select
                      value={formData.categoryId}
                      onChange={(e) =>
                        handleInputChange("categoryId", e.target.value)
                      }
                      className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
                      disabled={submitting}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="flex flex-col flex-1">
                    <p className="text-white text-base font-medium leading-normal pb-2">
                      Target Date *
                    </p>
                    <div className="flex w-full flex-1 items-stretch rounded-xl">
                      <input
                        type="date"
                        placeholder="Select a date"
                        value={formData.targetDate}
                        onChange={(e) =>
                          handleInputChange("targetDate", e.target.value)
                        }
                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                        disabled={submitting}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <div className="text-[#a2abb3] flex border-none bg-[#2c3035] items-center justify-center pr-4 rounded-r-xl border-l-0">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24px"
                          height="24px"
                          fill="currentColor"
                          viewBox="0 0 256 256"
                        >
                          <path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Zm-96-88v64a8,8,0,0,1-16,0V132.94l-4.42,2.22a8,8,0,0,1-7.16-14.32l16-8A8,8,0,0,1,112,120Zm59.16,30.45L152,176h16a8,8,0,0,1,0,16H136a8,8,0,0,1-6.4-12.8l28.78-38.37A8,8,0,1,0,145.07,132a8,8,0,1,1-13.85-8A24,24,0,0,1,176,136,23.76,23.76,0,0,1,171.16,150.45Z"></path>
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Description - Full Width */}
                <label className="flex flex-col w-full">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Description
                  </p>
                  <textarea
                    placeholder="Describe your goal in detail"
                    value={formData.description}
                    onChange={(e) =>
                      handleInputChange("description", e.target.value)
                    }
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none min-h-36 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
                    disabled={submitting}
                  />
                </label>
                {/* Plan - Full Width */}
                <label className="flex flex-col w-full">
                  <p className="text-white text-base font-medium leading-normal pb-2">
                    Plan
                  </p>
                  <textarea
                    placeholder="Outline the steps to achieve your goal"
                    value={formData.plan}
                    onChange={(e) => handleInputChange("plan", e.target.value)}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none min-h-36 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
                    disabled={submitting}
                  />
                </label>
                {/* Submit Button */}
                <div className="flex pt-3">
                  <button
                    type="submit"
                    disabled={submitting}
                    className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 flex-1 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                      submitting 
                        ? 'bg-[#2c3035] cursor-not-allowed' 
                        : 'bg-[#3f7fbf] hover:bg-[#2d5f8f]'
                    }`}
                  >
                    <span className="truncate">
                      {submitting ? 'Creating Goal...' : 'Set Goal'}
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Half - Tasks Only */}
              <div className="flex flex-col flex-1">
                <h3 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-2">
                  Tasks
                </h3>

                {/* Add Task Input */}
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    placeholder="Add a task (press Enter to add)"
                    value={formData.newTask}
                    onChange={(e) =>
                      handleInputChange("newTask", e.target.value)
                    }
                    onKeyPress={handleKeyPress}
                    className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
                    disabled={submitting}
                  />

                  {/* Add Task Button */}
                  <button
                    type="button"
                    onClick={handleAddTask}
                    disabled={submitting || !formData.newTask.trim()}
                    className={`flex cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors ${
                      submitting || !formData.newTask.trim()
                        ? 'bg-[#2c3035] cursor-not-allowed opacity-50'
                        : 'bg-[#2c3035] hover:bg-[#40474f]'
                    }`}
                  >
                    <span className="truncate">Add Task</span>
                  </button>
                </div>

                {/* Display Tasks */}
                {formData.tasks.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {formData.tasks.map((task, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-[#2c3035] rounded-lg p-3"
                      >
                        <span className="text-white text-sm">{task}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTask(index)}
                          disabled={submitting}
                          className="text-[#a2abb3] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                          >
                            <path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* AI Coach Popup */}
      <AICoach formData={formData} isDefaultOpen={true} />
    </>
  );
};

export default CreateGoalPage;
