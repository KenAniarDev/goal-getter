import { Suspense } from 'react';
import GoalsPage from '../../components/GoalsPage';
import Sidebar from '../../components/Sidebar';

export default function Goals() {
  return (
    <Sidebar>
      <Suspense fallback={<div className="flex items-center justify-center h-64"><div className="text-white text-lg">Loading...</div></div>}>
        <GoalsPage />
      </Suspense>
    </Sidebar>
  );
} 