import PricingPage from "../../components/PricingPage";

export default function Pricing() {
  return (
    <div className="flex h-screen bg-[#121416] dark overflow-hidden">
      {/* Full-width content area */}
      <div className="flex-1 overflow-y-auto">
        <PricingPage />
      </div>
    </div>
  );
}
