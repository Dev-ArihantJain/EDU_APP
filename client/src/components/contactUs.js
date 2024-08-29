import React from 'react';

const ContactUs = () => {
  return (
    <section id="contact" className="bg-gray-100 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          We'd love to hear from you! Fill out the form below to get in touch.
        </p>
        <form className="max-w-lg mx-auto">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <textarea
              placeholder="Your Message"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none"
              rows="5"
            ></textarea>
          </div>
          <button
            type="submit" onClick={(e) => { e.preventDefault(); alert('message functionality goes here') }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactUs;
