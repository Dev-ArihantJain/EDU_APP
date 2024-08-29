import React from 'react';
import Mainpay from './mainpay';
import { useLocation } from 'react-router-dom';

const BuyingPage = () => {
    const location = useLocation();
    const course = location.state?.course || {};
    let courseTitles = '';
    if (Array.isArray(course.id)){
        if (course.title.length === 1) {
          courseTitles = course.title[0];
        } else if (course.title.length === 2) {
          courseTitles = `${course.title[0]}, ${course.title[1]}`;
        } else if (course.title.length > 2) {
          courseTitles = `${course.title[0]}, ${course.title[1]} etc.`;
        }
    }
    else{
        courseTitles = course.title;
    }

  return (
    <div className="h-[75vh] bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Purchase Course   
        </h2>
        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {courseTitles}
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              {course.description}
            </p>
          </div>
          <div className="mb-4">
            <h4 className="text-md font-semibold text-gray-700">
              {course.price}
            </h4>
          </div>
          <div className="mt-6">
            {/* <button className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Buy Now
            </button> */}
            <Mainpay course={course}/>

          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyingPage;
