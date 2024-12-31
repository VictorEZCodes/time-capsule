'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

export default function CountdownTimer({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [showCelebration, setShowCelebration] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  function calculateTimeLeft() {
    const difference = new Date(targetDate) - new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      // Check if we've reached 2025
      if (Object.values(newTimeLeft).every(value => value === 0)) {
        setShowCelebration(true);
        clearInterval(timer);
      }
    }, 1000);

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [targetDate]);

  return (
    <>
      <div className="flex justify-center gap-4 mt-8">
        {Object.entries(timeLeft).map(([unit, value]) => (
          <motion.div
            key={unit}
            className="text-center p-4 bg-gray-800 rounded-lg min-w-[100px]"
            whileHover={{ scale: 1.05 }}
            layout
          >
            <motion.div 
              key={value}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-bold"
            >
              {value}
            </motion.div>
            <div className="text-sm text-gray-400 capitalize">{unit}</div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showCelebration && (
          <>
            <Confetti
              width={windowSize.width}
              height={windowSize.height}
              recycle={true}
              numberOfPieces={200}
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-2xl text-center">
                <motion.h2 
                  className="text-4xl font-bold mb-4"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 1,
                    repeat: Infinity
                  }}
                >
                  🎉 Welcome to 2025! 🚀
                </motion.h2>
                <p className="text-xl">
                  Time to check those predictions!
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 px-6 py-3 bg-white text-purple-600 rounded-full font-bold"
                  onClick={() => setShowCelebration(false)}
                >
                  Let&apos;s See!
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}