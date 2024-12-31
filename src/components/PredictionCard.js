'use client';
import { motion } from 'framer-motion';
import ShareButton from './ShareButton';

export default function PredictionCard({ prediction }) {
  const formattedDate = prediction.createdAt 
    ? new Date(prediction.createdAt).toLocaleDateString() 
    : null;

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 hover:shadow-xl transition-shadow"
      whileHover={{ y: -5 }}
    >
      {prediction?.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={prediction.image} 
            alt={prediction.prediction}
            className="w-full h-48 object-cover"
          />
        </div>
      )}
      
      <div className="flex justify-between items-start mb-4">
        <span className="text-blue-400">Predicted in {prediction.year}</span>
        <span className={`px-3 py-1 rounded-full text-sm ${
          prediction.fulfilled 
            ? 'bg-green-500/20 text-green-400' 
            : 'bg-red-500/20 text-red-400'
        }`}>
          {prediction.fulfilled ? 'Fulfilled' : 'Not Yet'}
        </span>
      </div>

      <h3 className="text-xl font-bold mb-2">{prediction.prediction}</h3>
      
      <div className="text-gray-400 mb-4">
        Source: {prediction.source}
      </div>

      <div className="flex justify-between items-center">
        <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
          {prediction.category}
        </span>
        <div className="flex items-center gap-2">
          {formattedDate && (
            <span className="text-xs text-gray-400">
              Added on {formattedDate}
            </span>
          )}
          <ShareButton prediction={prediction} />
        </div>
      </div>
    </motion.div>
  );
}