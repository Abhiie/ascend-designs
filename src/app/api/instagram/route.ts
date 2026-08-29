import { NextResponse } from "next/server";

// ─── Types ────────────────────────────────────────────────────────────────
export interface InstagramPost {
  id: string;
  caption?: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string; // only for VIDEO type
  permalink: string;
  timestamp: string;
}

// ─── Cache: revalidate every 30 minutes ───────────────────────────────────
export const revalidate = 1800;

// ─── Fetch helper ─────────────────────────────────────────────────────────
async function fetchFromInstagramGraph(): Promise<InstagramPost[]> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!token) throw new Error("INSTAGRAM_ACCESS_TOKEN is not set");

  const fields = "id,caption,media_type,media_url,thumbnail_url,permalink,timestamp";
  const limit = 12; // number of posts to fetch

  const url = new URL("https://graph.instagram.com/me/media");
  url.searchParams.set("fields", fields);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("access_token", token);

  const res = await fetch(url.toString(), {
    next: { revalidate: 1800 },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram API error ${res.status}: ${err}`);
  }

  const data = await res.json();
  return (data.data ?? []) as InstagramPost[];
}

// ─── Behold.so fallback helper ─────────────────────────────────────────────
async function fetchFromBehold(): Promise<InstagramPost[]> {
  const feedId = process.env.BEHOLD_FEED_ID;
  if (!feedId) throw new Error("BEHOLD_FEED_ID is not set");

  const res = await fetch(`https://feeds.behold.so/${feedId}`, {
    next: { revalidate: 1800 },
  });

  if (!res.ok) throw new Error(`Behold API error ${res.status}`);

  // Behold response shape slightly differs; normalise it
  const data: {
    id: string;
    caption?: string;
    mediaType: string;
    mediaUrl: string;
    thumbnailUrl?: string;
    permalink: string;
    timestamp: string;
  }[] = await res.json();

  return data.map((p) => ({
    id: p.id,
    caption: p.caption,
    media_type: p.mediaType as InstagramPost["media_type"],
    media_url: p.mediaUrl,
    thumbnail_url: p.thumbnailUrl,
    permalink: p.permalink,
    timestamp: p.timestamp,
  }));
}

// ─── Route handler ─────────────────────────────────────────────────────────
export async function GET() {
  try {
    // Try official Graph API first, fall back to Behold
    let posts: InstagramPost[];
    if (process.env.INSTAGRAM_ACCESS_TOKEN) {
      posts = await fetchFromInstagramGraph();
    } else if (process.env.BEHOLD_FEED_ID) {
      posts = await fetchFromBehold();
    } else {
      // Neither configured — return empty array so the static fallback renders
      return NextResponse.json({ posts: [] });
    }

    // Filter out videos without thumbnail (can't display them safely)
    const displayable = posts.filter(
      (p) => p.media_type !== "VIDEO" || p.thumbnail_url
    );

    return NextResponse.json({ posts: displayable });
  } catch (err) {
    console.error("[instagram/route] Failed to fetch posts:", err);
    // Return empty so the component falls back to static placeholders
    return NextResponse.json({ posts: [], error: String(err) }, { status: 200 });
  }
}
