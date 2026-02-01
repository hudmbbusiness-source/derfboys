import { NextResponse } from 'next/server';

const MEMBERS = {
  huddy: { tiktok: "huddy_lg", instagram: "huddy_lg", youtube: "Huddy_lg", fallback: { tiktok: 2200, instagram: 1500, youtube: 500 } },
  jvhn: { tiktok: "jvhnseo", instagram: "jvhnseo", youtube: "JvhnSeo", fallback: { tiktok: 1088000, instagram: 85000, youtube: 45000 } },
  brandon: { tiktok: "djfashionkill", instagram: "brandondeluna_", youtube: null, fallback: { tiktok: 98800, instagram: 15000, youtube: 0 } },
  jggls: { tiktok: "jggls", instagram: "_jggls_", youtube: "jgglsofficial", fallback: { tiktok: 1796000, instagram: 170000, youtube: 2600000 } },
};

async function fetchTikTok(user: string, fallback: number): Promise<number> {
  try {
    const r = await fetch(`https://mixerno.space/api/tiktok-user-counter/user/${user}`, { next: { revalidate: 300 } });
    if (!r.ok) return fallback;
    const d = await r.json();
    const f = d?.counts?.find((c: any) => c.value === "followers");
    return f?.count ? parseInt(f.count, 10) : fallback;
  } catch { return fallback; }
}

async function fetchInstagram(user: string, fallback: number): Promise<number> {
  try {
    const r = await fetch(`https://mixerno.space/api/instagram-user-counter/user/${user}`, { next: { revalidate: 300 } });
    if (!r.ok) return fallback;
    const d = await r.json();
    const f = d?.counts?.find((c: any) => c.value === "followers");
    return f?.count ? parseInt(f.count, 10) : fallback;
  } catch { return fallback; }
}

async function fetchYouTube(user: string | null, fallback: number): Promise<number> {
  if (!user) return 0;
  try {
    const r = await fetch(`https://mixerno.space/api/youtube-channel-counter/user/${user}`, { next: { revalidate: 300 } });
    if (!r.ok) return fallback;
    const d = await r.json();
    const f = d?.counts?.find((c: any) => c.value === "subscribers");
    return f?.count ? parseInt(f.count, 10) : fallback;
  } catch { return fallback; }
}

export async function GET() {
  try {
    const members = Object.entries(MEMBERS);
    const results = await Promise.all(
      members.map(async ([name, m]) => {
        const [tiktok, instagram, youtube] = await Promise.all([
          fetchTikTok(m.tiktok, m.fallback.tiktok),
          fetchInstagram(m.instagram, m.fallback.instagram),
          fetchYouTube(m.youtube, m.fallback.youtube),
        ]);
        return { name, tiktok, instagram, youtube, total: tiktok + instagram + youtube };
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
