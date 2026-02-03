"use client";
import { useEffect, useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Music playlist - all tracks
const PLAYLIST = [
  { title: "Till I Collapse", artist: "Eminem", src: "/media/audio/till-i-collapse.mp3" },
  { title: "Thunderstruck", artist: "AC/DC", src: "/media/audio/thunderstruck.mp3" },
  { title: "Mo Bamba", artist: "Sheck Wes", src: "/media/audio/mo-bamba.mp3" },
  { title: "Black Beatles", artist: "Rae Sremmurd", src: "/media/audio/black-beatles.mp3" },
  { title: "Eye of the Tiger", artist: "Survivor", src: "/media/audio/eye-of-the-tiger.mp3" },
  { title: "Forever", artist: "Drake, Kanye, Lil Wayne, Eminem", src: "/media/audio/forever.mp3" },
  { title: "One Dance", artist: "Drake", src: "/media/audio/one-dance.mp3" },
  { title: "Sunflower", artist: "Post Malone & Swae Lee", src: "/media/audio/sunflower.mp3" },
  { title: "Niggas In Paris", artist: "JAY-Z & Kanye West", src: "/media/audio/niggas-in-paris.mp3" },
  { title: "My Life Be Like", artist: "Grits ft. tobyMac", src: "/media/audio/my-life-be-like.mp3" },
  { title: "See You Again", artist: "Wiz Khalifa ft. Charlie Puth", src: "/media/audio/see-you-again.mp3" },
  { title: "Trap Queen", artist: "Fetty Wap", src: "/media/audio/trap-queen.mp3" },
  { title: "Maui Wowie", artist: "Kid Cudi", src: "/media/audio/maui-wowie.mp3" },
  { title: "Rocky Theme", artist: "Bill Conti", src: "/media/audio/rocky-theme.mp3" },
  { title: "Timeless", artist: "Spider-Verse", src: "/media/audio/timeless.mp3" },
  { title: "Now Or Never", artist: "TKANDZ", src: "/media/audio/now-or-never.mp3" },
];

const MEMBERS = [
  {
    name: "JGGLS",
    handle: "@jggls",
    apiName: "jggls",
    socials: {
      tiktok: "https://www.tiktok.com/@jggls",
      instagram: "https://www.instagram.com/_jggls_/",
      youtube: "https://www.youtube.com/@jgglsofficial"
    }
  },
  {
    name: "HUDDY",
    handle: "@huddy_lg",
    apiName: "huddy",
    socials: {
      tiktok: "https://www.tiktok.com/@huddy_lg",
      instagram: "https://www.instagram.com/huddy_lg/",
      youtube: "https://www.youtube.com/@Huddy_lg"
    }
  },
  {
    name: "JVHN SEO",
    handle: "@jvhnseo",
    apiName: "jvhn",
    socials: {
      tiktok: "https://www.tiktok.com/@jvhnseo",
      instagram: "https://www.instagram.com/jvhnseo/",
      youtube: "https://www.youtube.com/@JvhnSeo"
    }
  },
  {
    name: "BRANDON",
    handle: "@djfashionkill",
    apiName: "brandon",
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
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
      <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current">
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

function ArrowIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
    </svg>
  );
}

function MusicIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
    </svg>
  );
}

function PauseIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
    </svg>
  );
}

function SkipNextIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/>
    </svg>
  );
}

function SkipPrevIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/>
    </svg>
  );
}

function VolumeIcon({ className = "w-5 h-5", muted = false }: { className?: string; muted?: boolean }) {
  return muted ? (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
    </svg>
  ) : (
    <svg viewBox="0 0 24 24" className={`${className} fill-current`}>
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
    </svg>
  );
}

// Floating Music Player Component
function MusicPlayer() {
  const [isOpen, setIsOpen] = useState(true); // Start open to invite users to play
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100 || 0);
    };

    const handleEnded = () => {
      nextTrack();
    };

    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrack]);

  const togglePlay = async () => {
    if (!audioRef.current) return;
    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Ensure audio is loaded
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Playback error:', error);
      // Try again after a brief moment
      setTimeout(async () => {
        try {
          await audioRef.current?.play();
          setIsPlaying(true);
        } catch (e) {
          console.error('Retry failed:', e);
        }
      }, 100);
    }
  };

  const nextTrack = async () => {
    const next = (currentTrack + 1) % PLAYLIST.length;
    setCurrentTrack(next);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[next].src;
      audioRef.current.load();
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.error('Next track play error:', e);
        }
      }
    }
  };

  const prevTrack = async () => {
    const prev = currentTrack === 0 ? PLAYLIST.length - 1 : currentTrack - 1;
    setCurrentTrack(prev);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[prev].src;
      audioRef.current.load();
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.error('Prev track play error:', e);
        }
      }
    }
  };

  const selectTrack = async (index: number) => {
    setCurrentTrack(index);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].src;
      audioRef.current.load();
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (e) {
          console.error('Select track play error:', e);
        }
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={PLAYLIST[currentTrack].src} preload="auto" />

      {/* Floating Button */}
      <motion.div
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring" }}
      >
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-72 md:w-80 bg-neutral-900 rounded-2xl border border-white/10 shadow-2xl overflow-hidden mb-2"
            >
              {/* Now Playing */}
              <div className="p-4 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                    <MusicIcon className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-semibold truncate">{PLAYLIST[currentTrack].title}</p>
                    <p className="text-white/50 text-sm truncate">{PLAYLIST[currentTrack].artist}</p>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="mt-3 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 transition-all duration-200"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Controls */}
              <div className="p-4">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <button
                    onClick={prevTrack}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <SkipPrevIcon />
                  </button>
                  <button
                    onClick={togglePlay}
                    className="w-14 h-14 rounded-full bg-yellow-400 flex items-center justify-center text-black hover:bg-yellow-300 transition-all hover:scale-105"
                  >
                    {isPlaying ? <PauseIcon className="w-7 h-7" /> : <PlayIcon className="w-7 h-7 ml-1" />}
                  </button>
                  <button
                    onClick={nextTrack}
                    className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <SkipNextIcon />
                  </button>
                </div>

                {/* Volume */}
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-white/50 hover:text-white transition-colors"
                  >
                    <VolumeIcon muted={isMuted} className="w-5 h-5" />
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="flex-1 h-1 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-yellow-400"
                  />
                </div>

                {/* Playlist */}
                <div className="max-h-40 overflow-y-auto space-y-1">
                  {PLAYLIST.map((track, index) => (
                    <button
                      key={index}
                      onClick={() => selectTrack(index)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                        currentTrack === index
                          ? 'bg-yellow-400/20 text-yellow-400'
                          : 'hover:bg-white/5 text-white/60 hover:text-white'
                      }`}
                    >
                      <p className="text-sm font-medium truncate">{track.title}</p>
                      <p className="text-xs opacity-60 truncate">{track.artist}</p>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
            isPlaying
              ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-black animate-pulse'
              : 'bg-neutral-900 text-white border border-white/10 hover:border-yellow-400/50'
          }`}
        >
          {isPlaying ? (
            <div className="relative">
              <MusicIcon className="w-6 h-6 md:w-7 md:h-7" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-ping" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full" />
            </div>
          ) : (
            <MusicIcon className="w-6 h-6 md:w-7 md:h-7" />
          )}
        </button>
      </motion.div>
    </>
  );
}

// Creator YouTube channels with subscriber counts
const YOUTUBE_CHANNELS = [
  {
    name: "JGGLS",
    handle: "@jgglsofficial",
    url: "https://www.youtube.com/@jgglsofficial",
    subscribers: "2.6M+",
    description: "Comedy, Characters & Chaos",
    gradient: "from-red-600 to-orange-500",
  },
  {
    name: "JVHN SEO",
    handle: "@JvhnSeo",
    url: "https://www.youtube.com/@JvhnSeo",
    subscribers: "1.33M+",
    description: "Entertainment & Vlogs",
    gradient: "from-purple-600 to-pink-500",
  },
  {
    name: "HUDDY",
    handle: "@Huddy_lg",
    url: "https://www.youtube.com/@Huddy_lg",
    subscribers: "1.2K+",
    description: "Content & Comedy",
    gradient: "from-blue-600 to-cyan-500",
  },
];

// Marquee component
function Marquee({ children, speed = 30 }: { children: React.ReactNode; speed?: number }) {
  return (
    <div className="overflow-hidden whitespace-nowrap">
      <motion.div
        className="inline-flex"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear" }}
      >
        {children}
        {children}
      </motion.div>
    </div>
  );
}

// Stat component with simple display
function AnimatedStat({ value, label }: { value: number; label: string }) {
  const formatNumber = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className="text-5xl md:text-7xl text-yellow-400 mb-2"
        style={{ fontFamily: 'var(--font-heading)' }}
      >
        {formatNumber(value)}
      </div>
      <div className="text-xs font-semibold text-white/40 uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const stagger = {
  visible: { transition: { staggerChildren: 0.1 } }
};

export default function Home() {
  const [followerData, setFollowerData] = useState<any>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'ideas' | 'collab'>('ideas');
  const [formData, setFormData] = useState({ name: '', email: '', message: '', socialHandle: '', followerCount: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const fetchFollowers = useCallback(async () => {
    try {
      const r = await fetch("/api/followers", { cache: 'no-store' });
      const d = await r.json();
      if (d.success) setFollowerData(d);
    } catch (e) {
      console.error(e);
    }
  }, []);

  useEffect(() => {
    fetchFollowers();
    // Refresh every 60 seconds for live updates
    const interval = setInterval(fetchFollowers, 60000);
    return () => clearInterval(interval);
  }, [fetchFollowers]);

  const formatNumber = (n: number) => {
    if (n >= 1e6) return (n / 1e6).toFixed(1) + "M";
    if (n >= 1e3) return (n / 1e3).toFixed(1) + "K";
    return n.toLocaleString();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');

    const subject = activeTab === 'ideas'
      ? `Video Idea from ${formData.name}`
      : `Collab Request from ${formData.name} (${formData.socialHandle})`;

    const message = activeTab === 'ideas'
      ? `VIDEO IDEA SUBMISSION\n\n${formData.message}`
      : `COLLABORATION REQUEST\n\nSocial Handle: ${formData.socialHandle}\nFollower Count: ${formData.followerCount}\n\nMessage:\n${formData.message}`;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message,
          subject
        })
      });

      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '', socialHandle: '', followerCount: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch {
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <a href="#" className="flex items-center gap-1">
              <span
                className="text-3xl md:text-4xl text-yellow-400 tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DERF
              </span>
              <span
                className="text-3xl md:text-4xl text-white tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                BOYS
              </span>
            </a>

            <div className="hidden md:flex items-center gap-10">
              {['Videos', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-semibold uppercase tracking-widest text-white/60 hover:text-yellow-400 transition-colors duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="hidden md:flex items-center gap-3">
              {[
                { icon: TikTokIcon, href: "https://www.tiktok.com/@jggls" },
                { icon: InstagramIcon, href: "https://www.instagram.com/derfboys/" },
                { icon: YouTubeIcon, href: "https://www.youtube.com/@jgglsofficial" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <button
              className="md:hidden text-white/80 hover:text-yellow-400 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/95" onClick={() => setMobileMenuOpen(false)} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-neutral-950 border-l border-white/10 p-8"
          >
            <button onClick={() => setMobileMenuOpen(false)} className="absolute top-6 right-6 text-white/60 hover:text-white">
              <CloseIcon />
            </button>
            <div className="mt-20 flex flex-col gap-8">
              {['Videos', 'About', 'Team', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-4xl font-semibold text-white hover:text-yellow-400 transition-colors"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {item}
                </a>
              ))}
            </div>
            <div className="mt-12 flex gap-4">
              {[
                { icon: TikTokIcon, href: "https://www.tiktok.com/@jggls" },
                { icon: InstagramIcon, href: "https://www.instagram.com/derfboys/" },
                { icon: YouTubeIcon, href: "https://www.youtube.com/@jgglsofficial" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-yellow-400 hover:text-black transition-all"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Video Background */}
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/media/videos/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1
              className="text-8xl md:text-[10rem] lg:text-[14rem] leading-none tracking-tight"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              <span className="text-yellow-400">DERF</span>
              <span className="text-white">BOYS</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-white/60 mt-6 mb-10 font-medium tracking-wide"
          >
            DO EVERYTHING REALLY FUN
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
              className="btn-glow group inline-flex items-center justify-center gap-3 bg-yellow-400 text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-all duration-300 hover:scale-105"
            >
              <PlayIcon className="w-5 h-5" />
              Watch Videos
              <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#about"
              className="inline-flex items-center justify-center gap-3 bg-transparent text-white px-8 py-4 font-bold uppercase tracking-wider border-2 border-white/20 hover:border-white/40 hover:bg-white/5 transition-all duration-300"
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/50 rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Marquee Banner */}
      <section className="py-4 bg-yellow-400 overflow-hidden">
        <Marquee speed={25}>
          <span className="inline-flex items-center gap-8 text-black font-bold text-lg md:text-xl uppercase tracking-wider px-4">
            <span>DO EVERYTHING REALLY FUN</span>
            <span className="text-yellow-600">★</span>
            <span>CONTENT CREATORS</span>
            <span className="text-yellow-600">★</span>
            <span>TIKTOK</span>
            <span className="text-yellow-600">★</span>
            <span>YOUTUBE</span>
            <span className="text-yellow-600">★</span>
            <span>INSTAGRAM</span>
            <span className="text-yellow-600">★</span>
            <span>ENTERTAINMENT</span>
            <span className="text-yellow-600">★</span>
            <span>COMEDY</span>
            <span className="text-yellow-600">★</span>
          </span>
        </Marquee>
      </section>

      {/* Stats Bar */}
      {followerData && (
        <section className="py-20 bg-neutral-950 border-y border-white/5 relative overflow-hidden">
          {/* Gradient orbs */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

          <div className="max-w-7xl mx-auto px-6 relative">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <AnimatedStat value={followerData.totals?.total || 0} label="Total Followers" />
              <AnimatedStat value={followerData.totals?.tiktok || 0} label="TikTok" />
              <AnimatedStat value={followerData.totals?.youtube || 0} label="YouTube" />
              <AnimatedStat value={followerData.totals?.instagram || 0} label="Instagram" />
            </div>
          </div>
        </section>
      )}

      {/* Content Section - Official Derf Boys Only */}
      <section id="videos" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2
              className="text-6xl md:text-8xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              OUR <span className="text-yellow-400">CONTENT</span>
            </h2>
            <p className="text-white/50 text-lg max-w-xl">
              Follow the official Derf Boys accounts
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              {
                platform: 'Instagram',
                icon: InstagramIcon,
                handle: '@derfboys',
                link: 'https://www.instagram.com/derfboys/',
                color: 'from-orange-500 via-pink-500 to-purple-600',
              },
              {
                platform: 'TikTok',
                icon: TikTokIcon,
                handle: '@derfboys',
                link: 'https://www.tiktok.com/@derfboys',
                color: 'from-cyan-400 via-pink-500 to-red-500',
              },
            ].map((platform, index) => (
              <motion.a
                key={platform.platform}
                href={platform.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative aspect-[16/9] rounded-2xl overflow-hidden group bg-gradient-to-br ${platform.color} p-8 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <platform.icon className="w-12 h-12 text-white" />
                  <ArrowIcon className="w-6 h-6 text-white/60 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </div>
                <div>
                  <h3
                    className="text-5xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {platform.platform}
                  </h3>
                  <p className="text-white/80 text-lg font-medium">{platform.handle}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* YouTube Channels Section */}
      <section className="py-24 bg-neutral-950 relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(250,204,21,0.08),transparent_50%)]" />
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-12 text-center"
          >
            <h2
              className="text-6xl md:text-8xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              WATCH ON <span className="text-red-500">YOUTUBE</span>
            </h2>
            <p className="text-white/50 text-lg">Subscribe to our channels</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {YOUTUBE_CHANNELS.map((channel, index) => (
              <motion.a
                key={channel.handle}
                href={channel.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`aspect-[4/3] rounded-2xl overflow-hidden bg-gradient-to-br ${channel.gradient} p-6 flex flex-col justify-between relative`}>
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <PlayIcon className="w-10 h-10 text-white ml-1" />
                    </div>
                  </div>

                  <div className="relative flex items-start justify-between">
                    <YouTubeIcon className="w-10 h-10 text-white/90" />
                    <div className="bg-black/30 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-white font-bold text-sm">{channel.subscribers}</span>
                    </div>
                  </div>

                  <div className="relative">
                    <h3
                      className="text-4xl text-white mb-1"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {channel.name}
                    </h3>
                    <p className="text-white/70 text-sm font-medium">{channel.handle}</p>
                    <p className="text-white/50 text-xs mt-2">{channel.description}</p>
                  </div>
                </div>

                {/* Subscribe button */}
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-white/60 text-sm group-hover:text-white transition-colors">
                    Watch latest videos
                  </span>
                  <span className="flex items-center gap-2 text-red-500 font-semibold text-sm group-hover:gap-3 transition-all">
                    Subscribe <ArrowIcon className="w-4 h-4" />
                  </span>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2
                className="text-6xl md:text-8xl text-white mb-8 leading-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                WE DO<br/>
                EVERYTHING<br/>
                <span className="text-yellow-400">REALLY FUN</span>
              </h2>
              <p className="text-lg text-white/60 mb-8 leading-relaxed">
                The Derf Boys are a collective of content creators bringing energy, laughs, and entertainment across social media. From viral TikToks to YouTube videos, we create content that makes people smile.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-3 bg-yellow-400 text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors duration-300 group"
              >
                Work With Us
                <ArrowIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/media/images/group-photo.jpg"
                  alt="The Derf Boys"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-yellow-400 text-black px-6 py-3">
                <span className="font-bold uppercase tracking-wider" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>
                  THE SQUAD
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <h2
              className="text-6xl md:text-8xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              MEET THE <span className="text-yellow-400">BOYS</span>
            </h2>
            <p className="text-white/50 text-lg">The creators behind the content</p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            {MEMBERS.map((member) => {
              const memberStats = followerData?.members?.find((m: any) => m.name === member.apiName);
              return (
                <motion.div
                  key={member.handle}
                  variants={fadeUp}
                  className="group"
                >
                  <div className="relative bg-neutral-900 rounded-2xl p-6 h-full border border-white/5 hover:border-yellow-400/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(250,204,21,0.15)]">
                    {/* Profile Picture */}
                    <div className="relative w-24 h-24 rounded-full overflow-hidden mb-5 mx-auto ring-4 ring-yellow-400/20 group-hover:ring-yellow-400/50 transition-all duration-300">
                      {/* Fallback gradient with initial */}
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                        <span
                          className="text-4xl text-black"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {member.name[0]}
                        </span>
                      </div>
                      {/* Profile image from Instagram API (covers fallback when loaded) */}
                      {memberStats?.profilePic && (
                        <img
                          src={memberStats.profilePic}
                          alt={member.name}
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      )}
                    </div>

                    {/* Name & Handle */}
                    <h3
                      className="text-2xl text-white mb-1 text-center"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {member.name}
                    </h3>
                    <p className="text-white/40 text-sm mb-4 text-center">{member.handle}</p>

                    {/* Individual Stats */}
                    {memberStats && (
                      <div className="text-center mb-5">
                        <div
                          className="text-2xl text-yellow-400"
                          style={{ fontFamily: 'var(--font-heading)' }}
                        >
                          {formatNumber(memberStats.total)}
                        </div>
                        <div className="text-xs text-white/30 uppercase tracking-wider">Total Followers</div>
                      </div>
                    )}

                    {/* Social Links */}
                    <div className="flex justify-center gap-3">
                      {member.socials.tiktok && (
                        <a
                          href={member.socials.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gradient-to-br hover:from-cyan-400 hover:to-pink-500 hover:text-white transition-all duration-300"
                          title="TikTok"
                        >
                          <TikTokIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.instagram && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 hover:text-white transition-all duration-300"
                          title="Instagram"
                        >
                          <InstagramIcon className="w-5 h-5" />
                        </a>
                      )}
                      {member.socials.youtube && (
                        <a
                          href={member.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-red-600 hover:text-white transition-all duration-300"
                          title="YouTube"
                        >
                          <YouTubeIcon className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Community Section */}
      <section id="contact" className="py-24 bg-neutral-950">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-12"
          >
            <h2
              className="text-6xl md:text-8xl text-white mb-4"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              JOIN THE <span className="text-yellow-400">COMMUNITY</span>
            </h2>
            <p className="text-white/50 text-lg">
              Submit video ideas or apply to collaborate with us
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setActiveTab('ideas')}
              className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'ideas'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Submit Video Idea
            </button>
            <button
              onClick={() => setActiveTab('collab')}
              className={`px-6 py-3 font-bold uppercase tracking-wider transition-all duration-300 ${
                activeTab === 'collab'
                  ? 'bg-yellow-400 text-black'
                  : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              Apply to Collab
            </button>
          </div>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-neutral-900 rounded-2xl p-8 border border-white/5"
          >
            {formStatus === 'success' ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
                  {activeTab === 'ideas' ? 'IDEA SUBMITTED!' : 'APPLICATION SENT!'}
                </h3>
                <p className="text-white/60">We'll review it and get back to you soon.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {activeTab === 'collab' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                        Social Media Handle
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.socialHandle}
                        onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        placeholder="@yourhandle"
                      />
                    </div>
                    <div>
                      <label className="block text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                        Follower Count
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.followerCount}
                        onChange={(e) => setFormData({ ...formData, followerCount: e.target.value })}
                        className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-yellow-400 focus:outline-none transition-colors"
                        placeholder="100K"
                      />
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <label className="block text-white/60 text-sm font-semibold uppercase tracking-wider mb-2">
                    {activeTab === 'ideas' ? 'Your Video Idea' : 'Tell Us About Yourself'}
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:border-yellow-400 focus:outline-none transition-colors resize-none"
                    placeholder={activeTab === 'ideas'
                      ? "Describe your video idea... What should we do? Why would it be fun?"
                      : "Tell us about your content, why you want to collaborate, and any ideas you have..."
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="w-full bg-yellow-400 text-black py-4 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === 'loading' ? 'Submitting...' : activeTab === 'ideas' ? 'Submit Idea' : 'Apply Now'}
                </button>

                {formStatus === 'error' && (
                  <p className="text-red-400 text-center mt-4">Something went wrong. Please try again.</p>
                )}
              </>
            )}
          </motion.form>

          {/* Business Contact */}
          <div className="text-center mt-12">
            <p className="text-white/40 text-sm mb-3">For business inquiries & sponsorships:</p>
            <a
              href="mailto:derfboys@gmail.com"
              className="text-yellow-400 font-bold hover:text-yellow-300 transition-colors"
            >
              derfboys@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* Music Player */}
      <MusicPlayer />

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-1">
              <span
                className="text-2xl text-yellow-400"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                DERF
              </span>
              <span
                className="text-2xl text-white"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                BOYS
              </span>
            </div>

            <div className="flex gap-4">
              {[
                { icon: TikTokIcon, href: "https://www.tiktok.com/@jggls" },
                { icon: InstagramIcon, href: "https://www.instagram.com/derfboys/" },
                { icon: YouTubeIcon, href: "https://www.youtube.com/@jgglsofficial" },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <p className="text-white/30 text-sm">
              &copy; {new Date().getFullYear()} The Derf Boys
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
