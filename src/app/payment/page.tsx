import PaymentPage from '../../components/PaymentPage';

export default function Payment() {
  return (
    <div className="flex h-screen bg-[#121416] dark overflow-hidden">
      {/* Full-width content area */}
      <div className="flex-1 overflow-y-auto p-6">
        <PaymentPage />
      </div>
    </div>
  );
} 