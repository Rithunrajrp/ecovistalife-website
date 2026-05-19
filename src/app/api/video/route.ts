import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return new NextResponse('Missing video ID', { status: 400 });
  }

  try {
    // Fetch the raw file stream from Google Drive
    const driveUrl = `https://drive.google.com/uc?export=download&id=${id}`;
    
    // We add a generic user agent to prevent Google from blocking programmatic access
    const response = await fetch(driveUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      // Do not follow redirects manually to ensure we handle the stream
      redirect: 'follow',
    });

    if (!response.ok) {
      return new NextResponse('Failed to fetch from Google Drive', { status: response.status });
    }

    // Pass the stream directly back to the client, but OVERRIDE the Content-Disposition
    // so it streams (inline) instead of forcing a download (attachment).
    const headers = new Headers(response.headers);
    headers.set('Content-Disposition', 'inline');
    headers.set('Content-Type', 'video/mp4');
    
    // Some CORS headers just in case
    headers.set('Access-Control-Allow-Origin', '*');

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });
  } catch (error) {
    console.error('Video Proxy Error:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
