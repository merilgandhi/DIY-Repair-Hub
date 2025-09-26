import React, { useState } from 'react';
import { aiAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

const ImageRecognition = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setAnalysis('');
      setError('');
    }
  };

  const analyzeImage = async () => {
    if (!selectedImage || !token) return;

    setLoading(true);
    setError('');
    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      const response = await aiAPI.analyzeImage(formData, token);
      setAnalysis(response.analysis);
    } catch (err) {
      console.error('Error analyzing image:', err);
      setError('❌ Sorry, there was an error analyzing the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card p-6">
      <h3 className="text-xl font-bold mb-3 text-gray-800">🖼️ Image Recognition</h3>
      <p className="text-gray-600 mb-4">
        Upload an image of a tool or repair situation, and our AI will provide insights and suggestions.
      </p>

      <div className="space-y-4">
        {/* Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="input-field cursor-pointer"
            disabled={!token}
          />
          {!token && (
            <p className="text-sm text-red-500 mt-1">⚠️ Please login to use image recognition</p>
          )}
        </div>

        {/* Preview */}
        {previewUrl && (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-w-full h-64 object-cover rounded-lg shadow-md border hover:scale-105 transition-transform"
            />
          </div>
        )}

        {/* Analyze Button */}
        {selectedImage && token && (
          <button
            onClick={analyzeImage}
            disabled={loading}
            className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-30" />
                  <path
                    d="M4 12a8 8 0 018-8"
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="opacity-70"
                  />
                </svg>
                <span>Analyzing...</span>
              </>
            ) : (
              <span>🔍 Analyze Image</span>
            )}
          </button>
        )}

        {/* Results */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
            <h4 className="font-semibold text-red-800 mb-2">Error:</h4>
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {analysis && !error && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <h4 className="font-semibold text-blue-900 mb-2">✅ AI Analysis:</h4>
            <div className="text-blue-800 whitespace-pre-wrap">{analysis}</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageRecognition;
