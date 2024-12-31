export const loadPredictions = async () => {
  try {
    const response = await fetch('/api/predictions');
    const predictions = await response.json();
    return predictions;
  } catch (err) {
    console.error('Error loading predictions:', err);
    return [];
  }
};

export const savePrediction = async (prediction) => {
  try {
    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(prediction)
    });

    if (!response.ok) {
      throw new Error('Failed to save prediction');
    }

    return true;
  } catch (err) {
    console.error('Error saving prediction:', err);
    return false;
  }
};