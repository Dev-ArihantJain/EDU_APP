import React from 'react';

const Home = ({userdata}) => {
  return (
    <section id="home" className="bg-gray-100 py-12 ">
      <div className="container mx-auto px-6 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to EdTech</h1>
        <p className="text-xl mb-6">
          Hi, {userdata.name} Your one-stop platform for the best online courses. Learn, grow, and achieve your goals with our expertly curated content.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Expert Instructors</h2>
            <p className="text-gray-700">Learn from industry experts with years of experience and in-depth knowledge in their fields.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Flexible Learning</h2>
            <p className="text-gray-700">Access courses anytime, anywhere, and learn at your own pace with our flexible learning options.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Comprehensive Resources</h2>
            <p className="text-gray-700">Get access to a wide range of resources, including video lectures, assignments, and discussion forums.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Interactive Learning</h2>
            <p className="text-gray-700">Engage with interactive content and live sessions to enhance your learning experience.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Certification</h2>
            <p className="text-gray-700">Earn certificates upon completion of courses to showcase your skills and knowledge.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Community Support</h2>
            <p className="text-gray-700">Join a community of learners and get support from peers and instructors.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
