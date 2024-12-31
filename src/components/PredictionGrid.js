'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import PredictionCard from './PredictionCard';
import { categories } from '../data/predictions';

export default function PredictionGrid({ predictions }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredPredictions = predictions
    .filter(pred => {
      const matchesCategory = selectedCategory === 'all' || pred.category === selectedCategory;
      const matchesSearch = pred.prediction.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'newest') {
        return new Date(b.createdAt || '1900') - new Date(a.createdAt || '1900');
      }
      return new Date(a.year) - new Date(b.year);
    });

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-4 justify-center">
        <input
          type="text"
          placeholder="Search predictions..."
          className="px-4 py-2 rounded bg-gray-700 text-white"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          <option value="newest">Newest First</option>
          <option value="year">By Prediction Year</option>
        </select>
      </div>

      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        layout
      >
        {filteredPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <PredictionCard prediction={prediction} />
          </motion.div>
        ))}
      </motion.div>

      {filteredPredictions.length === 0 && (
        <div className="text-center text-gray-400 py-12">
          <p>No predictions found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}