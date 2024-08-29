import React, { useContext, useEffect } from 'react';
import CourseCard from './CourseCard';

import { FirebaseContext } from '../context/firebaseContext';
import {  ref,get , child} from "firebase/database";

const MainSection = () => {
  const [courses, setCourses] = React.useState([]);
  
  const usefirebase = useContext(FirebaseContext);
  const db = usefirebase.db;
  
  useEffect(() => {
    get(child(ref(db),`courses`)).then((snapshot)=>{
     setCourses(snapshot.val());
    })
    .catch((error)=>{console.log(error)});
  },[]);
  return (
    <main className="p-8 bg-gray-100">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Explore Our Courses</h1>
        <p className="text-lg text-gray-600 mb-8">Discover a range of courses designed to help you achieve your learning goals.</p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
          Browse All Courses
        </button>
      </section>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <CourseCard course={course} />
        ))}
      </section>
    </main>
  );
};

export default MainSection;
