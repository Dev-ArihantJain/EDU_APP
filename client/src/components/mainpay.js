import 'dotenv/config';
import React ,{useContext,useEffect}  from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { FirebaseContext } from '../context/firebaseContext';
import { get, child, ref, set, remove } from 'firebase/database';


function Mainpay( {course} ) {

    const clientId = process.env.REACT_APP_CLIENTPAYID
    const server_url = process.env.REACT_APP_SERVER_URL


    if (Array.isArray(course.id)){
        console.log("nice array h");
    }else{
        console.log("not an array");
        course.id = [course.id];
    }
        const purchaseIds = course.id;
        console.log("pid is",purchaseIds);
        console.log("cid is",course.id);
        console.log("1id is",purchaseIds[0]);
        const [allcourses, setAllcourses] = React.useState([]);
        const [loading, setLoading] = React.useState(true); // Loading state

    const useuser = useContext(UserContext);
    const usefirebase = useContext(FirebaseContext);
    console.log(course);
    
    
    const db = usefirebase.db;
    const user = useuser.user.uid;
    const navigate = useNavigate();
  
    
    
    useEffect(() => async () => {
        const  fetchdata= async () => {
            try {
                const snapshot = await get(child(ref(db), `/courses`));
                if (snapshot.exists()) {
                    setAllcourses(snapshot.val());
                } else {
                    console.log('No data available');
                    setAllcourses([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
        }
        finally {
          console.log("finally");
          setLoading(false); // Ensure loading is set to false whether fetch succeeds or fails
        }
    };
    fetchdata();
    },[])

    const initialOptions = {
        "clientId": clientId,
        currency:"USD",
        intent: "capture",
    };

    

    const createOrder = async () => {
        
        try {
            console.log("creating order")
            const response = await fetch(`${server_url}/my-server/create_order`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product: [{
                        id: `${course.id}`,
                        name: `${course.title}`,
                        description: `${course.description}`,
                        cost: `${course.price}`,
                        }
                 ],

                }),
            })
             const order = await response.json();
            console.log('Order creation success:', order);
            return order.id;
        } catch (error) {
            console.log(error)
            throw error;
        }
    };
    const onShippingOptionsChange = (data, actions) => {
        if (data.selectedShippingOption.type === 'PICKUP') {
            return actions.reject(data.errors.STORE_UNAVAILABLE);
        }
    }
    const onApprove = async (data) => {

        console.log("data",data);
        // Capture the funds from the transaction.
        return await fetch(`${server_url}/my-server/complete_order/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                // orderID: data,
                orderID: data.orderID,
            }),
        }).then( async (response)=>{response.json();
        //added to cart

        for (let key in purchaseIds){
            const itemRef = ref(db, `users/${user}/cart/${purchaseIds[key]}`);
            await remove(itemRef);
            console.log("course id is ",key);
        await set(ref(db,'users/'+ user +'/purchases/'+ purchaseIds[key]),{
            id : allcourses[purchaseIds[key]].id, //course.id,
            title :allcourses[purchaseIds[key]].title, //course.title,
            price : allcourses[purchaseIds[key]].price, //course.price,
            order_id : data.orderID,
            payer_id : data.payerID
           }
           )
           .then((result) => {
             console.log("data inserted successfully");
             }).catch((err) => {
               console.log("user login with error and data not inserted", err);
             })
            }
            }
    )
        .then((data) => {
            navigate('/');    
            alert(`Transaction completed by ${data.payer.name.given_name}`);
        })
    };

    const styles = {
        shape: "pill",
        layout: "vertical",
        };
        
    const onCancel = () => {
            // Show a cancel page, or return to cart
            alert(`Your order is cancelled`);
            console.log("cancel")
            window.location.assign("/");
            
        }

if (loading) {
    return <div>Loading...</div>; // Show loading state
     }


    return (
        <PayPalScriptProvider options={initialOptions}>
           <PayPalButtons style={styles}  
        onCancel={(data)=>onCancel()}
        createOrder={(data)=>createOrder(data).then((data)=>{return data}) }
        onApprove={(data)=>onApprove(data)}
        onShippingOptionsChange={onShippingOptionsChange}
        />
        </PayPalScriptProvider>
    );
}

export default Mainpay;
