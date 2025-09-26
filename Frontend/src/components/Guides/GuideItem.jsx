import React from 'react';
import { Link } from 'react-router-dom';

const GuideItem = ({ guide }) => {
  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <Link to={`/guide/${guide._id}`} className="block">
      <div className="card hover:shadow-xl transition-all duration-300 bg-white rounded-2xl overflow-hidden border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Guide Image */}
          {guide.images && guide.images.length > 0 ? (
            <img
              src={guide.images[0]}
              alt={guide.title}
              className="w-full md:w-40 h-40 object-cover rounded-lg"
            />
          ) : (
            <div className="w-full md:w-40 h-40 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-400 text-4xl">🔧</span>
            </div>
          )}

          {/* Guide Content */}
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors">
                {guide.title}
              </h3>
              <p className="text-gray-600 mb-3 line-clamp-2">
                {guide.description}
              </p>

              {/* Meta Information */}
              <div className="flex flex-wrap gap-3 text-sm">
                <span className="flex items-center gap-1 text-indigo-600 font-medium">
                  <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                  {guide.category}
                </span>
                <span className="flex items-center gap-1 text-yellow-600 font-medium">
                  <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                  {guide.difficulty}
                </span>
                <span className="flex items-center gap-1 text-green-600 font-medium">
                  <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                  {formatTime(guide.estimatedTime)}
                </span>
                <span className="flex items-center gap-1 text-gray-500">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path
                      fillRule="evenodd"
                      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {guide.views} views
                </span>
                <span className="flex items-center gap-1 text-rose-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {guide.likes.length} likes
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-2 mt-4">
              {guide.author.avatar ? (
                <img
                  src={guide.author.avatar}
                  alt={guide.author.username}
                  className="w-7 h-7 rounded-full border border-gray-200"
                />
              ) : (
                <div className="w-7 h-7 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center text-sm font-medium">
                  {guide.author.username.charAt(0).toUpperCase()}
                </div>
              )}
              <span className="text-sm text-gray-600">
                by <span className="font-medium text-gray-800">{guide.author.username}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GuideItem;
