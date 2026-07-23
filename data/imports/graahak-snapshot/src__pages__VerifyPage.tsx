import { useState } from 'react';
import { ChevronRight, Image as ImageIcon, Store, Tag, Calendar, ChevronDown, Lock, AlertTriangle, Info, MapPin } from 'lucide-react';
import Header from '../components/Header';
import type { CouponData } from '../types';

interface VerifyPageProps {
  onNavigate: (page: 'results') => void;
  onBack: () => void;
  couponData: CouponData;
  onUpdate: (data: CouponData) => void;
}

export default function VerifyPage({ onNavigate, onBack, couponData, onUpdate }: VerifyPageProps) {
  const [showOriginal, setShowOriginal] = useState(false);
  const [showTransparency, setShowTransparency] = useState(false);

  const handleChange = (field: keyof CouponData, value: string) => {
    onUpdate({ ...couponData, [field]: value });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showUserMenu showNotifications />

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <button onClick={onBack} className="hover:text-gray-900">Home</button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={onBack} className="hover:text-gray-900">Upload</button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">Verify Details</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          Verify Extracted Data
        </h1>
        <p className="text-gray-600 mb-8">
          We extracted the following details from your image. Please correct any errors or fill in missing fields before we analyze the true value.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <button
                onClick={() => setShowOriginal(!showOriginal)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-gray-900">Coupon Summary (Original Image)</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showOriginal ? 'rotate-180' : ''}`} />
              </button>
              {showOriginal && (
                <div className="px-6 pb-6 border-t border-gray-200">
                  <div className="mt-4 p-4 bg-gray-100 rounded-lg text-sm text-gray-600">
                    Original coupon image would be displayed here
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Store className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Merchant Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Merchant Name
                  </label>
                  <input
                    type="text"
                    value={couponData.merchantName}
                    onChange={(e) => handleChange('merchantName', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store URL or Location
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={couponData.location}
                      onChange={(e) => handleChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Tag className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Deal Specifics</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Value
                  </label>
                  <input
                    type="text"
                    value={couponData.discountValue}
                    onChange={(e) => handleChange('discountValue', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={couponData.discountType}
                    onChange={(e) => handleChange('discountType', e.target.value as 'percentage' | 'fixed')}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount ($)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min. Spend
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <input
                      type="text"
                      value={couponData.minSpend}
                      onChange={(e) => handleChange('minSpend', e.target.value)}
                      className="w-full pl-7 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="font-semibold text-gray-900">Validity & Restrictions</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiration Date
                    <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">
                      <AlertTriangle className="w-3 h-3" />
                      Low Confidence
                    </span>
                  </label>
                  <input
                    type="date"
                    value={couponData.expirationDate}
                    onChange={(e) => handleChange('expirationDate', e.target.value)}
                    className="w-full px-4 py-2.5 border-2 border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                  <p className="mt-2 text-sm text-orange-600">
                    System detected '2023'. Please confirm if valid.
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={couponData.category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                  >
                    <option value="Home & Garden">Home & Garden</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Clothing">Clothing</option>
                    <option value="Food & Dining">Food & Dining</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowTransparency(!showTransparency)}
              className="w-full flex items-center gap-2 text-gray-600 hover:text-gray-900 text-sm"
            >
              <Info className="w-4 h-4" />
              <span>How we read this (System Transparency)</span>
              <ChevronDown className={`w-4 h-4 ml-auto transition-transform ${showTransparency ? 'rotate-180' : ''}`} />
            </button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ready to analyze?
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Once verified, our AI will compare this deal against 50+ competitors to find the true market price.
              </p>

              <button
                onClick={() => onNavigate('results')}
                className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors mb-3 flex items-center justify-center gap-2"
              >
                <Tag className="w-5 h-5" />
                Get Verdict
              </button>

              <button
                onClick={onBack}
                className="w-full py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>

              <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
                <Lock className="w-4 h-4" />
                <span>Secure Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
