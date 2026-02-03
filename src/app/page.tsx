"use client";
import { useEffect, useState, useCallback, useRef, FormEvent, Suspense } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useMotionValue, useSpring, useMotionValueEvent } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const MEMBERS = [
  { name: "HUDDY", handle: "@huddy_lg", role: "Co-Founder", bio: "The creative mastermind behind the camera. Bringing visuals to life with every frame.", socials: { tiktok: "https://www.tiktok.com/@huddy_lg", instagram: "https://www.instagram.com/huddy_lg/", youtube: "https://www.youtube.com/@Huddy_lg" }, color: "#FFB21A", accent: "#C81E2A" },
  { name: "JVHN SEO", handle: "@jvhnseo", role: "Co-Founder", bio: "Viral content creator & trendsetter. If it's trending, he started it.", socials: { tiktok: "https://www.tiktok.com/@jvhnseo", instagram: "https://www.instagram.com/jvhnseo/", youtube: "https://www.youtube.com/@JvhnSeo" }, color: "#C81E2A", accent: "#FFB21A" },
  { name: "BRANDON DELUNA", handle: "@djfashionkill", role: "Co-Founder", bio: "The style icon & fashion guru. Setting trends before they exist.", socials: { tiktok: "https://www.tiktok.com/@djfashionkill", instagram: "https://www.instagram.com/brandondeluna_/" }, color: "#FFB21A", accent: "#C81E2A" },
  { name: "JGGLS", handle: "@jggls", role: "Co-Founder", bio: "Comedy king with 2M+ subscribers. Making the world laugh one video at a time.", socials: { tiktok: "https://www.tiktok.com/@jggls", instagram: "https://www.instagram.com/_jggls_/", youtube: "https://www.youtube.com/@jgglsofficial" }, color: "#C81E2A", accent: "#FFB21A" },
];

const TESTIMONIALS = [
  { quote: "The Derf Boys bring unmatched energy to every collab! Their creativity is off the charts.", author: "Brand Partner", role: "Major Lifestyle Brand" },
  { quote: "Their content always goes viral. True social media experts who understand the algorithm.", author: "Marketing Director", role: "Fortune 500 Company" },
  { quote: "Working with them was a game-changer for our campaign. 10x ROI on our investment.", author: "Agency Lead", role: "Creative Agency" },
];

const MILESTONES = [
  { year: "2024", title: "The Beginning", description: "Four creators unite to form THE DERF BOYS", icon: "🚀" },
  { year: "2024", title: "1M Combined", description: "Hit our first million followers milestone", icon: "🎯" },
  { year: "2024", title: "Viral Moment", description: "First video to hit 50M+ views", icon: "🔥" },
  { year: "2025", title: "8M+ Strong", description: "Surpassed 8 million combined followers", icon: "👑" },
];

const BRAND_PARTNERS = [
  { name: "Fashion Nova", category: "Fashion" },
  { name: "Bang Energy", category: "Lifestyle" },
  { name: "Manscaped", category: "Grooming" },
  { name: "Ridge Wallet", category: "Accessories" },
  { name: "Hello Fresh", category: "Food" },
  { name: "ExpressVPN", category: "Tech" },
];

const FAQ_ITEMS = [
  { question: "How can I collaborate with The Derf Boys?", answer: "For collaboration inquiries, please reach out through our contact form or email us at derfboys@gmail.com. We're always open to creative partnerships!" },
  { question: "Do you do brand sponsorships?", answer: "Yes! We work with brands that align with our values and resonate with our audience. Contact us with your proposal and we'll get back to you within 48 hours." },
  { question: "Can I book The Derf Boys for an event?", answer: "Absolutely! We're available for appearances, meet & greets, and live events. Send us the details through our contact form." },
  { question: "How did The Derf Boys start?", answer: "We're four friends who share a passion for creating fun, engaging content. We came together in 2024 with one mission: Do Everything Really Fun!" },
];

function TikTokIcon({ className = "w-6 h-6" }: { className?: string }) { return <svg viewBox="0 0 24 24" className={`${className} fill-current`}><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>; }
function InstagramIcon({ className = "w-6 h-6" }: { className?: string }) { return <svg viewBox="0 0 24 24" className={`${className} fill-current`}><path d="M12 2c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85 0-3.2.01-3.58.07-4.85C2.38 3.76 3.89 2.22 7.15 2.07 8.42 2.01 8.8 2 12 2zm0 5c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/></svg>; }
function YouTubeIcon({ className = "w-6 h-6" }: { className?: string }) { return <svg viewBox="0 0 24 24" className={`${className} fill-current`}><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.87.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>; }
function MenuIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>; }
function CloseIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>; }
function PlayIcon() { return <svg viewBox="0 0 24 24" className="w-16 h-16 fill-current"><path d="M8 5v14l11-7z"/></svg>; }
function SendIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>; }
function ChevronDown() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"/></svg>; }
function MailIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>; }
function ArrowUpIcon() { return <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>; }
function DownloadIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/></svg>; }
function StarIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>; }
function FireIcon() { return <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current"><path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/></svg>; }

const easeOut = [0.22, 1, 0.36, 1] as const;
const fadeInUp = { hidden: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } } };

// 3D Particles Component
function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const pos = new Float32Array(2000 * 3);
    for (let i = 0; i < 2000; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05;
      ref.current.rotation.y = state.clock.elapsedTime * 0.08;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial transparent color="#FFB21A" size={0.02} sizeAttenuation depthWrite={false} opacity={0.6} />
    </Points>
  );
}

// Loading Screen
function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-8"
          animate={{ textShadow: ["0 0 20px #FFB21A", "0 0 40px #FFB21A", "0 0 20px #FFB21A"] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <span className="text-[#FFB21A]">THE</span>{" "}
          <span className="text-white">DERF</span>{" "}
          <span className="text-[#C81E2A]">BOYS</span>
        </motion.h1>

        <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#FFB21A] to-[#C81E2A]"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <motion.p
          className="mt-4 text-gray-500 text-sm uppercase tracking-widest"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading Experience...
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-10 flex gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-3 h-3 bg-[#FFB21A] rounded-full"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </motion.div>
    </motion.div>
  );
}

// Cursor Trail Effect
function CursorTrail() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        className="fixed w-8 h-8 border-2 border-[#FFB21A] rounded-full pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{ x: cursorXSpring, y: cursorYSpring }}
      />
      <motion.div
        className="fixed w-2 h-2 bg-[#FFB21A] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{ x: cursorX, y: cursorY, translateX: 12, translateY: 12 }}
      />
    </>
  );
}

// Scroll Progress Indicator
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFB21A] via-[#C81E2A] to-[#FFB21A] origin-left z-[60]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}

// Back to Top Button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 500);
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#FFB21A] text-black rounded-full flex items-center justify-center shadow-lg hover:bg-[#C81E2A] hover:text-white transition-colors"
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowUpIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

// Live Stats Ticker
function LiveStatsTicker({ followerData }: { followerData: any }) {
  const stats = [
    { label: "TikTok Followers", value: followerData?.totals?.tiktok || 5182000, icon: <TikTokIcon className="w-4 h-4" /> },
    { label: "YouTube Subscribers", value: followerData?.totals?.youtube || 3145000, icon: <YouTubeIcon className="w-4 h-4" /> },
    { label: "Instagram Followers", value: followerData?.totals?.instagram || 276500, icon: <InstagramIcon className="w-4 h-4" /> },
    { label: "Total Reach", value: followerData?.totals?.total || 8603500, icon: <StarIcon /> },
  ];

  const fmt = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : n.toLocaleString();

  return (
    <div className="overflow-hidden py-3 bg-[#0f0f0f] border-y border-gray-800">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(2)].map((_, setIndex) => (
          <div key={setIndex} className="flex">
            {stats.map((stat, i) => (
              <div key={`${setIndex}-${i}`} className="flex items-center gap-2 mx-8">
                <span className="text-[#FFB21A]">{stat.icon}</span>
                <span className="text-gray-400 text-sm">{stat.label}:</span>
                <span className="text-white font-bold">{fmt(stat.value)}</span>
                <span className="text-gray-600 mx-4">|</span>
              </div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

// Media Kit Section
function MediaKitSection() {
  const kitItems = [
    { title: "Press Kit", description: "High-res photos, logos, and brand guidelines", size: "12 MB", type: "ZIP" },
    { title: "Rate Card", description: "Sponsorship packages and pricing", size: "2 MB", type: "PDF" },
    { title: "Brand Deck", description: "Our story, stats, and audience demographics", size: "8 MB", type: "PDF" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {kitItems.map((item, index) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -5, borderColor: "#FFB21A" }}
          className="border-2 border-gray-800 bg-[#0f0f0f] p-6 group cursor-pointer transition-colors"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#FFB21A]/10 rounded-lg flex items-center justify-center text-[#FFB21A] group-hover:bg-[#FFB21A] group-hover:text-black transition-colors">
              <DownloadIcon />
            </div>
            <span className="text-xs text-gray-500 uppercase">{item.type}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#FFB21A] transition-colors">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-4">{item.description}</p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">{item.size}</span>
            <motion.span
              className="text-[#FFB21A] text-sm font-bold flex items-center gap-1"
              whileHover={{ x: 5 }}
            >
              Download →
            </motion.span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// Stats Comparison
function StatsComparison() {
  const platforms = [
    { name: "TikTok", followers: 5.2, growth: "+42%", color: "#FFB21A", icon: <TikTokIcon className="w-6 h-6" /> },
    { name: "YouTube", followers: 3.1, growth: "+28%", color: "#FF0000", icon: <YouTubeIcon className="w-6 h-6" /> },
    { name: "Instagram", followers: 0.3, growth: "+15%", color: "#C81E2A", icon: <InstagramIcon className="w-6 h-6" /> },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {platforms.map((platform, index) => (
        <motion.div
          key={platform.name}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative overflow-hidden"
        >
          <div className="retro-border bg-[#0f0f0f] p-6">
            <div className="flex items-center gap-3 mb-4">
              <span style={{ color: platform.color }}>{platform.icon}</span>
              <span className="text-white font-bold text-lg">{platform.name}</span>
            </div>
            <div className="text-4xl font-bold mb-2" style={{ color: platform.color }}>
              {platform.followers}M
            </div>
            <div className="flex items-center gap-2">
              <span className="text-green-400 text-sm font-bold flex items-center gap-1">
                <FireIcon /> {platform.growth}
              </span>
              <span className="text-gray-500 text-xs">this year</span>
            </div>
            <motion.div
              className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
            >
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: platform.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(platform.followers / 5.2) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 + index * 0.2 }}
              />
            </motion.div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function AnimatedCounter({ value, label, icon }: { value: number; label: string; icon?: React.ReactNode }) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  useEffect(() => {
    if (!isInView || value === 0) return;
    let current = 0;
    const increment = value / 80;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) { setDisplayValue(value); clearInterval(timer); }
      else { setDisplayValue(Math.floor(current)); }
    }, 20);
    return () => clearInterval(timer);
  }, [value, isInView]);
  const format = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : n.toLocaleString();
  return (
    <motion.div ref={ref} variants={scaleIn} className="text-center group">
      <div className="relative">
        {icon && <div className="text-gray-500 mb-2 flex justify-center group-hover:text-[#FFB21A] transition-colors">{icon}</div>}
        <div className="text-4xl md:text-6xl font-bold text-[#FFB21A] glow-text tabular-nums">{format(displayValue)}</div>
      </div>
      <div className="text-sm text-gray-400 uppercase tracking-widest mt-3">{label}</div>
    </motion.div>
  );
}

function MemberCard({ member, index, followerData }: { member: typeof MEMBERS[0]; index: number; followerData: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const initials = member.name.split(" ").map((n: string) => n[0]).join("");

  const memberStats = followerData?.members?.find((m: any) =>
    m.name.toLowerCase() === member.name.toLowerCase() ||
    member.handle.toLowerCase().includes(m.name.toLowerCase())
  );

  const formatNum = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(0) + "K" : n?.toLocaleString() || "0";

  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50, rotateY: -15 }} animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -12, scale: 1.02, rotateY: 5 }} className="member-card bg-[#0f0f0f] p-8 relative overflow-hidden group cursor-pointer perspective-1000" style={{ borderColor: member.color, transformStyle: "preserve-3d" }}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 50% 0%, ${member.color}20, transparent 70%)` }}
      />
      <div className="relative z-10">
        <motion.div className="flex justify-center mb-6" whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.4 }}>
          <div className="w-28 h-28 border-4 flex items-center justify-center text-3xl font-bold relative" style={{ borderColor: member.color, boxShadow: `6px 6px 0 ${member.accent}`, backgroundColor: "#1a1a1a", color: member.color }}>
            {initials}
            <motion.div
              className="absolute inset-0 border-4"
              style={{ borderColor: member.color }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
        <div className="text-center mb-4">
          <h3 className="text-2xl font-bold tracking-wide" style={{ color: member.color }}>{member.name}</h3>
          <p className="text-gray-400 text-sm mt-1">{member.handle}</p>
          <p className="text-gray-600 text-xs mt-2 uppercase tracking-widest">{member.role}</p>
          <p className="text-gray-500 text-sm mt-3 leading-relaxed">{member.bio}</p>
        </div>

        {memberStats && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-800">
            {memberStats.tiktok > 0 && (
              <div className="text-center">
                <TikTokIcon className="w-4 h-4 mx-auto text-gray-500" />
                <p className="text-xs font-bold text-[#FFB21A] mt-1">{formatNum(memberStats.tiktok)}</p>
              </div>
            )}
            {memberStats.youtube > 0 && (
              <div className="text-center">
                <YouTubeIcon className="w-4 h-4 mx-auto text-gray-500" />
                <p className="text-xs font-bold text-[#FF0000] mt-1">{formatNum(memberStats.youtube)}</p>
              </div>
            )}
            {memberStats.instagram > 0 && (
              <div className="text-center">
                <InstagramIcon className="w-4 h-4 mx-auto text-gray-500" />
                <p className="text-xs font-bold text-[#C81E2A] mt-1">{formatNum(memberStats.instagram)}</p>
              </div>
            )}
          </motion.div>
        )}

        <div className="flex justify-center gap-4 mt-6">
          {member.socials.tiktok && <motion.a href={member.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FFB21A] p-2 rounded-lg transition-all" whileHover={{ scale: 1.2, y: -2 }}><TikTokIcon /></motion.a>}
          {member.socials.instagram && <motion.a href={member.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#C81E2A] p-2 rounded-lg transition-all" whileHover={{ scale: 1.2, y: -2 }}><InstagramIcon /></motion.a>}
          {member.socials.youtube && <motion.a href={member.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] p-2 rounded-lg transition-all" whileHover={{ scale: 1.2, y: -2 }}><YouTubeIcon /></motion.a>}
        </div>
      </div>
    </motion.div>
  );
}

function MarqueeText() {
  return (
    <div className="overflow-hidden py-6 bg-[#FFB21A] relative">
      <motion.div className="flex whitespace-nowrap" animate={{ x: [0, -1920] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
        {[...Array(10)].map((_, i) => (<span key={i} className="text-2xl md:text-4xl font-bold text-black mx-8 tracking-widest">DO EVERYTHING REALLY FUN<span className="mx-8 text-[#C81E2A]">★</span></span>))}
      </motion.div>
    </div>
  );
}

function ContentCard({ title, platform, link, color, delay }: { title: string; platform: string; link: string; color: string; delay: number }) {
  return (
    <motion.a href={link} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} whileHover={{ scale: 1.05, y: -5 }} className="retro-border bg-[#0f0f0f] p-8 text-center flex flex-col items-center group relative overflow-hidden scan-hover">
      <div className="relative z-10">
        {platform === "tiktok" && <TikTokIcon className="w-10 h-10" />}
        {platform === "youtube" && <YouTubeIcon className="w-10 h-10" />}
        {platform === "instagram" && <InstagramIcon className="w-10 h-10" />}
        <p className="mt-4 font-bold text-lg" style={{ color }}>{title}</p>
        <p className="text-gray-500 text-sm mt-2 uppercase tracking-widest">Watch Now</p>
      </div>
    </motion.a>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <motion.h2 variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className="text-5xl md:text-8xl font-bold text-center mb-16 text-3d">{children}</motion.h2>;
}

function VideoCard({ videoSrc, title, delay }: { videoSrc: string; title: string; delay: number }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) { videoRef.current.pause(); } else { videoRef.current.play(); }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }} className="retro-border bg-[#0f0f0f] overflow-hidden group cursor-pointer relative" onClick={handlePlay}>
      <div className="relative aspect-video">
        <video ref={videoRef} src={videoSrc} className="w-full h-full object-cover" loop muted playsInline />
        <AnimatePresence>
          {!isPlaying && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <motion.div whileHover={{ scale: 1.1 }} className="w-20 h-20 rounded-full bg-[#FFB21A] flex items-center justify-center text-black">
                <PlayIcon />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-white">{title}</h3>
      </div>
    </motion.div>
  );
}

function TestimonialCard({ testimonial, index }: { testimonial: typeof TESTIMONIALS[0]; index: number }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30, rotateX: 15 }} whileInView={{ opacity: 1, y: 0, rotateX: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} whileHover={{ y: -5, boxShadow: "0 20px 40px rgba(255,178,26,0.2)" }} className="glass p-8 relative group">
      <motion.div className="text-6xl text-[#FFB21A] opacity-30 absolute top-4 left-4" animate={{ y: [0, -5, 0], rotate: [-5, 5, -5] }} transition={{ duration: 4, repeat: Infinity }}>"</motion.div>
      <p className="text-lg text-gray-300 italic mb-6 relative z-10 pt-8">{testimonial.quote}</p>
      <div className="border-t border-gray-700 pt-4">
        <p className="font-bold text-[#FFB21A]">{testimonial.author}</p>
        <p className="text-sm text-gray-500">{testimonial.role}</p>
      </div>
    </motion.div>
  );
}

function MilestoneTimeline() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#FFB21A] via-[#C81E2A] to-[#FFB21A] hidden md:block" />
      <div className="space-y-12">
        {MILESTONES.map((milestone, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`flex items-center gap-8 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:text-left text-center`}
          >
            <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="retro-border bg-[#0f0f0f] p-6 inline-block"
              >
                <span className="text-4xl mb-2 block">{milestone.icon}</span>
                <span className="text-[#FFB21A] text-sm font-bold">{milestone.year}</span>
                <h3 className="text-2xl font-bold text-white mt-1">{milestone.title}</h3>
                <p className="text-gray-400 mt-2">{milestone.description}</p>
              </motion.div>
            </div>
            <motion.div
              className="w-6 h-6 bg-[#FFB21A] rounded-full border-4 border-[#0a0a0a] z-10 hidden md:block"
              whileHover={{ scale: 1.5 }}
              animate={{ boxShadow: ["0 0 0 0 rgba(255,178,26,0.4)", "0 0 0 10px rgba(255,178,26,0)", "0 0 0 0 rgba(255,178,26,0)"] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <div className="flex-1 hidden md:block" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function BrandPartners() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {BRAND_PARTNERS.map((brand, index) => (
        <motion.div
          key={brand.name}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.05 }}
          whileHover={{ scale: 1.05, borderColor: "#FFB21A" }}
          className="border-2 border-gray-800 bg-[#0f0f0f] p-6 text-center group cursor-pointer transition-colors"
        >
          <p className="font-bold text-white group-hover:text-[#FFB21A] transition-colors">{brand.name}</p>
          <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{brand.category}</p>
        </motion.div>
      ))}
    </div>
  );
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {FAQ_ITEMS.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="border-2 border-gray-800 bg-[#0f0f0f] overflow-hidden"
        >
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-[#1a1a1a] transition-colors"
          >
            <span className="font-bold text-white text-lg">{item.question}</span>
            <motion.div
              animate={{ rotate: openIndex === index ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-[#FFB21A]"
            >
              <ChevronDown />
            </motion.div>
          </button>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-gray-800 pt-4">
                  {item.answer}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}

function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="retro-border bg-[#0f0f0f] p-8 md:p-12 text-center relative overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 opacity-10"
        style={{ backgroundImage: "linear-gradient(45deg, #FFB21A 25%, transparent 25%, transparent 75%, #FFB21A 75%, #FFB21A), linear-gradient(45deg, #FFB21A 25%, transparent 25%, transparent 75%, #FFB21A 75%, #FFB21A)", backgroundSize: "20px 20px", backgroundPosition: "0 0, 10px 10px" }}
      />
      <div className="relative z-10">
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-5xl mb-4"
        >
          📬
        </motion.div>
        <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Join The DERF Fam</h3>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">Be the first to know about new content, merch drops, and exclusive behind-the-scenes stuff.</p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="flex-1 bg-[#1a1a1a] border-2 border-gray-700 p-4 text-white focus:border-[#FFB21A] outline-none transition-colors"
            required
          />
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="arcade-btn whitespace-nowrap flex items-center justify-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status === "loading" ? (
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" />
            ) : status === "success" ? (
              "Subscribed! ✓"
            ) : (
              <>Subscribe <MailIcon /></>
            )}
          </motion.button>
        </form>

        <p className="text-gray-600 text-xs mt-4">No spam, ever. Unsubscribe anytime.</p>
      </div>
    </motion.div>
  );
}

function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(formData) });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Failed to send message. Please try again.");
    }
  };

  return (
    <motion.form onSubmit={handleSubmit} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Name</label>
          <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required className="w-full bg-[#1a1a1a] border-2 border-gray-700 p-4 text-white focus:border-[#FFB21A] outline-none transition-colors" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Email</label>
          <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required className="w-full bg-[#1a1a1a] border-2 border-gray-700 p-4 text-white focus:border-[#FFB21A] outline-none transition-colors" placeholder="your@email.com" />
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Subject</label>
        <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="w-full bg-[#1a1a1a] border-2 border-gray-700 p-4 text-white focus:border-[#FFB21A] outline-none transition-colors" placeholder="What's this about?" />
      </div>
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2 uppercase tracking-wider">Message</label>
        <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} required rows={5} className="w-full bg-[#1a1a1a] border-2 border-gray-700 p-4 text-white focus:border-[#FFB21A] outline-none transition-colors resize-none" placeholder="Your message..." />
      </div>

      <motion.button type="submit" disabled={status === "loading"} className="arcade-btn w-full flex items-center justify-center gap-3" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
        {status === "loading" ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-black border-t-transparent rounded-full" /> : <><SendIcon /> Send Message</>}
      </motion.button>

      <AnimatePresence>
        {status === "success" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-green-900/50 border border-green-500 text-green-400 text-center">Message sent successfully! We will get back to you soon.</motion.div>}
        {status === "error" && <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 p-4 bg-red-900/50 border border-red-500 text-red-400 text-center">{errorMessage}</motion.div>}
      </AnimatePresence>
    </motion.form>
  );
}

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/80 z-40 md:hidden" onClick={onClose} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "spring", damping: 20 }} className="fixed top-0 right-0 bottom-0 w-72 bg-[#0a0a0a] border-l-2 border-[#FFB21A] z-50 md:hidden">
            <div className="p-6">
              <button onClick={onClose} className="absolute top-6 right-6 text-white"><CloseIcon /></button>
              <div className="mt-12 flex flex-col gap-6">
                {["about", "team", "content", "milestones", "partners", "faq", "contact"].map((item) => (
                  <motion.a key={item} href={`#${item}`} onClick={onClose} whileHover={{ x: 10, color: "#FFB21A" }} className="text-2xl font-bold uppercase tracking-wider text-white">{item}</motion.a>
                ))}
              </div>
              <motion.a href="#contact" onClick={onClose} className="arcade-btn mt-8 text-center block" whileHover={{ scale: 1.05 }}>Contact Us</motion.a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  const [followerData, setFollowerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const heroRef = useRef(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const fetchFollowers = useCallback(async () => {
    try { const r = await fetch("/api/followers"); const d = await r.json(); if (d.success) setFollowerData(d); }
    catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { fetchFollowers(); const interval = setInterval(fetchFollowers, 300000); return () => clearInterval(interval); }, [fetchFollowers]);
  useEffect(() => { if (videoRef.current) { videoRef.current.play().catch(() => {}); } }, [showContent]);

  const fmt = (n: number) => n >= 1e6 ? (n / 1e6).toFixed(1) + "M" : n >= 1e3 ? (n / 1e3).toFixed(1) + "K" : n.toLocaleString();

  return (
    <>
      <AnimatePresence>
        {!showContent && <LoadingScreen onComplete={() => setShowContent(true)} />}
      </AnimatePresence>

      {showContent && (
        <div className="min-h-screen bg-[#0a0a0a] overflow-x-hidden">
          <ScrollProgress />
          <CursorTrail />
          <BackToTop />
          <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />

          <motion.header initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border-b-2 border-[#FFB21A]">
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
              <motion.div className="flex flex-col" whileHover={{ scale: 1.05 }}>
                <span className="text-xs text-gray-500 uppercase tracking-widest">Total Followers</span>
                <span className="text-2xl md:text-3xl font-bold text-[#FFB21A] glow-text tabular-nums">{isLoading ? "..." : followerData?.totals?.total ? fmt(followerData.totals.total) : "..."}</span>
              </motion.div>
              <motion.a href="#" className="text-xl md:text-2xl font-bold tracking-widest" whileHover={{ scale: 1.05 }}>
                <span className="text-[#FFB21A]">THE</span> <span className="text-white">DERF</span> <span className="text-[#C81E2A]">BOYS</span>
              </motion.a>
              <nav className="hidden md:flex items-center gap-6">
                {["about", "team", "content", "contact"].map((item, i) => (
                  <motion.a key={item} href={`#${item}`} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} whileHover={{ y: -2, color: "#FFB21A" }} className="text-gray-300 uppercase text-sm tracking-wide">{item}</motion.a>
                ))}
                <motion.a href="#contact" className="arcade-btn text-sm py-2 px-4" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Contact</motion.a>
              </nav>
              <button className="md:hidden text-white p-2" onClick={() => setMobileMenuOpen(true)}><MenuIcon /></button>
            </div>
          </motion.header>

          <section ref={heroRef} className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
            <motion.div style={{ scale: videoScale }} className="absolute inset-0 z-0">
              <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover opacity-30">
                <source src="/media/videos/hero-video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-transparent to-[#0a0a0a]" />
            </motion.div>

            <div className="absolute inset-0 z-[1]">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                  <ParticleField />
                </Canvas>
              </Suspense>
            </div>

            <div className="absolute inset-0 opacity-10 z-[2]" style={{ backgroundImage: "linear-gradient(#FFB21A 1px, transparent 1px), linear-gradient(90deg, #FFB21A 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
            <motion.div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FFB21A]/20 rounded-full blur-3xl z-[2]" animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }} transition={{ duration: 4, repeat: Infinity }} />
            <motion.div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#C81E2A]/20 rounded-full blur-3xl z-[2]" animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.2, 0.3] }} transition={{ duration: 4, repeat: Infinity, delay: 2 }} />

            <motion.div style={{ y: heroY, opacity: heroOpacity }} className="relative z-10 text-center px-4 max-w-5xl mx-auto">
              <motion.div initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                <h1 className="text-7xl md:text-[11rem] font-bold tracking-tighter leading-none mb-8">
                  <motion.span className="text-[#FFB21A] inline-block" style={{ textShadow: "2px 2px 0 #000, 4px 4px 0 #000, 6px 6px 0 rgba(255,178,26,0.4), 8px 8px 30px rgba(255,178,26,0.5)" }} animate={{ textShadow: ["8px 8px 30px rgba(255,178,26,0.5)", "8px 8px 50px rgba(255,178,26,0.8)", "8px 8px 30px rgba(255,178,26,0.5)"] }} transition={{ duration: 2, repeat: Infinity }}>THE</motion.span><br />
                  <motion.span className="text-white inline-block glitch-text" style={{ textShadow: "3px 3px 0 #C81E2A, 6px 6px 0 rgba(200,30,42,0.5), 9px 9px 0 rgba(0,0,0,0.5), 12px 12px 40px rgba(0,0,0,0.5)" }}>DERF BOYS</motion.span>
                </h1>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.6 }} className="text-xl md:text-3xl text-gray-300 mb-12 tracking-widest uppercase">Do Everything Really Fun</motion.p>

              <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="grid grid-cols-3 gap-8 mb-12 max-w-3xl mx-auto">
                <AnimatedCounter value={followerData?.totals?.tiktok || 0} label="TikTok" icon={<TikTokIcon />} />
                <AnimatedCounter value={followerData?.totals?.youtube || 0} label="YouTube" icon={<YouTubeIcon />} />
                <AnimatedCounter value={followerData?.totals?.instagram || 0} label="Instagram" icon={<InstagramIcon />} />
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a href="#team" className="arcade-btn" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Meet The Boys</motion.a>
                <motion.a href="#content" className="arcade-btn arcade-btn-red" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Watch Now</motion.a>
              </motion.div>
            </motion.div>

            <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10" animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <div className="w-6 h-10 border-2 border-[#FFB21A] rounded-full flex justify-center pt-2">
                <motion.div className="w-1.5 h-3 bg-[#FFB21A] rounded-full" animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
              </div>
            </motion.div>
          </section>

          <MarqueeText />

          <LiveStatsTicker followerData={followerData} />

          <section id="about" className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <SectionTitle><span className="text-[#FFB21A]">ABOUT</span> <span className="text-white">US</span></SectionTitle>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative group">
                  <div className="retro-border overflow-hidden">
                    <motion.img src="/media/images/group-photo.jpg" alt="The Derf Boys" className="w-full h-auto object-cover" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }} />
                  </div>
                  <motion.div className="absolute -bottom-6 -right-6 bg-[#FFB21A] text-black p-4 font-bold text-xl" initial={{ rotate: -5 }} whileHover={{ rotate: 0, scale: 1.05 }}>EST. 2024</motion.div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
                  <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8">The Derf Boys are a collective of content creators who believe life should be fun. From viral TikToks to YouTube bangers, we bring the energy, the laughs, and the content you did not know you needed.</p>
                  <p className="text-lg text-gray-400 leading-relaxed mb-8">With millions of followers across all platforms, we are building something special. Join the movement and become part of the DERF family.</p>
                  <motion.a href="#team" className="arcade-btn inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Meet The Team</motion.a>
                </motion.div>
              </div>

              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { label: "Founded", value: "2024" },
                  { label: "Members", value: "4" },
                  { label: "Combined Followers", value: followerData?.totals?.total ? fmt(followerData.totals.total) : "8M+" },
                  { label: "Vibes", value: "100%" }
                ].map((stat, i) => (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -5, borderColor: "#FFB21A" }} className="retro-border bg-[#0f0f0f] p-6 scan-hover cursor-pointer transition-colors">
                    <div className="text-3xl font-bold text-[#FFB21A]">{stat.value}</div>
                    <div className="text-sm text-gray-500 uppercase tracking-widest mt-2">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="team" className="py-32 px-4 bg-[#0f0f0f]">
            <div className="max-w-7xl mx-auto">
              <SectionTitle><span className="text-white">MEET</span> <span className="text-[#C81E2A]">THE BOYS</span></SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {MEMBERS.map((member, index) => <MemberCard key={member.handle} member={member} index={index} followerData={followerData} />)}
              </div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="content" className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <SectionTitle><span className="text-[#FFB21A]">LATEST</span> <span className="text-white">CONTENT</span></SectionTitle>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <VideoCard videoSrc="/media/videos/video1.mp4" title="Behind The Scenes" delay={0} />
                <VideoCard videoSrc="/media/videos/video2.mp4" title="Best Moments" delay={0.1} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <ContentCard title="JGGLS" platform="tiktok" link="https://www.tiktok.com/@jggls" color="#FFB21A" delay={0} />
                <ContentCard title="JVHN SEO" platform="tiktok" link="https://www.tiktok.com/@jvhnseo" color="#C81E2A" delay={0.1} />
                <ContentCard title="HUDDY" platform="tiktok" link="https://www.tiktok.com/@huddy_lg" color="#FFB21A" delay={0.2} />
                <ContentCard title="BRANDON" platform="tiktok" link="https://www.tiktok.com/@djfashionkill" color="#C81E2A" delay={0.3} />
              </div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4">
                <motion.a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer" className="arcade-btn flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><YouTubeIcon /> YouTube</motion.a>
                <motion.a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer" className="arcade-btn arcade-btn-red flex items-center gap-2" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}><InstagramIcon /> Instagram</motion.a>
              </motion.div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="milestones" className="py-32 px-4 bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto">
              <SectionTitle><span className="text-white">OUR</span> <span className="text-[#FFB21A]">JOURNEY</span></SectionTitle>
              <MilestoneTimeline />
            </div>
          </section>

          <div className="section-divider" />

          <section className="py-32 px-4">
            <div className="max-w-4xl mx-auto">
              <NewsletterSignup />
            </div>
          </section>

          <div className="section-divider" />

          <section id="testimonials" className="py-32 px-4 bg-[#0f0f0f]">
            <div className="max-w-6xl mx-auto">
              <SectionTitle><span className="text-white">WHAT</span> <span className="text-[#FFB21A]">PEOPLE SAY</span></SectionTitle>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {TESTIMONIALS.map((testimonial, index) => <TestimonialCard key={index} testimonial={testimonial} index={index} />)}
              </div>
            </div>
          </section>

          <div className="section-divider" />

          <section id="partners" className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <SectionTitle><span className="text-[#FFB21A]">BRAND</span> <span className="text-white">PARTNERS</span></SectionTitle>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">We have partnered with some amazing brands. Want to join the list? Let us talk!</motion.p>
              <BrandPartners />
            </div>
          </section>

          <div className="section-divider" />

          <section id="stats" className="py-32 px-4">
            <div className="max-w-6xl mx-auto">
              <SectionTitle><span className="text-[#FFB21A]">BY THE</span> <span className="text-white">NUMBERS</span></SectionTitle>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Our combined reach across all platforms continues to grow every day.</motion.p>
              <StatsComparison />
            </div>
          </section>

          <div className="section-divider" />

          <section id="media-kit" className="py-32 px-4 bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto">
              <SectionTitle><span className="text-white">MEDIA</span> <span className="text-[#FFB21A]">KIT</span></SectionTitle>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">Everything you need for press coverage, sponsorships, and collaborations.</motion.p>
              <MediaKitSection />
            </div>
          </section>

          <div className="section-divider" />

          <section id="faq" className="py-32 px-4">
            <div className="max-w-4xl mx-auto">
              <SectionTitle><span className="text-white">GOT</span> <span className="text-[#C81E2A]">QUESTIONS?</span></SectionTitle>
              <FAQAccordion />
            </div>
          </section>

          <div className="section-divider" />

          <section id="contact" className="py-32 px-4 bg-[#0f0f0f]">
            <div className="max-w-4xl mx-auto">
              <SectionTitle><span className="text-white">GET IN</span> <span className="text-[#C81E2A]">TOUCH</span></SectionTitle>
              <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-xl text-gray-300 mb-12 text-center">For business inquiries, collaborations, or just to say what is up - hit us up.</motion.p>

              <ContactForm />

              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
                <p className="text-gray-500 mb-4">Or reach us directly at</p>
                <motion.a href="mailto:derfboys@gmail.com" className="text-[#FFB21A] text-xl hover:underline" whileHover={{ scale: 1.05 }}>derfboys@gmail.com</motion.a>
              </motion.div>
            </div>
          </section>

          <footer className="border-t-2 border-[#FFB21A] pt-20 pb-8 px-4 bg-[#0a0a0a]">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                <div>
                  <motion.a href="#" className="text-2xl font-bold tracking-widest inline-block mb-6" whileHover={{ scale: 1.05 }}>
                    <span className="text-[#FFB21A]">THE</span> <span className="text-white">DERF</span> <span className="text-[#C81E2A]">BOYS</span>
                  </motion.a>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">Four creators, one mission: Do Everything Really Fun. Join the movement.</p>
                  <div className="flex gap-4">
                    <motion.a href="https://www.tiktok.com/@jggls" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#FFB21A] hover:text-black transition-colors" whileHover={{ scale: 1.1 }}><TikTokIcon /></motion.a>
                    <motion.a href="https://www.instagram.com/_jggls_/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#C81E2A] hover:text-white transition-colors" whileHover={{ scale: 1.1 }}><InstagramIcon /></motion.a>
                    <motion.a href="https://www.youtube.com/@jgglsofficial" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:bg-[#FF0000] hover:text-white transition-colors" whileHover={{ scale: 1.1 }}><YouTubeIcon /></motion.a>
                  </div>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-6">Quick Links</h4>
                  <ul className="space-y-3">
                    {["About", "Team", "Content", "Milestones"].map((link) => (
                      <li key={link}>
                        <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-[#FFB21A] transition-colors text-sm">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-6">Resources</h4>
                  <ul className="space-y-3">
                    {["Media Kit", "Brand Partners", "FAQ", "Contact"].map((link) => (
                      <li key={link}>
                        <a href={`#${link.toLowerCase().replace(" ", "-")}`} className="text-gray-400 hover:text-[#FFB21A] transition-colors text-sm">{link}</a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="text-white font-bold uppercase tracking-wider mb-6">Contact</h4>
                  <ul className="space-y-3 text-sm">
                    <li>
                      <span className="text-gray-500">Business:</span>
                      <a href="mailto:derfboys@gmail.com" className="text-[#FFB21A] hover:underline ml-2">derfboys@gmail.com</a>
                    </li>
                    <li>
                      <span className="text-gray-500">Management:</span>
                      <span className="text-gray-400 ml-2">Contact via form</span>
                    </li>
                    <li>
                      <span className="text-gray-500">Press:</span>
                      <span className="text-gray-400 ml-2">See Media Kit</span>
                    </li>
                  </ul>
                  <motion.a href="#contact" className="arcade-btn text-xs py-2 px-4 mt-6 inline-block" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Get In Touch</motion.a>
                </div>
              </div>

              <div className="border-t border-gray-800 pt-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <p className="text-gray-600 text-sm">&copy; {new Date().getFullYear()} The Derf Boys. All rights reserved. Do Everything Really Fun.</p>
                  <div className="flex flex-wrap justify-center gap-6 text-sm">
                    <a href="#" className="text-gray-500 hover:text-[#FFB21A] transition-colors">Privacy Policy</a>
                    <a href="#" className="text-gray-500 hover:text-[#FFB21A] transition-colors">Terms of Service</a>
                    <a href="#" className="text-gray-500 hover:text-[#FFB21A] transition-colors">Cookie Policy</a>
                  </div>
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className="text-center text-gray-700 text-xs mt-8"
                >
                  Made with 💛 by The Derf Boys Team
                </motion.p>
              </div>
            </div>
          </footer>
        </div>
      )}
    </>
  );
}
