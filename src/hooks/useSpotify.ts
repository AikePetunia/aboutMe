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

export async function fetchSpotifyPlaylists() {
  const { getApiBase, getAuthHeaders } = await import("../config/api");
  const base = getApiBase();

  const response = await fetch(`${base}/api/spotify/playlists`, {
    headers: getAuthHeaders(),
  });

  const data = await response.json();
  return data as { playlists: SpotifyPlaylist[]; total: number };
}
