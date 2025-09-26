import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useGuide } from '../../context/GuideContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const GuideDetail = () => {
  const { id } = useParams();
  const { currentGuide, getGuide, likeGuide, loading } = useGuide();
  const { user, token } = useAuth();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    if (id) {
      getGuide(id);
    }
  }, [id]);

  const handleLike = async () => {
    if (!user) return;
    try {
      await likeGuide(id, token);
    } catch (error) {
      console.error('Error liking guide:', error);
    }
  };

  const isLiked =
    user &&
    currentGuide?.likes?.some((like) =>
      typeof like === 'object' ? like._id === user.id : like === user.id
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (!currentGuide) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Guide not found
        </h3>
        <Link
          to="/"
          className="text-indigo-600 font-medium hover:text-indigo-800 transition"
        >
          ← Back to guides
        </Link>
      </div>
    );
  }

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0
      ? `${hours} hours ${mins} minutes`
      : `${hours} hours`;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {currentGuide.title}
            </h1>
            <p className="text-gray-600 text-lg">
              {currentGuide.description}
            </p>
          </div>

          <button
            onClick={handleLike}
            disabled={!user}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium shadow transition ${
              isLiked
                ? 'bg-red-100 text-red-600 hover:bg-red-200'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            } ${!user ? 'opacity-50 cursor-not-allowed' : ''}`}
            title={!user ? 'Login to like' : ''}
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? 'currentColor' : 'none'}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <span>{currentGuide.likes?.length || 0}</span>
          </button>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 text-sm mb-6">
          <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full font-medium">
            {currentGuide.category}
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full font-medium">
            {currentGuide.difficulty}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full font-medium">
            {formatTime(currentGuide.estimatedTime)}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              />
            </svg>
            {currentGuide.views} views
          </span>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-3">
          {currentGuide.author.avatar ? (
            <img
              src={currentGuide.author.avatar}
              alt={currentGuide.author.username}
              className="w-12 h-12 rounded-full shadow"
            />
          ) : (
            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-lg font-semibold">
              {currentGuide.author.username.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-medium text-gray-800">
              by {currentGuide.author.username}
            </p>
            <p className="text-sm text-gray-500">
              Created {new Date(currentGuide.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      {/* Image Gallery */}
      {currentGuide.images && currentGuide.images.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <div className="mb-4">
            <img
              src={currentGuide.images[activeImage]}
              alt={`Step ${activeImage + 1}`}
              className="w-full h-72 md:h-96 object-cover rounded-xl shadow"
            />
          </div>
          {currentGuide.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {currentGuide.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                    activeImage === index
                      ? 'border-indigo-500'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tools and Materials */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Tools */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            🛠 Tools Required
          </h3>
          <ul className="space-y-2">
            {currentGuide.tools.map((tool, index) => (
              <li
                key={index}
                className="flex items-center gap-2 text-gray-700"
              >
                <svg
                  className="w-4 h-4 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {tool}
              </li>
            ))}
          </ul>
        </div>

        {/* Materials */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 text-gray-800">
            📦 Materials Needed
          </h3>
          <ul className="space-y-2">
            {currentGuide.materials.map((material, index) => (
              <li
                key={index}
                className="flex justify-between text-gray-700"
              >
                <span>{material.name}</span>
                <span className="text-gray-500">{material.quantity}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Steps */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <h3 className="text-lg font-semibold mb-4 text-gray-800">
          📖 Step-by-Step Instructions
        </h3>
        <div className="space-y-6">
          {currentGuide.steps.map((step, index) => (
            <div
              key={index}
              className="border-l-4 border-indigo-500 pl-4 py-3"
            >
              <h4 className="font-semibold text-lg mb-2 text-gray-900">
                Step {step.stepNumber}: {step.title}
              </h4>
              <p className="text-gray-700 mb-3">{step.description}</p>

              {step.warnings && step.warnings.length > 0 && (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded">
                  <strong className="text-yellow-800">⚠️ Important:</strong>
                  <ul className="list-disc list-inside text-yellow-700 mt-2">
                    {step.warnings.map((warning, i) => (
                      <li key={i}>{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuideDetail;
