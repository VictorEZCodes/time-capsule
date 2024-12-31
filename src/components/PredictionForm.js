'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { categories } from '../data/predictions';

export default function PredictionForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    prediction: '',
    year: new Date().getFullYear(),
    source: '',
    category: '',
    fulfilled: false
  });

  const currentYear = new Date().getFullYear();
  const maxYear = 2050; 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-gray-800 rounded-xl p-6 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-4">Add Your Prediction</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-2">Your Prediction</label>
            <textarea
              required
              placeholder="What do you think will happen?"
              className="w-full p-2 rounded bg-gray-700 text-white"
              rows="3"
              value={formData.prediction}
              onChange={(e) => setFormData({...formData, prediction: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-2">Year</label>
              <input
                type="number"
                required
                min={currentYear}
                max={maxYear}
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={formData.year}
                onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              />
              <p className="text-xs text-gray-400 mt-1">
                {currentYear} - {maxYear}
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2">Category</label>
              <select
                required
                className="w-full p-2 rounded bg-gray-700 text-white"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              >
                <option value="">Select...</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2">Source</label>
            <input
              type="text"
              required
              placeholder="Your name or reference"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={formData.source}
              onChange={(e) => setFormData({...formData, source: e.target.value})}
            />
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 transition-colors"
            >
              Submit
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}