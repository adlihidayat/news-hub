import { fetchNewsByTitle } from '@/lib/apiClient';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  if (req.method === 'GET') {
    const title = req.nextUrl.searchParams.get('title');
    const sortBy = req.nextUrl.searchParams.get('sortBy');

    console.log("title : ", title, " sort : ", sortBy)

    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing title parameter' }, { status: 400 })
    }

    if (!sortBy || typeof sortBy !== 'string') {
      return NextResponse.json({ error: 'Invalid or missing sortBy parameter' }, { status: 400 });
    }

    try {
      const response = await fetchNewsByTitle(title, sortBy)
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error('Error in fetch-news route:', error);
      return NextResponse.json({ error: 'Failed to fetch news' }, { status: 500 });
    }
  } else {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });

  }
}
