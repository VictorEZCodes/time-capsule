'use client';
import { motion } from 'framer-motion';

export default function TimelineView({ predictions }) {
  // Sort predictions by year
  const sortedPredictions = [...predictions].sort((a, b) => a.year - b.year);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-4xl mx-auto"
    >
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-500/20" />

        {sortedPredictions.map((prediction, index) => (
          <motion.div
            key={prediction.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`relative mb-8 ${
              index % 2 === 0 ? 'pr-1/2' : 'pl-1/2'
            }`}
          >
            <div className={`flex ${index % 2 === 0 ? 'justify-end' : 'justify-start'}`}>
              <div className="relative bg-gray-800 rounded-xl p-6 w-full max-w-lg">
                <div className="absolute top-6 bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                  {prediction.year}
                </div>

                <div className={`mt-8 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <h3 className="text-xl font-bold mb-2">{prediction.prediction}</h3>
                  <p className="text-gray-400 mb-2">Source: {prediction.source}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-sm ${
                    prediction.fulfilled 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {prediction.fulfilled ? 'Fulfilled' : 'Not Yet'}
                  </span>
                  <span className="ml-2 bg-gray-700 px-3 py-1 rounded-full text-sm">
                    {prediction.category}
                  </span>
                </div>

                {prediction.createdAt && (
                  <p className="text-xs text-gray-500 mt-4">
                    Added on {new Date(prediction.createdAt).toLocaleDateString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}