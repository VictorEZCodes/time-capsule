'use client';
import { ShareIcon } from '@heroicons/react/24/outline';

export default function ShareButton({ prediction }) {
  const shareData = {
    title: '2025 Time Capsule',
    text: `Check out this prediction from ${prediction.year}: ${prediction.prediction}`,
    url: window.location.href
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="p-2 hover:bg-gray-700 rounded-full transition-colors"
    >
      <ShareIcon className="w-5 h-5" />
    </button>
  );
}