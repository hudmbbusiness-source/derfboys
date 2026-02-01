import { NextResponse } from 'next/server';

// Member social media data
const MEMBERS = {
  huddy: {
    name: "Huddy",
    tiktok: "huddy_lg",
    instagram: "huddy_lg",
    youtube: "Huddy_lg",
  },
  jvhn: {
    name: "Jvhn Seo",
    tiktok: "jvhnseo",
    instagram: "jvhnseo",
    youtube: "JvhnSeo",
  },
  brandon: {
    name: "Brandon DeLuna",
    tiktok: "djfashionkill",
    instagram: "brandondeluna_",
    youtube: null,
  },
  jggls: {
    name: "JGGLS",
    tiktok: "jggls",
    instagram: "_jggls_",
    youtube: "jgglsofficial",
  },
};

interface FollowerCounts {
  [key: string]: {
    tiktok: number;
    instagram: number;
    youtube: number;
    total: number;
  };
}

interface PlatformTotals {
  tiktok: number;
  instagram: number;
  youtube: number;
  total: number;
}

async function fetchTikTokFollowers(username: string): Promise<number> {
  try {
    // Using a public endpoint approach
    const response = await fetch(
      `https://www.tiktok.com/@${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );
    
    if (!response.ok) return 0;
    
    const html = await response.text();
    
    // Try to extract follower count from meta tags or script data
    const followerMatch = html.match(/"followerCount":(\d+)/);
    if (followerMatch) {
      return parseInt(followerMatch[1], 10);
    }
    
    return 0;
  } catch (error) {
    console.error(`TikTok fetch error for ${username}:`, error);
    return 0;
  }
}

async function fetchInstagramFollowers(username: string): Promise<number> {
  try {
    const response = await fetch(
      `https://www.instagram.com/${username}/`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 },
      }
    );
    
    if (!response.ok) return 0;
    
    const html = await response.text();
    
    // Try to extract from meta content
    const followerMatch = html.match(/"edge_followed_by":\{"count":(\d+)\}/);
    if (followerMatch) {
      return parseInt(followerMatch[1], 10);
    }
    
    return 0;
  } catch (error) {
    console.error(`Instagram fetch error for ${username}:`, error);
    return 0;
  }
}

async function fetchYouTubeSubscribers(channelHandle: string): Promise<number> {
  try {
    // For production, use YouTube Data API with API key
    // For now, attempt to scrape
    const response = await fetch(
      `https://www.youtube.com/@${channelHandle}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 },
      }
    );
    
    if (!response.ok) return 0;
    
    const html = await response.text();
    
    // Try to extract subscriber count
    const subMatch = html.match(/"subscriberCountText":"([\d.]+[KMB]?) subscribers"/);
    if (subMatch) {
      return parseSubscriberCount(subMatch[1]);
    }
    
    return 0;
  } catch (error) {
    console.error(`YouTube fetch error for ${channelHandle}:`, error);
    return 0;
  }
}

function parseSubscriberCount(countStr: string): number {
  const num = parseFloat(countStr);
  if (countStr.includes('K')) return Math.round(num * 1000);
  if (countStr.includes('M')) return Math.round(num * 1000000);
  if (countStr.includes('B')) return Math.round(num * 1000000000);
  return Math.round(num);
}

export async function GET() {
  try {
    const memberCounts: FollowerCounts = {};
    const platformTotals: PlatformTotals = {
      tiktok: 0,
      instagram: 0,
      youtube: 0,
      total: 0,
    };

    // Fetch all counts in parallel
    const fetchPromises = Object.entries(MEMBERS).map(async ([key, member]) => {
      const [tiktok, instagram, youtube] = await Promise.all([
        fetchTikTokFollowers(member.tiktok),
        fetchInstagramFollowers(member.instagram),
        member.youtube ? fetchYouTubeSubscribers(member.youtube) : Promise.resolve(0),
      ]);

      const total = tiktok + instagram + youtube;
      
      memberCounts[key] = { tiktok, instagram, youtube, total };
      
      platformTotals.tiktok += tiktok;
      platformTotals.instagram += instagram;
      platformTotals.youtube += youtube;
      platformTotals.total += total;
    });

    await Promise.all(fetchPromises);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      members: memberCounts,
      totals: platformTotals,
    });
  } catch (error) {
    console.error('Follower fetch error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch follower counts',
        // Return fallback data based on last known counts
        totals: {
          tiktok: 0,
          instagram: 0,
          youtube: 0,
          total: 0,
        }
      },
      { status: 500 }
    );
  }
}
