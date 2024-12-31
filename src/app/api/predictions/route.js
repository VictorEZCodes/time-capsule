import { NextResponse } from 'next/server';

const GIST_ID = process.env.NEXT_PUBLIC_GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    const data = await response.json();
    const predictions = JSON.parse(data.files['predictions.json'].content);
    return NextResponse.json(predictions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const prediction = await request.json();
    
    // Fetch current predictions
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    const data = await response.json();
    const currentPredictions = JSON.parse(data.files['predictions.json'].content);
    
    // Add new prediction
    const updatedPredictions = [...currentPredictions, prediction];
    
    // Update Gist
    const updateResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        files: {
          'predictions.json': {
            content: JSON.stringify(updatedPredictions)
          }
        }
      })
    });

    if (!updateResponse.ok) {
      throw new Error('Failed to update predictions');
    }

    return NextResponse.json(prediction);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save prediction' }, { status: 500 });
  }
}