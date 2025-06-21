"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  badge?: string;
  badgeColor?: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  disabled: boolean;
}

const PricingPage: React.FC = () => {
  const router = useRouter();

  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: "Free",
      period: "/month",
      features: ["Track up to 3 goals", "Basic reporting", "Community access"],
      buttonText: "Current Plan",
      buttonColor: "bg-[#2c3035] text-white disabled:opacity-50",
      disabled: true,
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "/month",
      badge: "Most Popular",
      badgeColor: "bg-[#3f7fbf]",
      features: [
        "Unlimited goal tracking",
        "Advanced reporting",
        "Priority support",
        "Exclusive content",
      ],
      buttonText: "Select",
      buttonColor: "bg-[#2c3035] text-white hover:bg-[#40474f]",
      disabled: false,
    },
    {
      name: "Premium",
      price: "$19.99",
      period: "/month",
      badge: "Best Value",
      badgeColor: "bg-[#3f7fbf]",
      features: [
        "All Pro features",
        "Personalized coaching",
        "VIP community access",
        "Early access to new features",
      ],
      buttonText: "Select",
      buttonColor: "bg-[#2c3035] text-white hover:bg-[#40474f]",
      disabled: false,
    },
  ];

  const handlePlanSelect = (planName: string) => {
    console.log(`Selected plan: ${planName}`);
    // Redirect to payment page for non-disabled plans
    if (planName !== "Basic") {
      router.push("/payment");
    }
  };

  const handleBackToDashboard = () => {
    router.push("/");
  };

  return (
    <>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4 pt-6 px-6">
          <button
            onClick={handleBackToDashboard}
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
            <span className="text-sm font-medium">Back to Dashboard</span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Upgrade your plan
        </p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(228px,1fr))] gap-4 py-3 @3xl:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#40474f] bg-[#1e2124] p-6"
            >
              <div className="flex flex-col gap-1">
                <div className="flex items-center justify-between">
                  <h1 className="text-white text-base font-bold leading-tight">
                    {plan.name}
                  </h1>
                  {plan.badge && (
                    <p
                      className={`text-white text-xs font-medium leading-normal tracking-[0.015em] rounded-xl ${plan.badgeColor} px-3 py-[3px] text-center`}
                    >
                      {plan.badge}
                    </p>
                  )}
                </div>
                <p className="flex items-baseline gap-1 text-white">
                  <span className="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                    {plan.price}
                  </span>
                  <span className="text-white text-base font-bold leading-tight">
                    {plan.period}
                  </span>
                </p>
              </div>

              <button
                disabled={plan.disabled}
                onClick={() => handlePlanSelect(plan.name)}
                className={`flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-xl h-10 px-4 text-sm font-bold leading-normal tracking-[0.015em] ${
                  plan.disabled
                    ? "bg-[#2c3035] text-white opacity-50 cursor-not-allowed"
                    : "bg-[#2c3035] text-white hover:bg-[#40474f] cursor-pointer"
                }`}
              >
                <span className="truncate">{plan.buttonText}</span>
              </button>

              <div className="flex flex-col gap-2">
                {plan.features.map((feature, index) => (
                  <div
                    key={index}
                    className="text-[13px] font-normal leading-normal flex gap-3 text-white"
                  >
                    <div className="text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20px"
                        height="20px"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                      >
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PricingPage;
