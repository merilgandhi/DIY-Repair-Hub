import React, { useState } from 'react';
import { CATEGORIES, DIFFICULTY_LEVELS } from '../../utils/constants.js';

const GuideForm = ({ onSubmit, initialData = {}, loading = false }) => {
  const [formData, setFormData] = useState({
    title: initialData.title || '',
    description: initialData.description || '',
    category: initialData.category || '',
    difficulty: initialData.difficulty || '',
    estimatedTime: initialData.estimatedTime || 30,
    tools: initialData.tools || [],
    materials: initialData.materials || [],
    steps: initialData.steps || [{ stepNumber: 1, title: '', description: '', image: '', warnings: [] }],
    tags: initialData.tags || []
  });

  const [newTool, setNewTool] = useState('');
  const [newMaterial, setNewMaterial] = useState({ name: '', quantity: '' });
  const [newTag, setNewTag] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...formData.steps];
    updatedSteps[index] = { ...updatedSteps[index], [field]: value };
    setFormData({ ...formData, steps: updatedSteps });
  };

  const addStep = () => {
    setFormData({
      ...formData,
      steps: [...formData.steps, { 
        stepNumber: formData.steps.length + 1, 
        title: '', 
        description: '', 
        image: '', 
        warnings: [] 
      }]
    });
  };

  const removeStep = (index) => {
    if (formData.steps.length > 1) {
      const updatedSteps = formData.steps.filter((_, i) => i !== index);
      const renumberedSteps = updatedSteps.map((step, i) => ({
        ...step,
        stepNumber: i + 1
      }));
      setFormData({ ...formData, steps: renumberedSteps });
    }
  };

  const addTool = () => {
    if (newTool.trim()) {
      setFormData({
        ...formData,
        tools: [...formData.tools, newTool.trim()]
      });
      setNewTool('');
    }
  };

  const removeTool = (index) => {
    setFormData({
      ...formData,
      tools: formData.tools.filter((_, i) => i !== index)
    });
  };

  const addMaterial = () => {
    if (newMaterial.name.trim()) {
      setFormData({
        ...formData,
        materials: [...formData.materials, { ...newMaterial }]
      });
      setNewMaterial({ name: '', quantity: '' });
    }
  };

  const removeMaterial = (index) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter((_, i) => i !== index)
    });
  };

  const addTag = () => {
    if (newTag.trim()) {
      setFormData({
        ...formData,
        tags: [...formData.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const removeTag = (index) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-primary-700">Basic Information</h3>
        
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="input-field focus:ring-primary-500"
              placeholder="e.g., How to fix a leaky faucet"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="input-field focus:ring-primary-500"
            >
              <option value="">Select a category</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="input-field focus:ring-primary-500"
            placeholder="Brief description of the repair..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Difficulty Level *
            </label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              required
              className="input-field focus:ring-primary-500"
            >
              <option value="">Select difficulty</option>
              {DIFFICULTY_LEVELS.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Estimated Time (minutes) *
            </label>
            <input
              type="number"
              name="estimatedTime"
              value={formData.estimatedTime}
              onChange={handleChange}
              required
              min="1"
              className="input-field focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      {/* Tools Required */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-green-700">Tools Required</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTool}
            onChange={(e) => setNewTool(e.target.value)}
            className="input-field flex-1 focus:ring-green-500"
            placeholder="Add a tool..."
          />
          <button type="button" onClick={addTool} className="btn-secondary bg-green-100 text-green-700 hover:bg-green-200">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tools.map((tool, index) => (
            <span key={index} className="bg-green-50 border border-green-300 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              {tool}
              <button
                type="button"
                onClick={() => removeTool(index)}
                className="text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Materials Needed */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-amber-700">Materials Needed</h3>
        <div className="grid md:grid-cols-3 gap-2 mb-3">
          <input
            type="text"
            value={newMaterial.name}
            onChange={(e) => setNewMaterial({ ...newMaterial, name: e.target.value })}
            className="input-field md:col-span-2 focus:ring-amber-500"
            placeholder="Material name"
          />
          <input
            type="text"
            value={newMaterial.quantity}
            onChange={(e) => setNewMaterial({ ...newMaterial, quantity: e.target.value })}
            className="input-field focus:ring-amber-500"
            placeholder="Quantity"
          />
        </div>
        <button type="button" onClick={addMaterial} className="btn-secondary bg-amber-100 text-amber-700 hover:bg-amber-200 mb-3">
          Add Material
        </button>
        <div className="space-y-2">
          {formData.materials.map((material, index) => (
            <div key={index} className="flex justify-between items-center bg-amber-50 border border-amber-200 p-2 rounded">
              <span>{material.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">{material.quantity}</span>
                <button
                  type="button"
                  onClick={() => removeMaterial(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-blue-700">Step-by-Step Instructions</h3>
        {formData.steps.map((step, index) => (
          <div key={index} className="border-l-4 border-blue-500 bg-blue-50 rounded-r-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h4 className="font-medium text-blue-800">Step {step.stepNumber}</h4>
              {formData.steps.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeStep(index)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              )}
            </div>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Step Title
                </label>
                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => handleStepChange(index, 'title', e.target.value)}
                  className="input-field focus:ring-blue-500"
                  placeholder="Brief title for this step"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructions
                </label>
                <textarea
                  value={step.description}
                  onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                  rows={3}
                  className="input-field focus:ring-blue-500"
                  placeholder="Detailed instructions..."
                />
              </div>
            </div>
          </div>
        ))}
        
        <button type="button" onClick={addStep} className="btn-secondary bg-blue-100 text-blue-700 hover:bg-blue-200">
          Add Another Step
        </button>
      </div>

      {/* Tags */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-purple-700">Tags</h3>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            className="input-field flex-1 focus:ring-purple-500"
            placeholder="Add a tag..."
          />
          <button type="button" onClick={addTag} className="btn-secondary bg-purple-100 text-purple-700 hover:bg-purple-200">
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.tags.map((tag, index) => (
            <span key={index} className="bg-purple-50 border border-purple-300 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(index)}
                className="text-purple-600 hover:text-purple-800"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg shadow-md transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : (initialData._id ? 'Update Guide' : 'Create Guide')}
        </button>
      </div>
    </form>
  );
};

export default GuideForm;
