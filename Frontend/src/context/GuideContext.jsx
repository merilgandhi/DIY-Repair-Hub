import React, { createContext, useState, useContext } from 'react';
import { guideAPI } from '../services/api.js';

const GuideContext = createContext();

export const useGuide = () => {
  const context = useContext(GuideContext);
  if (!context) {
    throw new Error('useGuide must be used within a GuideProvider');
  }
  return context;
};

export const GuideProvider = ({ children }) => {
  const [guides, setGuides] = useState([]);
  const [currentGuide, setCurrentGuide] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});

  const getGuides = async (filters = {}) => {
    setLoading(true);
    try {
      const response = await guideAPI.getGuides(filters);
      setGuides(response.guides);
      setPagination({
        totalPages: response.totalPages,
        currentPage: response.currentPage,
        total: response.total
      });
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  const getGuide = async (id) => {
    setLoading(true);
    try {
      const guide = await guideAPI.getGuide(id);
      setCurrentGuide(guide);
      return guide;
    } catch (error) {
      console.error('Error fetching guide:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const createGuide = async (guideData, token) => {
    try {
      const newGuide = await guideAPI.createGuide(guideData, token);
      setGuides(prev => [newGuide, ...prev]);
      return { success: true, guide: newGuide };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to create guide' 
      };
    }
  };

  const likeGuide = async (guideId, token) => {
    try {
      const response = await guideAPI.likeGuide(guideId, token);
      
      // Update guides list
      setGuides(prev => prev.map(guide => 
        guide._id === guideId 
          ? { ...guide, likes: response.hasLiked ? [...guide.likes, 'current-user'] : guide.likes.filter(id => id !== 'current-user') }
          : guide
      ));
      
      // Update current guide if it's the one being liked
      if (currentGuide && currentGuide._id === guideId) {
        setCurrentGuide(prev => ({
          ...prev,
          likes: response.hasLiked ? [...prev.likes, 'current-user'] : prev.likes.filter(id => id !== 'current-user')
        }));
      }
      
      return response;
    } catch (error) {
      console.error('Error liking guide:', error);
      throw error;
    }
  };

  const value = {
    guides,
    currentGuide,
    loading,
    pagination,
    getGuides,
    getGuide,
    createGuide,
    likeGuide,
    setCurrentGuide
  };

  return (
    <GuideContext.Provider value={value}>
      {children}
    </GuideContext.Provider>
  );
};