import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // 1. On attaque l'API GraphQL interne de Twitch, celle utilisée par leur propre site.
    const res = await fetch('https://gql.twitch.tv/gql', {
      method: 'POST',
      headers: {
        // 2. LA CLÉ MAGIQUE : C'est le Client-ID public et universel du lecteur web Twitch.
        // Il ne périme jamais et n'a pas besoin de token d'autorisation (Bearer).
        'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko',
        'Content-Type': 'application/json',
      },
      // 3. On envoie une requête précise : "Donne-moi l'ID du stream de guerriaxeu s'il existe".
      body: JSON.stringify({
        query: `query { user(login: "t1snoo") { stream { id } } }`
      }),
      // 4. On force Next.js à ne jamais mettre cette route en cache.
      cache: 'no-store'
    });

    const json = await res.json();

    // 5. La logique imparable :
    // Si l'utilisateur est en live, Twitch renvoie un objet avec un ID.
    // S'il est offline, Twitch renvoie explicitement la valeur "null" pour le stream.
    const streamData = json?.data?.user?.stream;
    const isLive = streamData !== null && streamData !== undefined;

    return NextResponse.json({ isLive });
  } catch (error) {
    console.error("Erreur API Twitch interne:", error);
    return NextResponse.json({ isLive: false });
  }
}