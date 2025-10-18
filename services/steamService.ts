import { GameData, SteamApiResponse, Trailer } from '../types';

function extractAppId(url: string): string | null {
  const match = url.match(/store\.steampowered\.com\/app\/(\d+)/);
  return match ? match[1] : null;
}

export async function fetchGameDetails(url: string): Promise<GameData> {
  const appId = extractAppId(url);
  if (!appId) {
    throw new Error('Invalid Steam URL. Please use a format like "https://store.steampowered.com/app/..."');
  }
  
  // Using a more reliable CORS proxy for client-side requests.
  const proxyUrl = 'https://corsproxy.io/?';
  const apiUrl = `${proxyUrl}https://store.steampowered.com/api/appdetails?appids=${appId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to connect to the Steam API (Status: ${response.status}). The proxy may be down or the game unavailable.`);
    }

    const json: SteamApiResponse = await response.json();
    const appData = json[appId];

    if (!appData || !appData.success || !appData.data) {
      throw new Error(`Could not find game data for App ID: ${appId}. The game might not exist or be available.`);
    }

    const { data } = appData;
    const movies = data.movies;

    if (!movies || movies.length === 0) {
      throw new Error('This game does not have any trailers available on its Steam page.');
    }

    const trailers: Trailer[] = movies
      .map(movie => {
          const url = movie.mp4.max || movie.mp4['480'];
          if (url) {
              return {
                  id: movie.id,
                  name: movie.name,
                  url: url,
                  thumbnail: movie.thumbnail,
              };
          }
          return null;
      })
      .filter((trailer): trailer is Trailer => trailer !== null);

    if (trailers.length === 0) {
      throw new Error('Could not find valid MP4 trailer URLs for this game.');
    }

    return {
      name: data.name,
      headerImage: data.header_image,
      trailers: trailers,
      description: data.detailed_description,
    };
  } catch (error) {
    console.error("Error fetching from Steam API:", error);
    throw new Error("Failed to fetch game data from Steam. The service may be temporarily unavailable or the game URL might be incorrect. Please check the URL and try again in a few moments.");
  }
}
