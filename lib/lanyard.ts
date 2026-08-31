// Server-only. Reads DISCORD_USER_ID / LANYARD_API_KEY / LANYARD_API_URL from
// process.env and talks to the Lanyard API. Never import this from a "use
// client" component — it's only ever called from the /api/currently-playing
// route handler, which runs on the server, so the API key never reaches the
// browser bundle.

export interface CurrentTrack {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumArt: string;
  spotifyUrl: string;
  trackId: string;
}

export const EMPTY_TRACK: CurrentTrack = {
  isPlaying: false,
  title: "",
  artist: "",
  album: "",
  albumArt: "",
  spotifyUrl: "",
  trackId: "",
};

interface LanyardSpotifyActivity {
  song?: string;
  artist?: string;
  album?: string;
  album_art_url?: string;
  track_id?: string;
}

interface LanyardUserResponse {
  success?: boolean;
  data?: {
    listening_to_spotify?: boolean;
    spotify?: LanyardSpotifyActivity | null;
  };
}

function devWarn(message: string) {
  if (process.env.NODE_ENV !== "production") {
    // Safe: never includes the API key or raw response body.
    console.warn(`[lanyard] ${message}`);
  }
}

export async function getCurrentlyPlaying(): Promise<CurrentTrack> {
  // VITE_LANYARD_ID is the name already configured in Vercel; DISCORD_USER_ID
  // is kept as a fallback for local dev / the documented .env.example name.
  const userId = process.env.VITE_LANYARD_ID || process.env.DISCORD_USER_ID;
  if (!userId) {
    devWarn("VITE_LANYARD_ID (or DISCORD_USER_ID) is not configured — set it in .env.local (see .env.example).");
    return EMPTY_TRACK;
  }

  const baseUrl = (process.env.LANYARD_API_URL || "https://api.lanyard.rest").replace(/\/$/, "");
  const apiKey = process.env.LANYARD_API_KEY;

  let response: Response;
  try {
    response = await fetch(`${baseUrl}/v1/users/${userId}`, {
      headers: apiKey ? { Authorization: apiKey } : undefined,
      cache: "no-store",
    });
  } catch {
    devWarn("request to the Lanyard API failed (network error).");
    return EMPTY_TRACK;
  }

  if (response.status === 401 || response.status === 403) {
    devWarn("Lanyard API rejected the request as unauthorized — check LANYARD_API_KEY.");
    return EMPTY_TRACK;
  }

  if (!response.ok) {
    devWarn(`Lanyard API returned status ${response.status}.`);
    return EMPTY_TRACK;
  }

  let payload: LanyardUserResponse;
  try {
    payload = await response.json();
  } catch {
    devWarn("Lanyard API returned a response that could not be parsed as JSON.");
    return EMPTY_TRACK;
  }

  const spotify = payload?.data?.spotify;
  const isPlaying = Boolean(payload?.data?.listening_to_spotify && spotify);

  if (!isPlaying || !spotify) {
    return EMPTY_TRACK;
  }

  const trackId = spotify.track_id ?? "";

  return {
    isPlaying: true,
    title: spotify.song ?? "",
    artist: spotify.artist ?? "",
    album: spotify.album ?? "",
    albumArt: spotify.album_art_url ?? "",
    spotifyUrl: trackId ? `https://open.spotify.com/track/${trackId}` : "",
    trackId,
  };
}
