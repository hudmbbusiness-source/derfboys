import { NextResponse } from 'next/server';

// Member data with accurate follower counts
// Last updated: Update these periodically or when counts change significantly
const MEMBERS = {
  jggls: {
    tiktok: 1800000,      // 1.8M TikTok
    instagram: 176000,    // 176K Instagram
    youtube: 2600000,     // 2.6M YouTube
    profilePic: "/media/images/jggls.jpg",
  },
  huddy: {
    tiktok: 2400,         // 2.4K TikTok
    instagram: 1500,      // 1.5K Instagram
    youtube: 1200,        // 1.2K YouTube
    profilePic: "/media/images/huddy.jpg",
  },
  jvhn: {
    tiktok: 1090000,      // 1.09M TikTok
    instagram: 190000,    // 190K Instagram
    youtube: 1330000,     // 1.33M YouTube
    profilePic: "/media/images/jvhn.jpg",
  },
  brandon: {
    tiktok: 99000,        // 99K TikTok
    instagram: 196000,    // 196K Instagram
    youtube: 0,           // No YouTube
    profilePic: "/media/images/brandon.jpg",
  },
};

export async function GET() {
  try {
    const results = Object.entries(MEMBERS).map(([name, m]) => ({
      name,
      tiktok: m.tiktok,
      instagram: m.instagram,
      youtube: m.youtube,
      total: m.tiktok + m.instagram + m.youtube,
      profilePic: m.profilePic,
    }));

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
