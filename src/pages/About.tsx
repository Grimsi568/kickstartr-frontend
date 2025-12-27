
const About = () => (
  <div className="container-max py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
    <div className="card p-5 sm:p-6 lg:p-8 max-w-2xl mx-auto flex flex-col gap-3 sm:gap-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-2 text-center">About Us</h1>
      <p className="text-sm sm:text-base text-gray-300 text-center">
        Kickstartr is dedicated to providing high-quality .NET templates for developers and teams. Our mission is to accelerate your project launches with proven architectures and best practices.
      </p>
      <p className="text-sm sm:text-base text-gray-400 text-center">
        All templates are curated and maintained by experienced .NET professionals. We believe in clean code, scalability, and developer happiness.
      </p>
      <div className="text-center text-gray-400 mt-4 flex flex-wrap justify-center gap-2">
        <span className="badge text-xs sm:text-sm">.NET</span>
        <span className="badge text-xs sm:text-sm">Clean Architecture</span>
        <span className="badge text-xs sm:text-sm">Open Source</span>
      </div>
    </div>
  </div>
);

export default About;
