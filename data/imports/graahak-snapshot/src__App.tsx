import { useState } from 'react';
import UploadPage from './pages/UploadPage';
import VerifyPage from './pages/VerifyPage';
import ResultsPage from './pages/ResultsPage';
import type { Page, CouponData, AnalysisResult } from './types';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('upload');
  const [couponData, setCouponData] = useState<CouponData>({
    merchantName: 'Target',
    location: 'San Francisco, CA',
    discountValue: '20',
    discountType: 'percentage',
    minSpend: '0.00',
    expirationDate: '2023-12-31',
    category: 'Home & Garden',
  });

  const [analysisResult] = useState<AnalysisResult>({
    recommendation: 'USE',
    savings: '$15.00',
    confidence: 98,
    reasons: [
      {
        type: 'success',
        text: 'Verifiable discount of 20% applied to cart total.',
      },
      {
        type: 'success',
        text: 'Free shipping threshold met (over $50).',
      },
      {
        type: 'warning',
        text: 'Expires in approximately 48 hours.',
      },
    ],
  });

  const navigateToVerify = () => setCurrentPage('verify');
  const navigateToResults = () => setCurrentPage('results');
  const navigateToUpload = () => setCurrentPage('upload');

  return (
    <>
      {currentPage === 'upload' && (
        <UploadPage onNavigate={navigateToVerify} />
      )}
      {currentPage === 'verify' && (
        <VerifyPage
          onNavigate={navigateToResults}
          onBack={navigateToUpload}
          couponData={couponData}
          onUpdate={setCouponData}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage
          onBack={navigateToVerify}
          result={analysisResult}
        />
      )}
    </>
  );
}

export default App;
