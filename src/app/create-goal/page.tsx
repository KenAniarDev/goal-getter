"use client";
import CreateGoalPage from "../../components/CreateGoalPage";

export default function CreateGoal() {
  return (
    <div className="flex h-screen bg-[#121416] dark overflow-hidden">
      {/* Full-width content area */}
      <div className="flex-1 overflow-y-auto">
        <CreateGoalPage />
      </div>
    </div>
  );
}
