"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Music } from "lucide-react";
import { SiSpotify } from "react-icons/si";
import { cn } from "@/lib/utils";
import type { CurrentTrack } from "@/lib/lanyard";

const POLL_INTERVAL_MS = 25_000;
const LAST_TRACK_STORAGE_KEY = "lastPlayedTrack";

// Shown when Discord/Lanyard has never returned any track data at all (e.g.
// Discord isn't running yet on first-ever visit) — keeps the card visible
// instead of leaving it blank/hidden, without asserting a fake "playing" state.
const DEFAULT_TRACK: CurrentTrack = {
  isPlaying: false,
  discordOnline: false,
  title: "No recent activity",
  artist: "Play something on Spotify",
  album: "",
  albumArt: "",
  spotifyUrl: "",
  trackId: "",
};

// Lanyard has no "previously played" API — the last known track is
// persisted client-side so the card can keep showing it (marked as no
// longer live) across polls and page reloads instead of disappearing.
function readStoredTrack(): CurrentTrack | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(LAST_TRACK_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CurrentTrack;
    if (!parsed?.title && !parsed?.trackId) return null;
    return { ...parsed, isPlaying: false };
  } catch {
    return null;
  }
}

function storeTrack(data: CurrentTrack) {
  try {
    window.localStorage.setItem(LAST_TRACK_STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage unavailable (e.g. private browsing) — the card still works
    // for the current page session, it just won't survive a reload.
  }
}

export function MusicPlayer() {
  const [track, setTrack] = useState<CurrentTrack | null>(null);
  const [artFailed, setArtFailed] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let cancelled = false;
    let intervalId: ReturnType<typeof setInterval> | null = null;

    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/currently-playing", { cache: "no-store" });
        if (!res.ok || cancelled) return;
        const data: CurrentTrack = await res.json();
        if (cancelled) return;
        setTrack((prev) => {
          if (data.isPlaying) {
            if (!prev || prev.trackId !== data.trackId) setArtFailed(false);
            storeTrack(data);
            return data;
          }
          if (data.discordOnline) {
            // Discord is open but nothing is playing — show the last known
            // track (from this session or a previous one) marked as no
            // longer live.
            const base = prev ?? readStoredTrack();
            return base ? { ...base, isPlaying: false } : null;
          }
          // Discord is closed/unreachable — never surface stale Discord
          // data; the card falls back to its own independent default.
          return null;
        });
      } catch {
        // Network hiccup — keep the last known state and try again next tick.
      }
    };

    const start = () => {
      if (intervalId) return; // already polling — avoid stacking duplicate intervals
      fetchTrack();
      intervalId = setInterval(fetchTrack, POLL_INTERVAL_MS);
    };
    const stop = () => {
      if (intervalId) clearInterval(intervalId);
      intervalId = null;
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") start();
      else stop();
    };

    if (document.visibilityState === "visible") start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelled = true;
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  // Always render — fall back to the default placeholder when Discord/Lanyard
  // has never returned any track data (nothing to show as "previous" yet).
  const display =
    track && (track.title || track.trackId) ? track : DEFAULT_TRACK;

  const subtitle = display.album ? `${display.artist} · ${display.album}` : display.artist;
  const isLinkable = Boolean(display.spotifyUrl);
  const statusLabel = display.isPlaying
    ? "Currently Playing"
    : display === DEFAULT_TRACK
      ? "Spotify"
      : "Last Played";

  // The whole card opens the track on Spotify when a real URL is available;
  // otherwise it's a plain, non-interactive status card (never a fake link).
  const Wrapper = isLinkable ? motion.a : motion.div;
  const wrapperProps = isLinkable
    ? {
        href: display.spotifyUrl,
        target: "_blank",
        rel: "noopener noreferrer",
        "aria-label": `Open ${display.title} by ${display.artist} on Spotify`,
      }
    : {
        role: "status",
        "aria-label": `${statusLabel} on Spotify`,
      };

  return (
    <Wrapper
      {...wrapperProps}
      initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={cn(
        "absolute z-40 flex items-center gap-3 rounded-2xl p-3",
        "border border-white/15 bg-background/70 backdrop-blur-xl backdrop-saturate-150",
        "shadow-lg shadow-black/10 dark:shadow-black/40",
        "transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-xl",
        isLinkable && "outline-none focus-visible:ring-2 focus-visible:ring-[#1DB954]/50",
        "bottom-[max(0.75rem,env(safe-area-inset-bottom))] left-3 right-3",
        "sm:right-auto sm:left-6 sm:bottom-6 sm:w-[320px]"
      )}
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-border bg-muted">
        {display.albumArt && !artFailed ? (
          <Image
            src={display.albumArt}
            alt={`${display.album || display.title} album art`}
            fill
            sizes="56px"
            className="object-cover"
            onError={() => setArtFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <Music className="h-5 w-5" />
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1" aria-live="polite">
        <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span
              className={cn(
                "absolute inline-flex h-full w-full rounded-full bg-primary/60",
                display.isPlaying && !shouldReduceMotion && "animate-ping"
              )}
            />
            <span
              className={cn(
                "relative inline-flex h-1.5 w-1.5 rounded-full",
                display.isPlaying ? "bg-primary" : "bg-muted-foreground/50"
              )}
            />
          </span>
          {statusLabel}
        </div>
        <p className="truncate text-sm font-semibold text-foreground" title={display.title}>
          {display.title}
        </p>
        <p className="truncate text-xs text-muted-foreground" title={subtitle}>
          {display.artist}
        </p>
      </div>

      <span
        className={cn("shrink-0 p-2 text-[#1DB954]", !isLinkable && "text-[#1DB954]/70")}
        aria-hidden="true"
      >
        <SiSpotify className="h-4 w-4" />
      </span>
    </Wrapper>
  );
}
