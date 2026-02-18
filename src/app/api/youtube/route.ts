import { NextResponse } from 'next/server';

export async function GET() {
  const CHANNEL_ID = "UCCg7Jjht6rYK3_uUhE_Emgg";
  const RSS_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

  try {
    const response = await fetch(RSS_URL, { next: { revalidate: 3600 } }); // Cache d'une heure
    const xml = await response.text();

    const videoIdMatch = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const lastVideoId = videoIdMatch ? videoIdMatch[1] : null;

    return NextResponse.json({ lastVideoId });
  } catch (error) {
    return NextResponse.json({ lastVideoId: null }, { status: 500 });
  }
}
