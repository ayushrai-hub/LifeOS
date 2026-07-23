import { useState } from 'react';
import { ArrowLeft, Check, AlertCircle, CheckCircle, Copy, Bell, ThumbsUp, ThumbsDown, ChevronDown } from 'lucide-react';
import Header from '../components/Header';
import type { AnalysisResult } from '../types';

interface ResultsPageProps {
  onBack: () => void;
  result: AnalysisResult;
}

export default function ResultsPage({ onBack, result }: ResultsPageProps) {
  const [showConditions, setShowConditions] = useState(false);
  const [showUnverified, setShowUnverified] = useState(false);
  const [copied, setCopied] = useState(false);
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText('SAVE20');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (type: 'up' | 'down') => {
    setFeedback(type);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header showUserMenu />

      <main className="max-w-3xl mx-auto px-6 py-8">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Analysis</span>
        </button>

        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>

            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              {result.recommendation}
            </h1>

            <p className="text-lg text-gray-600">
              This code saves you <span className="font-bold text-gray-900">{result.savings}</span>, which is the best available offer we found.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full mt-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm font-medium">High Confidence ({result.confidence}%)</span>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">
              Why We Recommend This
            </h2>

            <div className="space-y-3">
              {result.reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-3">
                  {reason.type === 'success' && (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  )}
                  {reason.type === 'warning' && (
                    <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                  )}
                  {reason.type === 'info' && (
                    <div className="w-5 h-5 flex-shrink-0 mt-0.5">
                      <div className="w-5 h-5 rounded-full border-2 border-blue-500 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                      </div>
                    </div>
                  )}
                  <span className="text-gray-700">{reason.text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-6 space-y-3">
            <button
              onClick={() => setShowConditions(!showConditions)}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-sm">📋</span>
                </div>
                <span className="font-medium text-gray-900">Conditions We Considered</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showConditions ? 'rotate-180' : ''}`} />
            </button>

            {showConditions && (
              <div className="px-4 pb-4 text-sm text-gray-600 space-y-2">
                <p>• Minimum purchase requirement of $0.00</p>
                <p>• Valid for online and in-store purchases</p>
                <p>• Cannot be combined with other offers</p>
                <p>• Applies to regular-priced items only</p>
              </div>
            )}

            <button
              onClick={() => setShowUnverified(!showUnverified)}
              className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-sm">❓</span>
                </div>
                <span className="font-medium text-gray-900">Things We Couldn't Verify</span>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showUnverified ? 'rotate-180' : ''}`} />
            </button>

            {showUnverified && (
              <div className="px-4 pb-4 text-sm text-gray-600 space-y-2">
                <p>• Exact inventory levels at your location</p>
                <p>• Product-specific exclusions</p>
                <p>• Regional restrictions may apply</p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
            <button
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Copy className="w-5 h-5" />
              {copied ? 'Copied!' : 'Copy Code & Apply'}
            </button>
            <button className="flex items-center justify-center gap-2 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors">
              <Bell className="w-5 h-5" />
              Set Reminder
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 mt-8 pt-8 border-t border-gray-200">
            <span className="text-sm text-gray-600">Was this analysis helpful?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleFeedback('up')}
                className={`p-2 rounded-lg transition-colors ${
                  feedback === 'up'
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleFeedback('down')}
                className={`p-2 rounded-lg transition-colors ${
                  feedback === 'down'
                    ? 'bg-red-100 text-red-600'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <ThumbsDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mt-6">
          Analysis based on publicly available data. TruthPrice does not guarantee coupon validity at moment of purchase.
        </p>
      </main>
    </div>
  );
}
