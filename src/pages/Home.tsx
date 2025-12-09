
// Example SVGs for illustration
const CodeSVG = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="16" fill="#164e63"/>
    <text x="40" y="48" textAnchor="middle" fontSize="32" fill="#67e8f9">{`</>`}</text>
  </svg>
);
const DesignSVG = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="16" fill="#1e293b"/>
    <circle cx="40" cy="40" r="24" fill="#06b6d4"/>
    <rect x="24" y="24" width="32" height="32" rx="8" fill="#f0fdfa"/>
  </svg>
);
const ShieldSVG = (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <rect width="80" height="80" rx="16" fill="#0f172a"/>
    <path d="M40 16L64 28V44C64 56 52 64 40 64C28 64 16 56 16 44V28L40 16Z" fill="#67e8f9"/>
  </svg>
);

const sellingPoints = [
  {
    icon: "⚡",
    image: CodeSVG,
    title: "Lightning Fast Setup",
    description: "Get your project online in minutes. Our templates come with easy-to-follow guides and instant deployment options.",
    details: "No more wrestling with boilerplate code. Just pick a template, customize, and launch. Perfect for startups, hackathons, and MVPs.",
    reverse: false,
  },
  {
    icon: "🎨",
    image: DesignSVG,
    title: "Modern Designs",
    description: "Impress your users with beautiful, responsive layouts crafted for today's standards.",
    details: "Every template is built with accessibility and mobile-first principles. Customize colors, fonts, and layouts to match your brand.",
    reverse: true,
  },
  {
    icon: "🔒",
    image: ShieldSVG,
    title: "Secure & Reliable",
    description: "Templates follow best practices for security and performance, so you can focus on your idea.",
    details: "Automatic updates, built-in authentication, and optimized assets keep your project safe and fast.",
    reverse: false,
  },
];

const Home = () => (
  <div className="min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-gray-800 via-gray-900 to-black">
    <div className="container-max py-20 flex flex-col items-center text-center">
      <h1 className="text-5xl font-extrabold text-gray-100 mb-6 drop-shadow-[0_4px_24px_rgba(6,182,212,0.15)]">
        Kickstartr
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-xl">
        Discover, customize, and launch your next project with premium templates.
      </p>
      <div className="flex gap-4 mb-12">
        <a href="/catalog" className="btn btn-primary text-lg px-6 py-3 shadow-md">
          Browse Catalog
        </a>
        <a href="/register" className="btn btn-outline text-lg px-6 py-3 shadow-md">
          Get Started
        </a>
      </div>

      {/* Zig-Zag Selling Points Section */}
      <section className="w-full max-w-4xl mb-12">
        <h2 className="text-3xl font-bold text-cyan-400 mb-10">Why Choose Kickstartr Templates?</h2>
        <div className="flex flex-col gap-10">
          {sellingPoints.map((point, idx) => (
            <div
              key={point.title}
              className={`flex flex-col md:flex-row items-center bg-gray-900 rounded-xl shadow-lg p-8 ${
                point.reverse ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image/Icon Side */}
              <div className="flex-shrink-0 flex items-center justify-center w-32 h-32 rounded-xl bg-cyan-900/30 mb-6 md:mb-0">
                {point.image}
              </div>
              {/* Text Side */}
              <div className="md:w-3/4 md:px-8 text-left">
                <h3 className="text-2xl font-semibold text-gray-100 mb-2 flex items-center gap-2">
                  <span className="text-2xl">{point.icon}</span>
                  {point.title}
                </h3>
                <p className="text-gray-400 mb-2">{point.description}</p>
                <p className="text-gray-500 text-sm">{point.details}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Updates & News Section */}
      <section className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-cyan-400 mb-4">Updates & News</h2>
        <ul className="space-y-4 text-left">
          <li>
            <span className="text-cyan-300 font-semibold">June 2024:</span>
            <span className="text-gray-300 ml-2">New e-commerce template released! Try it out in the catalog.</span>
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">May 2024:</span>
            <span className="text-gray-300 ml-2">Kickstartr now supports dark mode and improved mobile layouts.</span>
          </li>
          <li>
            <span className="text-cyan-300 font-semibold">April 2024:</span>
            <span className="text-gray-300 ml-2">Community showcase launched—see what others are building!</span>
          </li>
        </ul>
      </section>
    </div>
  </div>
);

export default Home;
