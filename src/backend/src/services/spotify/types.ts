export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string;
  public: boolean;
  images: Array<{ url: string; height: number; width: number }>;
  tracks: {
    total: number;
    href: string;
  };
  owner: {
    display_name: string;
    id: string;
  };
  external_urls: {
    spotify: string;
  };
};

export type SpotifyPlaylistsResponse = {
  items: SpotifyPlaylist[];
  total: number;
  limit: number;
  offset: number;
};

export type SpotifyTokenResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  scope: string;
};
