import React, { useEffect, useState } from 'react';
import { useGuide } from '../../context/GuideContext.jsx';
import GuideItem from './GuideItem.jsx';
import Search from '../Common/Search.jsx';
import Filter from '../Common/Filter.jsx';

const GuideList = () => {
  const { guides, loading, getGuides } = useGuide();
  const [filters, setFilters] = useState({});

  useEffect(() => {
    getGuides(filters);
  }, [filters]);

  const handleSearch = (query) => {
    setFilters((prev) => ({ ...prev, search: query }));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="md:w-1/4">
          <div className="sticky top-4 bg-white rounded-2xl shadow-sm p-4 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
            <Filter filters={filters} onFilterChange={handleFilterChange} />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Repair <span className="text-indigo-600">Guides</span>
            </h2>
            <Search onSearch={handleSearch} />
          </div>

          <div className="grid gap-6">
            {guides.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="text-gray-300 text-7xl mb-4">🔧</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No guides found</h3>
                <p className="text-gray-500">
                  Try adjusting your filters or search terms
                </p>
              </div>
            ) : (
              guides.map((guide) => <GuideItem key={guide._id} guide={guide} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideList;
