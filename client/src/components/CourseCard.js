import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
// import { FirebaseContext } from '../context/firebaseContext';
import { get, child, ref, set } from "firebase/database";
import { FirebaseContext } from "../context/firebaseContext";

const CourseCard = ({ course }) => {
  const useuser = useContext(UserContext);
  const user = useuser?.user?.uid;
  const usefirebase = useContext(FirebaseContext);
  const db = usefirebase.db;

  const navigate = useNavigate();
  const handleBuy = () => {
    alert(`Buying ${course.title}`);
    navigate("/buy", { state: { course } });
  };
  const handleCart = () => {
    alert(`Adding ${course.title} to cart`);

    set(ref(db, "users/" + user + "/cart/" + course.id), {
      id: course.id, //course.id,
      title: course.title, //course.title,
      price: course.price, //course.price,
    })
      .then((result) => {
        console.log("data inserted successfully");
      })
      .catch((err) => {
        console.log("user login with error and data not inserted", err);
      });
  };

  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const purchaseIds = [];
    useuser.userdata.purchases?.forEach((purchase) => {
      purchaseIds.push(purchase.id);
    });

    setPurchases(purchaseIds);
  }, []);

  const isPurchased = purchases.includes(course.id);

  return (
    <div className="border rounded-lg p-6 bg-white shadow-lg transition-transform transform hover:scale-105">
      <h3 className="text-2xl font-semibold mb-2">{course.title}</h3>
      <p className="text-gray-700 mb-4">{course.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-bold text-blue-600">{course.price}</span>
        <div className="flex justify-between items-center space-x-2">

        {isPurchased ? (
            <button
              className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg transition duration-300"
              disabled
            >
              Purchased
            </button>
          ) : (
            <>
            <button
            onClick={handleBuy}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg transition duration-300"
            >
            Buy Now
          </button>
          <button
            onClick={handleCart}
            className="bg-green-600 hover:bg-green-700 text-white px-2 py-2 rounded-lg transition duration-300"
            >
            Add to Cart
          </button>
              </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
