import React from 'react';

const About = () => (
  <div className="container-max py-16">
    <div className="card p-8 max-w-2xl mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold text-cyan-400 mb-2 text-center">About Us</h1>
      <p className="text-gray-300 text-center">
        Kickstartr is dedicated to providing high-quality .NET templates for developers and teams. Our mission is to accelerate your project launches with proven architectures and best practices.
      </p>
      <p className="text-gray-400 text-center">
        All templates are curated and maintained by experienced .NET professionals. We believe in clean code, scalability, and developer happiness.
      </p>
      <div className="text-center text-gray-400 mt-4">
        <span className="badge">.NET</span>
        <span className="badge">Clean Architecture</span>
        <span className="badge">Open Source</span>
      </div>
    </div>
  </div>
);

export default About;
