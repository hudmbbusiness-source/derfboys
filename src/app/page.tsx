export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-white tracking-tight">
          DERFBOYS
        </div>
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
          <a href="#services" className="text-gray-300 hover:text-white transition-colors">Services</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full font-medium transition-colors">
          Get Started
        </button>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-8 pt-20 pb-32">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Welcome to <span className="text-purple-400">Derfboys</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed">
            Building the future, one project at a time. We bring ideas to life with
            cutting-edge technology and creative solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors">
              Learn More
            </button>
            <button className="border-2 border-purple-400 text-purple-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-purple-400 hover:text-white transition-colors">
              Get in Touch
            </button>
          </div>
        </div>

        {/* Features Grid */}
        <div id="services" className="mt-32 grid md:grid-cols-3 gap-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Fast & Efficient</h3>
            <p className="text-gray-400">Lightning-fast solutions built with modern technology stacks.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Customizable</h3>
            <p className="text-gray-400">Tailored solutions that fit your unique needs and vision.</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10">
            <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Secure & Reliable</h3>
            <p className="text-gray-400">Built with security-first principles you can trust.</p>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="mt-32 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">About Us</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            We are a team passionate about technology and innovation.
            Our mission is to deliver exceptional digital experiences that help
            businesses grow and succeed in the modern world.
          </p>
        </div>

        {/* Contact Section */}
        <div id="contact" className="mt-32 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Get in Touch</h2>
          <p className="text-xl text-gray-300 mb-8">Ready to start your next project?</p>
          <a
            href="mailto:hello@derfboys.com"
            className="inline-block bg-purple-600 hover:bg-purple-700 text-white px-10 py-4 rounded-full font-semibold text-lg transition-colors"
          >
            Contact Us
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Derfboys. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
