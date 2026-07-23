import { Upload, Lock } from 'lucide-react';
import { useState } from 'react';
import Header from '../components/Header';

interface UploadPageProps {
  onNavigate: (page: 'verify') => void;
}

export default function UploadPage({ onNavigate }: UploadPageProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      onNavigate('verify');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Upload Coupon Screenshot
          </h1>
          <p className="text-lg text-gray-600">
            Analyze validity and real value instantly.
          </p>
        </div>

        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative border-2 border-dashed rounded-2xl p-16 transition-all ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/jpeg,image/png"
            onChange={handleFileSelect}
          />

          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
              <Upload className="w-8 h-8 text-blue-600" />
            </div>

            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Drag and drop image here
            </h2>
            <p className="text-gray-500 mb-6">or click to browse files</p>

            {selectedFile ? (
              <div className="inline-block px-4 py-2 bg-green-50 text-green-700 rounded-lg mb-4">
                {selectedFile.name}
              </div>
            ) : (
              <p className="text-sm text-gray-400 mb-8">Supports JPG, PNG</p>
            )}

            <label
              htmlFor="file-upload"
              className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
            >
              Select File
            </label>
          </div>
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!selectedFile}
          className="w-full mt-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-lg"
        >
          Analyze Coupon
        </button>

        <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
          <Lock className="w-4 h-4" />
          <span>Secure analysis. We analyze the math, not your data.</span>
        </div>
      </main>
    </div>
  );
}
