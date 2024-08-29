import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/userContext';
import { FirebaseContext } from '../context/firebaseContext';
import { useNavigate } from 'react-router-dom';
import { ref, remove } from "firebase/database";

const Cart = () => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    
    const usefirebase = useContext(FirebaseContext);
    const db = usefirebase.db;
    const auth = usefirebase.auth;
    const useuser = useContext(UserContext);

    const navigate = useNavigate();

    const handleCartRemove = async (item) =>  {
        try {
            // Get the current user's UID
            const userId = auth.currentUser.uid;
            console.log(item)
        
            // Reference to the specific item in the user's cart
            const itemRef = ref(db, `users/${userId}/cart/${item.id}`);
        
            // Remove the item from Firebase Realtime Database
            await remove(itemRef);
        
            console.log(`Item with ID ${item.id} removed from cart successfully.`);
          } catch (error) {
            console.error("Error removing item from cart:", error);
          }
    };

    const handleCartBuy = () => {

        let id = [];
        let title = [];
        cartItems.forEach(item => {
            id.push(item.id);
            title.push(item.title);
        });
        console.log(id);
        console.log(title);
        let course = {
            id: id,
            title: title,
            description: 'Users can review the contents of their cart before proceeding to checkout.',
            price:  `${totalPrice}`,
        };
        
        alert(`Buying ${totalPrice}`);
        
        navigate('/buy', { state: { course} });
      };

    // Function to fetch cart data
    const fetchCartData = async () => {
        if (!useuser.userdata?.cart) return;

        // Assuming cart data is an object and converting it to an array
        const cart = Object.values(useuser.userdata.cart);
        setCartItems(cart);
    };

    useEffect(() => {
        fetchCartData();
    }, [useuser.userdata.cart]);

    useEffect(() => {
        const total = cartItems.reduce((acc, item) => {
            const priceNumber = typeof item.price === 'string' 
                ? parseFloat(item.price.replace(/[^0-9.]/g, ''))
                : item.price; // Handle numeric price directly
            return acc + priceNumber;
        }, 0);
        setTotalPrice(total);
    }, [cartItems]);

    if (!useuser.userdata?.cart) {
        return <p className="h-[50vh] flex justify-center items-center">Your cart is empty....</p>;
    }

    return (
        <div className="cart-container p-8">
            <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
            {cartItems.length > 0 ? (
                <>
                    <ul className="mb-4">
                        {cartItems.map((item, index) => (
                            <li key={index} className="border-b border-gray-200 py-4">
                                <span className="font-semibold">{item.title}</span> - {item.price}
                                <button onClick={() => {handleCartRemove(item)}} className="bg-red-500 text-white px-2 py-1 rounded-md ml-2">Remove</button>
                            </li>
                        ))}
                    </ul>
                    <div className="text-right font-semibold text-xl">
                        Total: ${totalPrice.toFixed(2)}
                    </div>
                    <button onClick={handleCartBuy} className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Proceed to Checkout
                    </button>
                </>
            ) : (
                <p className="h-screen flex justify-center items-center">Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
