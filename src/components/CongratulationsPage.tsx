'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const CongratulationsPage: React.FC = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleContinue = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[#121416] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        {/* Success Icon */}
        <div className="mx-auto w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            fill="white"
            viewBox="0 0 256 256"
          >
            <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-white text-2xl font-bold mb-2">
          Payment Successful!
        </h1>
        
        <p className="text-[#a2abb3] text-base mb-6">
          Your subscription has been activated.
        </p>

        {/* Countdown */}
        <p className="text-[#a2abb3] text-sm mb-4">
          Redirecting in {countdown} seconds...
        </p>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          className="w-full bg-[#3f7fbf] text-white rounded-lg py-3 px-4 text-base font-medium hover:bg-[#2d5f8f] transition-colors"
        >
          Continue to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CongratulationsPage; 