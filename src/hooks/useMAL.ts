export type MALAnimeItem = {
  node: {
    id: number;
    title: string;
    main_picture?: {
      medium: string;
      large: string;
    };
    alternative_titles?: {
      en?: string;
      ja?: string;
    };
    mean?: number; // puntuación promedio de MAL
    num_episodes?: number;
    status?: string;
    genres?: Array<{ id: number; name: string }>;
    media_type?: string; // tv, movie, ova, etc.
  };
  list_status?: {
    status: string; // watching, completed, etc.
    score: number; // TU puntuación (0-10)
    num_episodes_watched?: number;
    is_rewatching?: boolean;
    start_date?: string;
    finish_date?: string;
    tags?: string[];
    comments?: string;
  };
};

export type MALAnimeResponse = {
  data?: MALAnimeItem[];
  paging?: {
    next?: string;
    previous?: string;
  };
};

export async function fetchAnimes(status: string = "completed") {
  const response = await fetch(
    `http://localhost:4000/api/mal/user/anime?status=${status}`
  );
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error || "Error al obtener animes");
  return data as MALAnimeResponse;
}
