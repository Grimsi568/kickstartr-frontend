
const Contact = () => (
  <div className="container-max py-16">
    <div className="card p-8 max-w-xl mx-auto flex flex-col gap-4">
      <h1 className="text-3xl font-extrabold text-cyan-400 mb-2 text-center">Contact</h1>
      <p className="text-gray-300 text-center">
        Have questions, feedback, or want to partner with us? Reach out below!
      </p>
      <form className="flex flex-col gap-4 mt-4">
        <input className="input" type="email" placeholder="Your email" />
        <textarea className="input" rows={4} placeholder="Your message" />
        <button className="btn btn-primary w-full">Send Message</button>
      </form>
      <div className="text-gray-400 text-center mt-4">
        Or email us at <a href="mailto:support@kickstartr.dev" className="text-cyan-400 underline">support@kickstartr.dev</a>
      </div>
    </div>
  </div>
);

export default Contact;
