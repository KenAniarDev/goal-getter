# API Integration Setup

This project integrates with a backend API for goal management. Here's how to set it up:

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Replace `http://localhost:5000` with your actual backend API URL.

## API Endpoints

The application uses the following API endpoints based on the Swagger specification:

### Dashboard
- `GET /api/summary` - Get dashboard summary statistics
- `GET /api/goals` - Get all goals

### Goals Management
- `POST /api/goals` - Create a new goal
- `PUT /api/goals/{id}` - Update a goal
- `DELETE /api/goals/{id}` - Delete a goal
- `GET /api/goals/{id}` - Get goal by ID

### Categories
- `GET /api/categories` - Get all categories

### Tasks
- `POST /api/goals/{goalId}/tasks` - Add task to goal
- `PUT /api/goals/{goalId}/tasks/{taskId}` - Update task
- `DELETE /api/goals/{goalId}/tasks/{taskId}` - Delete task

### Payment
- `POST /api/payment/subscribe` - Stripe subscription

## Features Implemented

### Dashboard Integration
- ✅ Real-time dashboard summary from API
- ✅ Goals list with progress tracking
- ✅ Loading states and error handling
- ✅ Fallback data when API is unavailable

### Goals Page Integration
- ✅ Real goals data from API
- ✅ Filtering by status (All, Active, Completed, Failed)
- ✅ Proper date formatting
- ✅ Status badges with color coding
- ✅ Empty state handling

### API Service
- ✅ Centralized API service with TypeScript interfaces
- ✅ Error handling and fallbacks
- ✅ All CRUD operations for goals
- ✅ Category management
- ✅ Task management

## Data Models

The application uses TypeScript interfaces that match the API schema:

- `Goal` - Complete goal object with tasks and progress
- `GoalTask` - Individual task within a goal
- `DashboardSummary` - Dashboard statistics
- `Category` - Goal categories

## Error Handling

The application gracefully handles API failures:
- Shows loading states during API calls
- Displays error messages when API calls fail
- Falls back to default data when API is unavailable
- Console logging for debugging

## Next Steps

To complete the integration:

1. Set up your backend API server
2. Configure the `NEXT_PUBLIC_API_BASE_URL` environment variable
3. Test the API endpoints
4. Implement authentication if required
5. Add real-time updates if needed 