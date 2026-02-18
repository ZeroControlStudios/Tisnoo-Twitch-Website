import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query { user(login: "t1snoo") { stream { id } } }`
      }),
      cache: 'no-store'
    });

    const json = await res.json();

    const streamData = json?.data?.user?.stream;
    const isLive = streamData !== null && streamData !== undefined;

    return NextResponse.json({ isLive });
  } catch (error) {
    console.error("Erreur API Twitch interne:", error);
    return NextResponse.json({ isLive: false });
  }
}
