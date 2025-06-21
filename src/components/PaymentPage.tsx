'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PaymentForm {
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  nameOnCard: string;
  billingAddress: string;
  city: string;
  postalCode: string;
  country: string;
}

const PaymentPage: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<PaymentForm>({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    nameOnCard: '',
    billingAddress: '',
    city: '',
    postalCode: '',
    country: ''
  });

  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Germany',
    'France',
    'Australia',
    'Japan',
    'Other'
  ];

  const handleInputChange = (field: keyof PaymentForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleBackToPricing = () => {
    router.push('/pricing');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Payment form submitted:', formData);
    // TODO: Implement payment processing logic
    
    // Redirect to congratulations page after successful payment
    router.push('/congratulations');
  };

  return (
    <>
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={handleBackToPricing}
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
            <span className="text-sm font-medium">Back to Pricing</span>
          </button>
        </div>
      </div>

      {/* Payment Form */}
      <div className="mx-auto max-w-2xl px-4 py-8">
        <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] pb-6">
          Payment Method
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col max-w-[480px]">
          {/* Card Number */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Card Number
              </p>
              <input
                type="text"
                placeholder="Enter card number"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Expiry Date and CVC */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Expiry Date
              </p>
              <input
                type="text"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                CVC
              </p>
              <input
                type="text"
                placeholder="CVC"
                value={formData.cvc}
                onChange={(e) => handleInputChange('cvc', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Name on Card */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Name on Card
              </p>
              <input
                type="text"
                placeholder="Enter name"
                value={formData.nameOnCard}
                onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Billing Address */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Billing Address
              </p>
              <input
                type="text"
                placeholder="Enter address"
                value={formData.billingAddress}
                onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* City and Postal Code */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                City
              </p>
              <input
                type="text"
                placeholder="Enter city"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Postal Code
              </p>
              <input
                type="text"
                placeholder="Enter postal code"
                value={formData.postalCode}
                onChange={(e) => handleInputChange('postalCode', e.target.value)}
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 text-base font-normal leading-normal"
              />
            </label>
          </div>

          {/* Country */}
          <div className="flex max-w-[480px] flex-wrap items-end gap-4 py-3">
            <label className="flex flex-col min-w-40 flex-1">
              <p className="text-white text-base font-medium leading-normal pb-2">
                Country
              </p>
              <div className="flex w-full flex-1 items-stretch rounded-xl">
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange('country', e.target.value)}
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#2c3035] focus:border-none h-14 placeholder:text-[#a2abb3] p-4 rounded-r-none border-r-0 pr-2 text-base font-normal leading-normal"
                >
                  <option value="">Select country</option>
                  {countries.map((country) => (
                    <option key={country} value={country}>
                      {country}
                    </option>
                  ))}
                </select>
                <div className="text-[#a2abb3] flex border-none bg-[#2c3035] items-center justify-center pr-4 rounded-r-xl border-l-0">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M181.66,170.34a8,8,0,0,1,0,11.32l-48,48a8,8,0,0,1-11.32,0l-48-48a8,8,0,0,1,11.32-11.32L128,212.69l42.34-42.35A8,8,0,0,1,181.66,170.34Zm-96-84.68L128,43.31l42.34,42.35a8,8,0,0,0,11.32-11.32l-48-48a8,8,0,0,0-11.32,0l-48,48A8,8,0,0,0,85.66,85.66Z"></path>
                  </svg>
                </div>
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex py-3">
            <button
              type="submit"
              className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 flex-1 bg-[#3f7fbf] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#2d5f8f] transition-colors"
            >
              <span className="truncate">Confirm Payment</span>
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PaymentPage; 