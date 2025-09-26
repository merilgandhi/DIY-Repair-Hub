import React from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS } from '../../utils/constants.js';

const Filter = ({ filters, onFilterChange }) => {
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors"
        >
          Clear all
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category || ''}
          onChange={(e) => handleChange('category', e.target.value)}
          className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        >
          <option value="">All Categories</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Difficulty Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Difficulty
        </label>
        <select
          value={filters.difficulty || ''}
          onChange={(e) => handleChange('difficulty', e.target.value)}
          className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        >
          <option value="">All Levels</option>
          {DIFFICULTY_LEVELS.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>

      {/* Sort Options */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={filters.sortBy || 'createdAt'}
          onChange={(e) => handleChange('sortBy', e.target.value)}
          className="w-full rounded-lg border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 text-sm"
        >
          <option value="createdAt">Newest First</option>
          <option value="views">Most Viewed</option>
          <option value="likes">Most Liked</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
