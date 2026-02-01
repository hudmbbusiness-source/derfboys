"use client";
import { useEffect, useState, useCallback } from "react";

const MEMBERS = [
  { name: "HUDDY", handle: "@huddy_lg", role: "Co-Founder", socials: { tiktok: "https://www.tiktok.com/@huddy_lg", instagram: "https://www.instagram.com/huddy_lg/", youtube: "https://www.youtube.com/@Huddy_lg" }, color: "#FFB21A" },
  { name: "JVHN SEO", handle: "@jvhnseo", role: "Co-Founder", socials: { tiktok: "https://www.tiktok.com/@jvhnseo", instagram: "https://www.instagram.com/jvhnseo/", youtube: "https://www.youtube.com/@JvhnSeo" }, color: "#C81E2A" },
  { name: "BRANDON DELUNA", handle: "@djfashionkill", role: "Co-Founder", socials: { tiktok: "https://www.tiktok.com/@djfashionkill", instagram: "https://www.instagram.com/brandondeluna_/" }, color: "#FFB21A" },
  { name: "JGGLS", handle: "@jggls", role: "Co-Founder", socials: { tiktok: "https://www.tiktok.com/@jggls", instagram: "https://www.instagram.com/_jggls_/", youtube: "https://www.youtube.com/@jgglsofficial" }, color: "#C81E2A" },
];

function TikTokIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>; }
function InstagramIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M12 2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.76 3.89 2.22 7.15 2.07 8.42 2.01 8.8 2 12 2zm0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>; }
function YouTubeIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>; }

function AnimatedCounter({ value, label }: { value: number; label: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => { if (value === 0) return; let c = 0; const i = value / 60; const t = setInterval(() => { c += i; if (c >= value) { setDisplayValue(value); clearInterval(t); } else setDisplayValue(Math.floor(c)); }, 33); return () => clearInterval(t); }, [value]);
  const f = (n: number) => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(1)+"K" : n.toLocaleString();
  return <div className="text-center"><div className="text-4xl md:text-6xl font-bold text-[#FFB21A] glow-text counter-pulse">{f(displayValue)}</div><div className="text-sm text-gray-400 uppercase tracking-widest mt-2">{label}</div></div>;
}

function MemberCard({ member }: { member: any }) {
  const initials = member.name.split(" ").map((n: string) => n[0]).join("");
  return (
    <div className="member-card bg-[#0f0f0f] p-6 relative overflow-hidden group" style={{ borderColor: member.color }}>
      <div className="relative z-10 flex justify-center mb-6"><div className="w-32 h-32 border-4 flex items-center justify-center text-4xl font-bold" style={{ borderColor: member.color, boxShadow: "4px 4px 0 " + member.color, backgroundColor: "#1a1a1a", color: member.color }}>{initials}</div></div>
      <div className="relative z-10 text-center mb-4"><h3 className="text-2xl font-bold" style={{ color: member.color }}>{member.name}</h3><p className="text-gray-400 text-sm mt-1">{member.handle}</p><p className="text-gray-500 text-xs mt-2 uppercase tracking-widest">{member.role}</p></div>
      <div className="relative z-10 flex justify-center gap-4 mt-6">
        {member.socials.tiktok && <a href={member.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFB21A]"><TikTokIcon /></a>}
        {member.socials.instagram && <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C81E2A]"><InstagramIcon /></a>}
        {member.socials.youtube && <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000]"><YouTubeIcon /></a>}
      </div></div>);
}

export default function Home() {
  const [followerData, setFollowerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fetchFollowers = useCallback(async () => { try { const r = await fetch("/api/followers"); const d = await r.json(); if (d.success) setFollowerData(d); } catch (e) { console.error(e); } finally { setIsLoading(false); } }, []);
  useEffect(() => { fetchFollowers(); const i = setInterval(fetchFollowers, 300000); return () => clearInterval(i); }, [fetchFollowers]);
  const fmt = (n: number) => n >= 1e6 ? (n/1e6).toFixed(1)+"M" : n >= 1e3 ? (n/1e3).toFixed(1)+"K" : n.toLocaleString();
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-sm border-b-2 border-[#FFB21A]">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col"><span className="text-xs text-gray-500 uppercase tracking-widest">Total Followers</span><span className="text-2xl md:text-3xl font-bold text-[#FFB21A] glow-text">{isLoading ? "..." : followerData?.totals?.total ? fmt(followerData.totals.total) : "..."}</span></div>
          <div className="text-xl md:text-2xl font-bold tracking-widest"><span className="text-[#FFB21A]">THE</span> <span className="text-white">DERF</span> <span className="text-[#C81E2A]">BOYS</span></div>
          <nav className="hidden md:flex items-center gap-6"><a href="#about" className="text-gray-300 hover:text-[#FFB21A] uppercase text-sm">About</a><a href="#team" className="text-gray-300 hover:text-[#FFB21A] uppercase text-sm">Team</a><a href="#content" className="text-gray-300 hover:text-[#FFB21A] uppercase text-sm">Content</a><a href="#contact" className="arcade-btn text-sm py-2 px-4">Contact</a></nav>
        </div></header>
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "linear-gradient(#FFB21A 1px, transparent 1px), linear-gradient(90deg, #FFB21A 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB21A]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C81E2A]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8"><span className="text-[#FFB21A] glow-text flicker">THE</span><br /><span className="text-white" style={{ textShadow: "4px 4px 0 #C81E2A" }}>DERF BOYS</span></h1>
          <p className="text-xl md:text-3xl text-gray-300 mb-8 tracking-widest uppercase">Do Everything Really Fun</p>
          <div className="grid grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto"><AnimatedCounter value={followerData?.totals?.tiktok || 0} label="TikTok" /><AnimatedCounter value={followerData?.totals?.youtube || 0} label="YouTube" /><AnimatedCounter value={followerData?.totals?.instagram || 0} label="Instagram" /></div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center"><a href="#team" className="arcade-btn">Meet The Boys</a><a href="#content" className="arcade-btn arcade-btn-red">Watch Now</a></div>
        </div></section>
      <div className="section-divider" />
      <section id="about" className="py-24 px-4"><div className="max-w-4xl mx-auto text-center"><h2 className="text-4xl md:text-6xl font-bold mb-8"><span className="text-[#FFB21A]">ABOUT</span> <span className="text-white">US</span></h2><p className="text-xl text-gray-300 leading-relaxed">The Derf Boys are a collective of content creators who believe life should be fun. From viral TikToks to YouTube bangers, we bring the energy, the laughs, and the content you did not know you needed.</p></div></section>
      <div className="section-divider" />
      <section id="team" className="py-24 px-4 bg-[#0f0f0f]"><div className="max-w-6xl mx-auto"><h2 className="text-4xl md:text-6xl font-bold text-center mb-16"><span className="text-white">MEET</span> <span className="text-[#C81E2A]">THE BOYS</span></h2><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">{MEMBERS.map((m, i) => <MemberCard key={i} member={m} />)}</div></div></section>
      <div className="section-divider" />
      <section id="content" className="py-24 px-4"><div className="max-w-6xl mx-auto"><h2 className="text-4xl md:text-6xl font-bold text-center mb-16"><span className="text-[#FFB21A]">LATEST</span> <span className="text-white">CONTENT</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer" className="retro-border bg-[#0f0f0f] p-6 text-center hover:scale-105 transition-transform flex flex-col items-center"><TikTokIcon /><p className="mt-4 font-bold text-[#FFB21A]">JGGLS</p></a>
          <a href="https://www.tiktok.com/@jvhnseo" target="_blank" rel="noopener noreferrer" className="retro-border bg-[#0f0f0f] p-6 text-center hover:scale-105 transition-transform flex flex-col items-center"><TikTokIcon /><p className="mt-4 font-bold text-[#C81E2A]">JVHN SEO</p></a>
          <a href="https://www.tiktok.com/@huddy_lg" target="_blank" rel="noopener noreferrer" className="retro-border bg-[#0f0f0f] p-6 text-center hover:scale-105 transition-transform flex flex-col items-center"><TikTokIcon /><p className="mt-4 font-bold text-[#FFB21A]">HUDDY</p></a>
          <a href="https://www.tiktok.com/@djfashionkill" target="_blank" rel="noopener noreferrer" className="retro-border bg-[#0f0f0f] p-6 text-center hover:scale-105 transition-transform flex flex-col items-center"><TikTokIcon /><p className="mt-4 font-bold text-[#C81E2A]">BRANDON</p></a>
        </div>
        <div className="flex flex-wrap justify-center gap-4"><a href="https://www.youtube.com/@jgglsofficial" target="_blank" className="arcade-btn flex items-center gap-2"><YouTubeIcon /> YouTube</a><a href="https://www.instagram.com/_jggls_/" target="_blank" className="arcade-btn arcade-btn-red flex items-center gap-2"><InstagramIcon /> Instagram</a></div>
      </div></section>
      <div className="section-divider" />
      <section id="contact" className="py-24 px-4 bg-[#0f0f0f]"><div className="max-w-2xl mx-auto text-center"><h2 className="text-4xl md:text-6xl font-bold mb-8"><span className="text-white">GET IN</span> <span className="text-[#C81E2A]">TOUCH</span></h2><p className="text-xl text-gray-300 mb-12">For business inquiries, collaborations, or just to say what is up - hit us up.</p><a href="mailto:derfboys@gmail.com" className="arcade-btn text-xl">derfboys@gmail.com</a></div></section>
      <footer className="border-t-2 border-[#FFB21A] py-8 px-4"><div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div className="text-xl font-bold tracking-widest"><span className="text-[#FFB21A]">THE</span> <span className="text-white">DERF</span> <span className="text-[#C81E2A]">BOYS</span></div><p className="text-gray-500 text-sm">The Derf Boys. Do Everything Really Fun.</p></div></footer>
    </div>);
}
