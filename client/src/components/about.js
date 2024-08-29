import React from 'react';
import teamImage from '../assets/team.jpg'; // Ensure you have a team image in src/assets

const About = () => {
  return (
    <section className="bg-blue-50 py-12">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold mb-6">About Us</h2>
        <p className="text-lg text-gray-700 mb-8">
          Welcome to EdTech, your go-to platform for top-notch online learning experiences. Our goal is to provide
          accessible, high-quality education to learners around the world. Whether you're looking to upskill or start
          a new journey, we're here to support you every step of the way.
        </p>
        <div className="relative mb-12">
          <img src={teamImage} alt="Our Team" className="mx-auto w-full h-60 object-cover rounded-lg shadow-lg" />
          <div className="absolute inset-0 bg-black opacity-30 rounded-lg"></div>
          <div className="absolute inset-0 flex items-center justify-center text-center text-white px-6">
            <p className="text-xl font-semibold">
              Meet the passionate team dedicated to making education accessible to everyone.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
            <p className="text-gray-700">
              Our mission is to empower individuals through education by providing high-quality courses and resources that
              are accessible, affordable, and impactful.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
            <p className="text-gray-700">
              We envision a world where everyone has the opportunity to learn and grow, regardless of their location or
              background.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-2xl font-semibold mb-4">Our Values</h3>
            <p className="text-gray-700">
              We value integrity, innovation, and inclusivity. We are committed to delivering educational experiences that
              are ethical, cutting-edge, and welcoming to all.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
