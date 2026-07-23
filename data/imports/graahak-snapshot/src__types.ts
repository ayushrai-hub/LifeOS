export interface CouponData {
  merchantName: string;
  location: string;
  discountValue: string;
  discountType: 'percentage' | 'fixed';
  minSpend: string;
  expirationDate: string;
  category: string;
}

export interface AnalysisResult {
  recommendation: 'USE' | 'SKIP';
  savings: string;
  confidence: number;
  reasons: Array<{
    type: 'success' | 'warning' | 'info';
    text: string;
  }>;
}

export type Page = 'upload' | 'verify' | 'results';
