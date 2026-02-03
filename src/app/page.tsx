"use client";
import { useEffect, useState, useCallback, useRef, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const MEMBERS = [
  {
    name: "JGGLS",
    handle: "@jggls",
    role: "Co-Founder",
    image: "/media/images/group-photo.jpg",
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
    image: "/media/images/group-photo.jpg",
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
    image: "/media/images/group-photo.jpg",
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
    image: "/media/images/group-photo.jpg",
    socials: {
      tiktok: "https://www.tiktok.com/@djfashionkill",
      instagram: "https://www.instagram.com/brandondeluna_/"
    }
  },
];

const SOCIAL_LINKS = [
  { platform: "YouTube", cta: "Subscribe", link: "https://www.youtube.com/@jgglsofficial", color: "from-red-600 to-red-700" },
  { platform: "TikTok", cta: "Follow", link: "https://www.tiktok.com/@jggls", color: "from-pink-500 to-pink-600" },
  { platform: "Instagram", cta: "Follow", link: "https://www.instagram.com/_jggls_/", color: "from-purple-500 to-purple-600" },
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
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
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

function ArrowRightIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  );
}

export default function Home() {
  const [followerData, setFollowerData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SOCIAL_LINKS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };

  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="text-2xl font-black tracking-tight">
              DERF<span className="text-yellow-400">BOYS</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              <a href="#videos" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Videos</a>
              <a href="#about" className="text-sm font-medium text-white/70 hover:text-white transition-colors">About</a>
              <a href="#team" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Team</a>
              <a href="#contact" className="text-sm font-medium text-white/70 hover:text-white transition-colors">Contact</a>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <TikTokIcon className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
                <YouTubeIcon className="w-5 h-5" />
              </a>
            </div>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(true)}>
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
              className="fixed inset-0 bg-black/80 z-50"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed top-0 right-0 bottom-0 w-80 bg-black z-50 p-8"
            >
              <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6">
                <CloseIcon />
              </button>
              <div className="mt-16 flex flex-col gap-6">
                <a href="#videos" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Videos</a>
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">About</a>
                <a href="#team" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Team</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold">Contact</a>
              </div>
              <div className="mt-12 flex gap-6">
                <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer"><TikTokIcon /></a>
                <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
                <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer"><YouTubeIcon /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/media/videos/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-6"
          >
            THE DERF<br />
            <span className="text-yellow-400">BOYS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-8 font-light"
          >
            Do Everything Really Fun
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <a
              href="https://www.youtube.com/@jgglsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-yellow-400 text-black px-8 py-4 font-bold text-lg hover:bg-yellow-300 transition-colors"
            >
              Watch Videos <ArrowRightIcon />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 font-bold text-lg hover:bg-white/20 transition-colors border border-white/20"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1 h-2 bg-white/50 rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar - Only shows when real data is loaded */}
      {followerData && (
        <section className="bg-yellow-400 text-black py-6">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-black">
                  {formatNumber(followerData.totals?.total || 0)}
                </div>
                <div className="text-sm font-medium opacity-70">Total Followers</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black">
                  {formatNumber(followerData.totals?.tiktok || 0)}
                </div>
                <div className="text-sm font-medium opacity-70">TikTok</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black">
                  {formatNumber(followerData.totals?.youtube || 0)}
                </div>
                <div className="text-sm font-medium opacity-70">YouTube</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-black">
                  {formatNumber(followerData.totals?.instagram || 0)}
                </div>
                <div className="text-sm font-medium opacity-70">Instagram</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Social Links Section */}
      <section className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-black">Follow Us</h2>
            <div className="flex gap-2">
              {SOCIAL_LINKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentSlide(i)}
                  className={`w-3 h-3 rounded-full transition-colors ${currentSlide === i ? 'bg-yellow-400' : 'bg-white/20'}`}
                />
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className={`relative h-[300px] md:h-[400px] bg-gradient-to-r ${SOCIAL_LINKS[currentSlide].color} flex items-center justify-center`}
              >
                <div className="relative z-10 text-center">
                  <h3 className="text-5xl md:text-7xl font-black mb-6">{SOCIAL_LINKS[currentSlide].platform}</h3>
                  <a
                    href={SOCIAL_LINKS[currentSlide].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-lg hover:bg-white/90 transition-colors"
                  >
                    {SOCIAL_LINKS[currentSlide].cta} <ArrowRightIcon />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Videos Section */}
      <section id="videos" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-12">Latest Videos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div
              className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden cursor-pointer group"
              onClick={handlePlayVideo}
            >
              <video
                src="/media/videos/video1.mp4"
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                  <PlayIcon className="w-10 h-10 ml-1" />
                </div>
              </div>
            </div>

            <div className="relative aspect-video bg-neutral-900 rounded-xl overflow-hidden cursor-pointer group">
              <video
                src="/media/videos/video2.mp4"
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center text-black">
                  <PlayIcon className="w-10 h-10 ml-1" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <a
              href="https://www.youtube.com/@jgglsofficial"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              View All Videos <ArrowRightIcon />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-neutral-950">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black mb-6">
                We Do Everything<br />
                <span className="text-yellow-400">Really Fun</span>
              </h2>
              <p className="text-lg text-white/70 mb-8 leading-relaxed">
                The Derf Boys are a collective of content creators bringing energy, laughs, and entertainment across social media. From viral TikToks to YouTube videos, we create content that makes people smile.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-yellow-400 text-black px-6 py-3 font-bold hover:bg-yellow-300 transition-colors"
              >
                Work With Us <ArrowRightIcon />
              </a>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/media/images/group-photo.jpg"
                  alt="The Derf Boys"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-4">Meet The Boys</h2>
          <p className="text-white/60 mb-12 max-w-xl">The creative minds behind the content.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {MEMBERS.map((member) => (
              <div key={member.handle} className="group">
                <div className="aspect-square bg-neutral-900 rounded-xl overflow-hidden mb-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                  <div className="absolute bottom-4 left-4 z-20">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-white/60 text-sm">{member.handle}</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  {member.socials.tiktok && (
                    <a href={member.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors">
                      <TikTokIcon className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.instagram && (
                    <a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors">
                      <InstagramIcon className="w-5 h-5" />
                    </a>
                  )}
                  {member.socials.youtube && (
                    <a href={member.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-yellow-400 transition-colors">
                      <YouTubeIcon className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-neutral-950">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Let's Work Together</h2>
          <p className="text-lg text-white/70 mb-8">
            For business inquiries, collaborations, and sponsorships.
          </p>
          <a
            href="mailto:derfboys@gmail.com"
            className="inline-flex items-center gap-2 bg-yellow-400 text-black px-8 py-4 font-bold text-lg hover:bg-yellow-300 transition-colors"
          >
            derfboys@gmail.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-2xl font-black tracking-tight">
              DERF<span className="text-yellow-400">BOYS</span>
            </div>
            <div className="flex gap-6">
              <a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <TikTokIcon />
              </a>
              <a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <InstagramIcon />
              </a>
              <a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-white transition-colors">
                <YouTubeIcon />
              </a>
            </div>
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} The Derf Boys. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
