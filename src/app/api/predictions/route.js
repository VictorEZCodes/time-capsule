import { NextResponse } from 'next/server';

const GIST_ID = process.env.NEXT_PUBLIC_GIST_ID;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      },
      next: { revalidate: 0 } 
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with status: ${response.status}`);
    }

    const data = await response.json();
    const predictions = JSON.parse(data.files['predictions.json'].content);
    return NextResponse.json(predictions);
  } catch (error) {
    console.error('Failed to fetch predictions:', error);
    return NextResponse.json({ error: 'Failed to fetch predictions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const prediction = await request.json();
    
    // Fetch current predictions
    const response = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch current predictions');
    }

    const data = await response.json();
    const currentPredictions = JSON.parse(data.files['predictions.json'].content);
    const updatedPredictions = [...currentPredictions, prediction];
    
    const updateResponse = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
        'Accept': 'application/vnd.github.v3+json',
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
    console.error('Failed to save prediction:', error);
    return NextResponse.json({ error: 'Failed to save prediction' }, { status: 500 });
  }
}