"use client";
import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const MEMBERS = [
  {
    name: "JGGLS",
    handle: "@jggls",
    socials: {
      tiktok: "https://www.tiktok.com/@jggls",
      instagram: "https://www.instagram.com/_jggls_/",
      youtube: "https://www.youtube.com/@jgglsofficial"
    }
  },
  {
    name: "HUDDY",
    handle: "@huddy_lg",
    socials: {
      tiktok: "https://www.tiktok.com/@huddy_lg",
      instagram: "https://www.instagram.com/huddy_lg/",
      youtube: "https://www.youtube.com/@Huddy_lg"
    }
  },
  {
    name: "JVHN SEO",
    handle: "@jvhnseo",
    socials: {
      tiktok: "https://www.tiktok.com/@jvhnseo",
      instagram: "https://www.instagram.com/jvhnseo/",
      youtube: "https://www.youtube.com/@JvhnSeo"
    }
  },
  {
    name: "BRANDON",
    handle: "@djfashionkill",
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
              className="group inline-flex items-center justify-center gap-3 bg-yellow-400 text-black px-8 py-4 font-bold uppercase tracking-wider hover:bg-yellow-300 transition-colors duration-300"
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

      {/* Stats Bar */}
      {followerData && (
        <section className="py-16 bg-neutral-950 border-y border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={stagger}
            >
              {[
                { label: 'Total Followers', value: followerData.totals?.total },
                { label: 'TikTok', value: followerData.totals?.tiktok },
                { label: 'YouTube', value: followerData.totals?.youtube },
                { label: 'Instagram', value: followerData.totals?.instagram },
              ].map((stat) => (
                <motion.div key={stat.label} variants={fadeUp} className="text-center">
                  <div
                    className="text-5xl md:text-6xl text-yellow-400 mb-2"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {formatNumber(stat.value || 0)}
                  </div>
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-widest">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Content Section */}
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
              Follow us across all platforms
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                platform: 'YouTube',
                icon: YouTubeIcon,
                handle: '@jgglsofficial',
                link: 'https://www.youtube.com/@jgglsofficial',
                color: 'from-red-600 to-red-700',
                cta: 'Subscribe'
              },
              {
                platform: 'TikTok',
                icon: TikTokIcon,
                handle: '@jggls',
                link: 'https://www.tiktok.com/@jggls',
                color: 'from-pink-500 to-violet-600',
                cta: 'Follow'
              },
              {
                platform: 'Instagram',
                icon: InstagramIcon,
                handle: '@derfboys',
                link: 'https://www.instagram.com/derfboys/',
                color: 'from-orange-500 to-pink-600',
                cta: 'Follow'
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
                className={`relative aspect-[4/3] rounded-2xl overflow-hidden group bg-gradient-to-br ${platform.color} p-8 flex flex-col justify-between`}
              >
                <div className="flex items-center justify-between">
                  <platform.icon className="w-10 h-10 text-white" />
                  <ArrowIcon className="w-6 h-6 text-white/60 group-hover:translate-x-1 group-hover:text-white transition-all" />
                </div>
                <div>
                  <h3
                    className="text-4xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {platform.platform}
                  </h3>
                  <p className="text-white/70 text-sm">{platform.handle}</p>
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-neutral-950">
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
            {MEMBERS.map((member, index) => (
              <motion.div
                key={member.handle}
                variants={fadeUp}
                className="group"
              >
                <div className="bg-neutral-900 rounded-2xl p-8 h-full border border-white/5 hover:border-yellow-400/30 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center mb-6">
                    <span
                      className="text-4xl text-black"
                      style={{ fontFamily: 'var(--font-heading)' }}
                    >
                      {member.name[0]}
                    </span>
                  </div>
                  <h3
                    className="text-3xl text-white mb-1"
                    style={{ fontFamily: 'var(--font-heading)' }}
                  >
                    {member.name}
                  </h3>
                  <p className="text-white/40 text-sm mb-6">{member.handle}</p>
                  <div className="flex gap-3">
                    {member.socials.tiktok && (
                      <a
                        href={member.socials.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                      >
                        <TikTokIcon className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                      >
                        <InstagramIcon className="w-5 h-5" />
                      </a>
                    )}
                    {member.socials.youtube && (
                      <a
                        href={member.socials.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-yellow-400 hover:text-black transition-all duration-300"
                      >
                        <YouTubeIcon className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-yellow-400">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2
              className="text-6xl md:text-8xl text-black mb-6"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              LET'S WORK TOGETHER
            </h2>
            <p className="text-xl text-black/70 mb-10">
              For business inquiries, collaborations, and sponsorships
            </p>
            <a
              href="mailto:derfboys@gmail.com"
              className="inline-flex items-center gap-3 bg-black text-white px-10 py-5 font-bold text-lg uppercase tracking-wider hover:bg-neutral-900 transition-colors duration-300"
            >
              derfboys@gmail.com
            </a>
          </motion.div>
        </div>
      </section>

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
