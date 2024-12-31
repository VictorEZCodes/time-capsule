'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CountdownTimer from '../components/CountdownTimer';
import PredictionGrid from '../components/PredictionGrid';
import PredictionForm from '../components/PredictionForm';
import TimelineView from '../components/TimelineView';
import { historicalPredictions } from '../data/predictions';
import { loadPredictions, savePrediction } from '../utils/storage';

export default function Home() {
  const [view, setView] = useState('grid');
  const [showForm, setShowForm] = useState(false);
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPredictions = async () => {
    try {
      setError(null);
      const savedPredictions = await loadPredictions();
      setPredictions([...historicalPredictions, ...savedPredictions]);
    } catch (err) {
      setError('Failed to load predictions. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPredictions();
    const refreshInterval = setInterval(fetchPredictions, 30000);
    return () => clearInterval(refreshInterval);
  }, []);

  const handleAddPrediction = async (newPrediction) => {
    try {
      const predictionWithMetadata = {
        ...newPrediction,
        id: `pred_${Date.now()}`,
        createdAt: new Date().toISOString(),
      };

      const success = await savePrediction(predictionWithMetadata);
      
      if (success) {
        setShowForm(false);
        setPredictions(prevPredictions => [...prevPredictions, predictionWithMetadata].sort((a, b) => 
          new Date(b.createdAt) - new Date(a.createdAt)
        ));
      } else {
        throw new Error('Failed to save prediction');
      }
    } catch (err) {
      alert('Failed to save prediction. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-gray-400">Loading predictions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-red-400 p-4 rounded-lg">
          <p className="mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold mb-4">Time Capsule 🚀</h1>
          <p className="text-xl text-gray-300">
            Exploring yesterday&apos;s tomorrow, today.
          </p>
          <CountdownTimer targetDate="2025-01-01" />
        </motion.div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={() => setView('grid')}
            className={`px-4 py-2 rounded transition-colors ${
              view === 'grid' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Grid View
          </button>
          <button
            onClick={() => setView('timeline')}
            className={`px-4 py-2 rounded transition-colors ${
              view === 'timeline' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setShowForm(true)}
            className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition-colors"
          >
            Add Prediction
          </button>
        </div>

        <AnimatePresence mode="wait">
          {view === 'grid' ? (
            <PredictionGrid key="grid" predictions={predictions} />
          ) : (
            <TimelineView key="timeline" predictions={predictions} />
          )}
        </AnimatePresence>
        
        <AnimatePresence>
          {showForm && (
            <PredictionForm 
              onClose={() => setShowForm(false)}
              onSubmit={handleAddPrediction}
            />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}