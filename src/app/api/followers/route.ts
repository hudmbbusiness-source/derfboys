import { NextResponse } from 'next/server';

// Member data with Instagram usernames and YouTube channel IDs
const MEMBERS = {
  jggls: {
    instagram: "_jggls_",
    tiktok: "jggls",
    youtubeChannelId: "UC35TiyFAjzQCyOrFt5ccbhw", // JGGLS official
  },
  huddy: {
    instagram: "huddy_lg",
    tiktok: "huddy_lg",
    youtubeChannelId: "UCvMzLkT3jKpNL3RMEm2hTGg", // Huddy
  },
  jvhn: {
    instagram: "jvhnseo",
    tiktok: "jvhnseo",
    youtubeChannelId: "UCEcYThJPKqxw8DH7TE-IPFQ", // JvhnSeo
  },
  brandon: {
    instagram: "brandondeluna_",
    tiktok: "djfashionkill",
    youtubeChannelId: null,
  },
};

async function fetchInstagramData(username: string): Promise<{ followers: number; profilePic: string | null }> {
  try {
    const res = await fetch(
      `https://www.instagram.com/api/v1/users/web_profile_info/?username=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'X-IG-App-ID': '936619743392459',
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) return { followers: 0, profilePic: null };
    const data = await res.json();
    const user = data?.data?.user;
    return {
      followers: user?.edge_followed_by?.count || 0,
      profilePic: user?.profile_pic_url_hd || user?.profile_pic_url || null,
    };
  } catch (e) {
    console.error(`Instagram fetch error for ${username}:`, e);
    return { followers: 0, profilePic: null };
  }
}

async function fetchTikTokFollowers(username: string): Promise<number> {
  try {
    // Try TikTok's unofficial API
    const res = await fetch(
      `https://www.tiktok.com/api/user/detail/?uniqueId=${username}`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        next: { revalidate: 300 },
      }
    );
    if (!res.ok) {
      // Fallback to mixerno
      const mixerRes = await fetch(`https://mixerno.space/api/tiktok-user-counter/user/${username}`, { next: { revalidate: 300 } });
      if (mixerRes.ok) {
        const mixerData = await mixerRes.json();
        const f = mixerData?.counts?.find((c: any) => c.value === "followers");
        if (f?.count) return parseInt(f.count, 10);
      }
      return 0;
    }
    const data = await res.json();
    return data?.userInfo?.stats?.followerCount || 0;
  } catch (e) {
    console.error(`TikTok fetch error for ${username}:`, e);
    return 0;
  }
}

async function fetchYouTubeSubscribers(channelId: string | null): Promise<number> {
  if (!channelId) return 0;
  try {
    const res = await fetch(
      `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) return 0;
    const data = await res.json();
    return data?.counters?.api?.subscriberCount || data?.counters?.estimation?.subscriberCount || 0;
  } catch (e) {
    console.error(`YouTube fetch error for ${channelId}:`, e);
    return 0;
  }
}

export async function GET() {
  try {
    const memberEntries = Object.entries(MEMBERS);

    const results = await Promise.all(
      memberEntries.map(async ([name, m]) => {
        const [instagramData, tiktok, youtube] = await Promise.all([
          fetchInstagramData(m.instagram),
          fetchTikTokFollowers(m.tiktok),
          fetchYouTubeSubscribers(m.youtubeChannelId),
        ]);

        return {
          name,
          instagram: instagramData.followers,
          tiktok,
          youtube,
          total: instagramData.followers + tiktok + youtube,
          profilePic: instagramData.profilePic,
        };
      })
    );

    const totals = results.reduce(
      (acc, m) => ({
        tiktok: acc.tiktok + m.tiktok,
        instagram: acc.instagram + m.instagram,
        youtube: acc.youtube + m.youtube,
        total: acc.total + m.total,
      }),
      { tiktok: 0, instagram: 0, youtube: 0, total: 0 }
    );

    return NextResponse.json({
      success: true,
      members: results,
      totals,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error fetching follower counts:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch counts' }, { status: 500 });
  }
}
