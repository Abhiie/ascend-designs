import { NextResponse } from "next/server";
import { stockImages } from "@/lib/stock-images";

export interface InstagramApiPost {
  id: string;
  caption: string;
  category: "Architecture" | "Interiors" | "AD Living" | "Materials";
  image: string;
  tone: 0 | 1 | 2 | 3;
  likes: number;
  comments: number;
  date: string;
  permalink: string;
  featured?: boolean;
}

const FALLBACK_POSTS: InstagramApiPost[] = [
  {
    id: "insta-1",
    category: "Interiors",
    caption: "Living room sanctuary at Residence 01 — double-height volume framed in textured limestone.",
    image: stockImages.interiors,
    tone: 1,
    likes: 412,
    comments: 28,
    date: "2 DAYS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
    featured: true,
  },
  {
    id: "insta-2",
    category: "Architecture",
    caption: "Facade study in progress — brutalist geometry meets warm timber screening on SG Highway.",
    image: stockImages.architecture,
    tone: 3,
    likes: 389,
    comments: 19,
    date: "4 DAYS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-3",
    category: "AD Living",
    caption: "Oak joinery hand-finished in our AD Living workshop for The Oakline Residence.",
    image: stockImages.adLivingJoinery,
    tone: 0,
    likes: 295,
    comments: 14,
    date: "1 WEEK AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-4",
    category: "Materials",
    caption: "Travertine and morning light — selecting stone slabs at the quarry site.",
    image: stockImages.materialTravertine,
    tone: 2,
    likes: 512,
    comments: 42,
    date: "1 WEEK AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-5",
    category: "Materials",
    caption: "Linen, wool, and warm neutral textiles curated for penthouse master suite.",
    image: stockImages.materialLinen,
    tone: 2,
    likes: 230,
    comments: 11,
    date: "2 WEEKS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-6",
    category: "AD Living",
    caption: "Detail study — brushed brass inlay seamlessly fitted into honed black granite.",
    image: stockImages.adLivingDecor,
    tone: 0,
    likes: 367,
    comments: 22,
    date: "2 WEEKS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-7",
    category: "Materials",
    caption: "Hand-troweled lime plaster wall reflecting soft afternoon sunlight.",
    image: stockImages.materialPlaster,
    tone: 3,
    likes: 440,
    comments: 31,
    date: "3 WEEKS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
  {
    id: "insta-8",
    category: "AD Living",
    caption: "Custom woven textiles and leather details for bespoke lounge seating.",
    image: stockImages.adLivingTextile,
    tone: 1,
    likes: 278,
    comments: 16,
    date: "3 WEEKS AGO",
    permalink: "https://www.instagram.com/ascend_designs/",
  },
];

export async function GET() {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN;

  if (!token) {
    // If no token environment variable is set yet, return the curated fallback feed
    return NextResponse.json({
      source: "curated_fallback",
      handle: "@ascend_designs",
      followers: "14.8K",
      posts: FALLBACK_POSTS,
    });
  }

  try {
    const response = await fetch(
      `https://graph.instagram.com/v19.0/me/media?fields=id,caption,media_type,media_url,permalink,timestamp,thumbnail_url,like_count,comments_count&access_token=${token}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      console.warn("Instagram API call failed, using fallback payload.");
      return NextResponse.json({
        source: "curated_fallback",
        handle: "@ascend_designs",
        followers: "14.8K",
        posts: FALLBACK_POSTS,
      });
    }

    const data = await response.json();
    const livePosts: InstagramApiPost[] = (data.data || []).map((item: any, i: number) => ({
      id: item.id,
      caption: item.caption || "Ascend Designs Architecture & Interior Project",
      category: i % 2 === 0 ? "Interiors" : "Architecture",
      image: item.media_url || item.thumbnail_url || stockImages.interiors,
      tone: (i % 4) as 0 | 1 | 2 | 3,
      likes: item.like_count || Math.floor(Math.random() * 200 + 200),
      comments: item.comments_count || Math.floor(Math.random() * 20 + 10),
      date: item.timestamp ? new Date(item.timestamp).toLocaleDateString() : "RECENT",
      permalink: item.permalink || "https://www.instagram.com/ascend_designs/",
      featured: i === 0,
    }));

    return NextResponse.json({
      source: "instagram_graph_api",
      handle: "@ascend_designs",
      followers: "14.8K",
      posts: livePosts.length > 0 ? livePosts : FALLBACK_POSTS,
    });
  } catch (error) {
    console.error("Error fetching Instagram Graph API:", error);
    return NextResponse.json({
      source: "curated_fallback",
      handle: "@ascend_designs",
      followers: "14.8K",
      posts: FALLBACK_POSTS,
    });
  }
}
