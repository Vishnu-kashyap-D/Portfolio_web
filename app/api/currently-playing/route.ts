import { NextResponse } from "next/server";
import { getCurrentlyPlaying } from "@/lib/lanyard";

// Always fetch fresh from Lanyard — this is a live "currently playing"
// status, so it must never be cached/stale.
export const dynamic = "force-dynamic";

export async function GET() {
  const track = await getCurrentlyPlaying();
  return NextResponse.json(track);
}
