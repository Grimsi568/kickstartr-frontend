
const Contact = () => (
  <div className="container-max py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
    <div className="card p-5 sm:p-6 lg:p-8 max-w-xl mx-auto flex flex-col gap-3 sm:gap-4">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-cyan-400 mb-2 text-center">Contact</h1>
      <p className="text-sm sm:text-base text-gray-300 text-center">
        Have questions, feedback, or want to partner with us? Reach out below!
      </p>
      <form className="flex flex-col gap-3 sm:gap-4 mt-4">
        <input className="input text-sm sm:text-base" type="email" placeholder="Your email" />
        <textarea className="input text-sm sm:text-base" rows={4} placeholder="Your message" />
        <button className="btn btn-primary w-full text-sm sm:text-base py-2.5 sm:py-3">Send Message</button>
      </form>
      <div className="text-xs sm:text-sm text-gray-400 text-center mt-4">
        Or email us at <a href="mailto:support@kickstartr.dev" className="text-cyan-400 underline break-all">support@kickstartr.dev</a>
      </div>
    </div>
  </div>
);

export default Contact;
