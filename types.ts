
export interface Trailer {
  id: number;
  name: string;
  url: string;
  thumbnail: string;
}

export interface GameData {
  name: string;
  headerImage: string;
  trailers: Trailer[];
  description: string;
}

export interface SteamApiMovie {
  id: number;
  name: string;
  thumbnail: string;
  webm: {
    '480': string;
    max: string;
  };
  mp4: {
    '480': string;
    max: string;
  };
  highlight: boolean;
}

export interface SteamApiData {
  name: string;
  steam_appid: number;
  header_image: string;
  movies?: SteamApiMovie[];
  detailed_description: string;
}

export interface SteamApiResponse {
  [appId: string]: {
    success: boolean;
    data?: SteamApiData;
  };
}
