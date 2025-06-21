const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';

export interface Goal {
  id: number;
  title: string;
  description: string | null;
  plan: string | null;
  categoryId: number;
  category: string | null;
  targetDate: string;
  status: 'NotStarted' | 'InProgress' | 'Completed' | 'Failed';
  createdAt: string;
  updatedAt: string | null;
  tasks: GoalTask[] | null;
  progress: number;
  totalTasks: number;
  completedTasks: number;
}

export interface GoalTask {
  id: number;
  goalId: number;
  description: string | null;
  isCompleted: boolean;
  createdAt: string;
  updatedAt: string | null;
}

export interface DashboardSummary {
  goalsCompleted: number;
  goalsInProgress: number;
  accountabilityStreak: number;
  overallProgress: number;
  userName: string;
}

export interface Category {
  id: number;
  name: string | null;
}

// API Functions
export const apiService = {
  // Get dashboard summary
  async getDashboardSummary(): Promise<DashboardSummary> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/summary`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching dashboard summary:', error);
      // Return default values if API fails
      return {
        goalsCompleted: 0,
        goalsInProgress: 0,
        accountabilityStreak: 0,
        overallProgress: 0,
        userName: 'User'
      };
    }
  },

  // Get all goals
  async getAllGoals(): Promise<Goal[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching goals:', error);
      // Return empty array if API fails
      return [];
    }
  },

  // Get all categories
  async getAllCategories(): Promise<Category[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Return default categories if API fails
      return [
        { id: 1, name: 'Fitness' },
        { id: 2, name: 'Personal Development' },
        { id: 3, name: 'Finance' },
        { id: 4, name: 'Career' },
        { id: 5, name: 'Health' },
        { id: 6, name: 'Learning' }
      ];
    }
  },

  // Create a new goal
  async createGoal(goalData: {
    title: string;
    description?: string;
    plan?: string;
    categoryId: number;
    targetDate: string;
    tasks?: string[];
  }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating goal:', error);
      throw error;
    }
  },

  // Update a goal
  async updateGoal(id: number, goalData: {
    title?: string;
    description?: string;
    plan?: string;
    categoryId?: number;
    targetDate?: string;
    status?: 'NotStarted' | 'InProgress' | 'Completed' | 'Failed';
  }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(goalData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating goal:', error);
      throw error;
    }
  },

  // Delete a goal
  async deleteGoal(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
      throw error;
    }
  },

  // Get goal by ID
  async getGoalById(id: number): Promise<Goal> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching goal:', error);
      throw error;
    }
  },

  // Add task to goal
  async addTaskToGoal(goalId: number, taskData: { description: string }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  // Update task
  async updateTask(goalId: number, taskId: number, taskData: {
    description?: string;
    isCompleted?: boolean;
  }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  // Delete task
  async deleteTask(goalId: number, taskId: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/goals/${goalId}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  }
}; 