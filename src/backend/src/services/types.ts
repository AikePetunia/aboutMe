export type Provider = "steam" | "github" | "spotify" | "mal";

export type ApiOk<T> = {
  ok: true;
  provider: "steam" | "weather" | "spotify" | "mal" | "github";
  fetchedAt: number;
  cached: boolean;
  data: T;
};

export type ApiErr = {
  ok: false;
  provider: "steam" | "spotify" | "mal" | "github";
  fetchedAt: number;
  cached: boolean;
  error: {
    code: "RATE_LIMIT" | "AUTH" | "UPSTREAM" | "BAD_REQUEST" | "NOT_FOUND";
    status: number;
    message: string;
    retryAfterSec?: number;
    detais?: string;
    requestId: string;
  };
};

export type SteamGame = {
  appId: number;
  name: string;
  playtimeHours: number;
  icon: string;
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  public: boolean | null;
  url?: string;
  imageUrl?: string;
  totalTracks?: number;
  ownerName?: string;
  ownerId?: string;
};