"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const MEMBERS = [
  {
    name: "JGGLS",
    handle: "@jggls",
    role: "Co-Founder",
    color: "from-yellow-400 to-orange-500",
    socials: {
      tiktok: "https://www.tiktok.com/@jggls",
      instagram: "https://www.instagram.com/_jggls_/",
      youtube: "https://www.youtube.com/@jgglsofficial"
    }
  },
  {
    name: "HUDDY",
    handle: "@huddy_lg",
    role: "Co-Founder",
    color: "from-orange-500 to-red-500",
    socials: {
      tiktok: "https://www.tiktok.com/@huddy_lg",
      instagram: "https://www.instagram.com/huddy_lg/",
      youtube: "https://www.youtube.com/@Huddy_lg"
    }
  },
  {
    name: "JVHN SEO",
    handle: "@jvhnseo",
    role: "Co-Founder",
    color: "from-red-500 to-pink-500",
    socials: {
      tiktok: "https://www.tiktok.com/@jvhnseo",
      instagram: "https://www.instagram.com/jvhnseo/",
      youtube: "https://www.youtube.com/@JvhnSeo"
    }
  },
  {
    name: "BRANDON",
    handle: "@djfashionkill",
    role: "Co-Founder",
    color: "from-pink-500 to-purple-500",
    socials: {
      tiktok: "https://www.tiktok.com/@djfashionkill",
      instagram: "https://www.instagram.com/brandondeluna_/"
    }
  },
];

function TikTokIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YouTubeIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-8 h-8 fill-current">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
    </svg>
  );
}

function PlayIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M8 5v14l11-7z"/>
    </svg>
  );
}

export default function Home() {
  const [followerData, setFollowerData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const fetchFollowers = useCallback(async () => {
    try {
      const r = await fetch("/api/followers");
      const d = await r.json();
      if (d.success) setFollowerData(d);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchFollowers();
    const interval = setInterval(fetchFollowers, 300000);
    return () => clearInterval(interval);
  }, [fetchFollowers]);

  const formatNumber = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };

  const handleVideoClick = (index: number) => {
    const video = videoRefs.current[index];
    if (video) {
      if (activeVideo === index) {
        video.pause();
        setActiveVideo(null);
      } else {
        // Pause other videos
        videoRefs.current.forEach((v, i) => {
          if (v && i !== index) v.pause();
        });
        video.play();
        setActiveVideo(index);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black via-black/80 to-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="relative">
              <span className="text-3xl md:text-4xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 drop-shadow-lg"
                style={{
                  textShadow: '3px 3px 0px #000, -1px -1px 0px #000, 1px -1px 0px #000, -1px 1px 0px #000',
                  WebkitTextStroke: '1px black'
                }}>
                DERFBOYS
              </span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {['Videos', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-bold uppercase tracking-wider text-white hover:text-yellow-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center text-black hover:scale-110 transition-transform shadow-lg">
                <YouTubeIcon className="w-5 h-5" />
              </a>
            </div>

            <button className="md:hidden text-yellow-400" onClick={() => setMobileMenuOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/90 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600 z-50 p-8"
            >
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-black">
                <CloseIcon />
              </button>
              <div className="mt-20 flex flex-col gap-6">
                {['Videos', 'About', 'Team', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-4xl font-black text-black hover:text-white transition-colors"
                    style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.2)' }}
                  >
                    {item}
                  </a>
                ))}
              </div>
              <div className="mt-12 flex gap-4">
                <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-yellow-400">
                  <TikTokIcon />
                </a>
                <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-orange-400">
                  <InstagramIcon />
                </a>
                <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer"
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-red-400">
                  <YouTubeIcon />
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600">
          <div className="absolute inset-0 opacity-30">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-white/20"
                style={{
                  width: Math.random() * 300 + 50,
                  height: Math.random() * 300 + 50,
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 100 - 50],
                  y: [0, Math.random() * 100 - 50],
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: Math.random() * 10 + 10,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
              />
            ))}
          </div>
        </div>

        {/* Video Overlay */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40 mix-blend-overlay"
          >
            <source src="/media/videos/hero-video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-white mb-4"
              style={{
                textShadow: '6px 6px 0px #000, -2px -2px 0px #000, 2px -2px 0px #000, -2px 2px 0px #000, 8px 8px 20px rgba(0,0,0,0.5)',
                WebkitTextStroke: '2px black'
              }}
            >
              DERF
            </h1>
            <h1
              className="text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter leading-none text-black mb-8"
              style={{
                textShadow: '6px 6px 0px rgba(255,255,255,0.3), 8px 8px 20px rgba(0,0,0,0.5)',
                WebkitTextStroke: '3px white'
              }}
            >
              BOYS
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-black mb-10 uppercase tracking-widest"
            style={{ textShadow: '2px 2px 0px rgba(255,255,255,0.5)' }}
          >
            Do Everything Really Fun
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://www.youtube.com/@jgglsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-3 bg-black text-white px-10 py-5 font-black text-xl uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl"
              style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.3)' }}
            >
              <PlayIcon className="w-6 h-6" />
              Watch Now
            </a>
            <a
              href="#team"
              className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 font-black text-xl uppercase tracking-wider hover:scale-105 transition-transform shadow-2xl"
              style={{ boxShadow: '6px 6px 0px rgba(0,0,0,0.3)' }}
            >
              Meet The Boys
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-8 h-14 border-4 border-black rounded-full flex justify-center pt-2 bg-white/20 backdrop-blur-sm">
            <motion.div
              className="w-2 h-3 bg-black rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      {/* Stats Bar */}
      {followerData && (
        <section className="relative py-8 bg-black">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 opacity-10" />
          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: 'Total Followers', value: followerData.totals?.total },
                { label: 'TikTok', value: followerData.totals?.tiktok },
                { label: 'YouTube', value: followerData.totals?.youtube },
                { label: 'Instagram', value: followerData.totals?.instagram },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center p-6 bg-gradient-to-br from-neutral-900 to-neutral-800 rounded-2xl border border-neutral-700"
                >
                  <div
                    className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
                  >
                    {formatNumber(stat.value || 0)}
                  </div>
                  <div className="text-sm font-bold text-neutral-400 uppercase tracking-wider mt-2">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Videos Section */}
      <section id="videos" className="py-24 bg-gradient-to-b from-black via-neutral-900 to-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
              }}
            >
              LATEST VIDEOS
            </h2>
            <p className="text-xl text-neutral-400">Check out our content</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[0, 1].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative aspect-video rounded-3xl overflow-hidden cursor-pointer group"
                style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
                onClick={() => handleVideoClick(index)}
              >
                <video
                  ref={(el) => { videoRefs.current[index] = el; }}
                  src={`/media/videos/video${index + 1}.mp4`}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  muted={activeVideo !== index}
                />
                <div className={`absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent flex items-center justify-center transition-opacity duration-300 ${activeVideo === index ? 'opacity-0' : 'opacity-100 group-hover:opacity-80'}`}>
                  <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-black shadow-2xl group-hover:scale-110 transition-transform">
                    <PlayIcon className="w-12 h-12 ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${activeVideo === index ? 'bg-red-500 animate-pulse' : 'bg-neutral-500'}`} />
                    <span className="text-sm font-bold uppercase tracking-wider text-neutral-300">
                      {activeVideo === index ? 'Now Playing' : 'Click to Play'}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mt-12 text-center"
          >
            <a
              href="https://www.youtube.com/@jgglsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 text-black px-8 py-4 font-black text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
              style={{ boxShadow: '4px 4px 0px rgba(0,0,0,0.3)' }}
            >
              <YouTubeIcon className="w-6 h-6" />
              Subscribe on YouTube
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-black rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2
                className="text-5xl md:text-7xl font-black text-white mb-8 leading-tight"
                style={{
                  textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                  WebkitTextStroke: '1px black'
                }}
              >
                WE DO<br/>
                EVERYTHING<br/>
                <span className="text-black" style={{ WebkitTextStroke: '2px white' }}>REALLY FUN</span>
              </h2>
              <p className="text-xl text-black/80 mb-8 leading-relaxed font-medium">
                The Derf Boys are a collective of content creators bringing energy, laughs, and entertainment across social media. From viral TikToks to YouTube videos, we create content that makes people smile.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-black text-white px-8 py-4 font-black text-lg uppercase tracking-wider hover:scale-105 transition-transform shadow-xl"
                style={{ boxShadow: '4px 4px 0px rgba(255,255,255,0.3)' }}
              >
                Work With Us
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <div
                className="aspect-square rounded-3xl overflow-hidden border-4 border-black"
                style={{ boxShadow: '12px 12px 0px rgba(0,0,0,0.4)' }}
              >
                <img
                  src="/media/images/group-photo.jpg"
                  alt="The Derf Boys"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-black text-white px-8 py-4 font-black text-2xl uppercase">
                The Squad
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2
              className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mb-4"
            >
              MEET THE BOYS
            </h2>
            <p className="text-xl text-neutral-400">The creators behind the content</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {MEMBERS.map((member, index) => (
              <motion.div
                key={member.handle}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div
                  className={`aspect-[3/4] rounded-3xl overflow-hidden bg-gradient-to-br ${member.color} p-1`}
                  style={{ boxShadow: '8px 8px 0px rgba(0,0,0,0.3)' }}
                >
                  <div className="w-full h-full bg-neutral-900 rounded-3xl flex flex-col items-center justify-center p-6 group-hover:bg-neutral-800 transition-colors">
                    <div
                      className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} mb-6 flex items-center justify-center text-4xl font-black text-black`}
                    >
                      {member.name[0]}
                    </div>
                    <h3
                      className="text-2xl font-black text-white mb-1"
                      style={{ textShadow: '2px 2px 0px rgba(0,0,0,0.5)' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-neutral-500 font-medium mb-6">{member.handle}</p>

                    <div className="flex gap-3">
                      {member.socials.tiktok && (
                        <a
                          href={member.socials.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all"
                        >
                          <TikTokIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-black transition-all"
                        >
                          <InstagramIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.youtube && (
                        <a
                          href={member.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all"
                        >
                          <YouTubeIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600 via-orange-500 to-yellow-500" />
        <div className="absolute inset-0 opacity-30">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-black/20"
              style={{
                width: Math.random() * 200 + 100,
                height: Math.random() * 200 + 100,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2
              className="text-5xl md:text-7xl font-black text-white mb-6"
              style={{
                textShadow: '4px 4px 0px rgba(0,0,0,0.3)',
                WebkitTextStroke: '1px black'
              }}
            >
              LET'S WORK<br/>TOGETHER
            </h2>
            <p className="text-xl text-black/80 mb-10 font-medium">
              For business inquiries, collaborations, and sponsorships
            </p>
            <a
              href="mailto:derfboys@gmail.com"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-black text-xl hover:scale-105 transition-transform shadow-2xl"
              style={{ boxShadow: '6px 6px 0px rgba(255,255,255,0.3)' }}
            >
              derfboys@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <span
              className="text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500"
              style={{ WebkitTextStroke: '0.5px rgba(255,255,255,0.2)' }}
            >
              DERFBOYS
            </span>

            <div className="flex gap-4">
              <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:bg-gradient-to-br hover:from-yellow-400 hover:to-orange-500 hover:text-black transition-all">
                <TikTokIcon />
              </a>
              <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:bg-gradient-to-br hover:from-orange-500 hover:to-red-500 hover:text-black transition-all">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer"
                className="w-12 h-12 bg-neutral-900 rounded-full flex items-center justify-center text-neutral-400 hover:bg-red-600 hover:text-white transition-all">
                <YouTubeIcon />
              </a>
            </div>

            <p className="text-neutral-500 text-sm font-medium">
              &copy; {new Date().getFullYear()} The Derf Boys
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
