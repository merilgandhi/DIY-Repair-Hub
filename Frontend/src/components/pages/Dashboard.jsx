import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useGuide } from '../../context/GuideContext.jsx';
import GuideForm from '../Guides/GuideForm.jsx';
import GuideList from '../Guides/GuideList.jsx';
import ImageRecognition from '../AI/ImageRecognition.jsx';

const Dashboard = () => {
  const { user } = useAuth();
  const { createGuide } = useGuide();
  const [activeTab, setActiveTab] = useState('my-guides');
  const [showGuideForm, setShowGuideForm] = useState(false);

  const handleCreateGuide = async (guideData) => {
    const result = await createGuide(guideData, user.token);
    if (result.success) {
      setShowGuideForm(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl shadow-md text-white">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-indigo-100">Welcome back, {user?.username}!</p>
        </div>
        <button
          onClick={() => setShowGuideForm(true)}
          className="px-5 py-2 bg-white text-indigo-600 font-semibold rounded-lg shadow hover:bg-indigo-50 transition"
        >
          + Create New Guide
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['my-guides', 'browse', 'ai-tools'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-3 px-2 border-b-2 font-medium text-sm capitalize transition ${
                activeTab === tab
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.replace('-', ' ')}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'my-guides' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">My Guides</h2>
            <GuideList />
          </div>
        )}

        {activeTab === 'browse' && (
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Browse All Guides</h2>
            <GuideList />
          </div>
        )}

        {activeTab === 'ai-tools' && (
          <div className="grid md:grid-cols-2 gap-6">
            <ImageRecognition />
            <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <h3 className="text-lg font-semibold mb-3 text-gray-800">AI Repair Assistant</h3>
              <p className="text-gray-600 mb-4">
                Get instant help from our AI assistant for any repair questions you have.
              </p>
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <p className="text-sm text-gray-700">
                  The chat widget is available in the bottom-right corner of the screen.  
                  Click the chat icon to start a conversation with our AI assistant.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Guide Form Modal */}
      {showGuideForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Create New Guide</h2>
                <button
                  onClick={() => setShowGuideForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <GuideForm onSubmit={handleCreateGuide} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
