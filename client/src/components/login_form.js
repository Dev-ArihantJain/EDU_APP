// import 'dotenv/config';
import { React,useState } from "react";
import "./login_form.css";
import { FcGoogle } from 'react-icons/fc';

//firebase
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import{app} from "../firebase.js";
import {getDatabase, ref, get, set} from "firebase/database";

//context 
import { useContext } from "react";
import { FirebaseContext } from "../context/firebaseContext.js";

const server_url = process.env.REACT_APP_SERVER_URL

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); 
const db = getDatabase(app);


const LoginForm = () => {

  // const useFirebase = useContext(FirebaseContext);
  // console.log(useFirebase.db);

  // states
  const [email,setemail]= useState("");
  const [newpassword,setnewpassword]= useState("");
  
  const [username,setusername]= useState("");
  const [password,setpassword]= useState("");

  const [status,setStatus]= useState("Sign In");
  const [showSignIn, setShowSignIn] = useState(true);



  //functions
  const handleGoogleLogin = async(e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = ref(db, 'users/' + user.uid);
      const snapshot = await get(userRef);

      if (!snapshot.exists()) {
        // If user data doesn't exist, insert the data
        const userDetails = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        };
        await set(userRef, userDetails);
      console.log("Data inserted successfully");

      fetch(`${server_url}/newsignup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      })
      .then(response => response.json())
      .then(data => console.log('Success:', data))
      .catch(error => console.error('Error:', error));

    } else {
      console.log("User data already exists");
    }    
    }catch(err) {
      console.log("error", err);
    }
  };

  const handleSignup = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth,email,newpassword).then((userCredential) => {
      console.log("userCredential", userCredential);
      setShowSignIn(true);

      set(ref(db,'users/'+ userCredential.user.uid),{
        name: userCredential.user.email,
      }
      ).then((result) => {
        console.log("data inserted successfully");
        }).catch((err) => {
          console.log("user login with error and data not inserted", err);
        })
    }).catch((err) => {
      console.log("error", err);
    })
    setusername("");
    setpassword("");
    
  }

  const handleLogin = (e) => {
        e.preventDefault();
          signInWithEmailAndPassword(auth,username,password).then((userCredential) => {
          console.log("userCredential", userCredential);
        }).catch((err) => {
          console.log("error", err);
          setStatus("Failed Try Again");
        })
        setusername("");
        setpassword("");
      }


  const handleSignUpClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSignIn(false);
  };

  const handleSignInClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowSignIn(true);
  };


return ( 
    <div className= "show " >
      <div className="login-form w-full flex justify-center items-center min-h-screen relative z-10">
        <div className="form-box solid" onClick={(e) => e.stopPropagation()} >

        {showSignIn ? (
          <form className=" w-auto" id="login">
            <h1 className="login-text  text-white border-b-2 border-white leading-[6vh] font-bold text-center flex justify-center items-center pt-[2vh]">{status}
            </h1>
            
            <label>Username</label>
            <br></br>
            <input value={username} onChange={(e)=>setusername(e.target.value)} type="text" name="username" className="login-box border border-gray-300 flex justify-center items-center rounded-[20px] p-2 pl-4 tracking-[1px] font-semibold m-1.5 text-base bg-transparent transition duration-1000 outline-none text-[ghostwhite]" required/>
            <br></br>

            <label>Password</label>
            <br></br>
            <input value={password} onChange={(e)=>setpassword(e.target.value)} type="password" name="password" className="login-box border border-gray-300 flex justify-center items-center rounded-[20px] p-2 pl-4 tracking-[1px] font-semibold m-1.5 text-base bg-transparent transition duration-1000 outline-none text-[ghostwhite]" required />
            <br></br>

            <input onClick={handleLogin} type="submit" value="LOGIN" className="login-btn w-[95%] flex justify-center items-center bg-[rgb(48,172,251)] text-white mt-1.5 rounded-[20px] border-none text-[15pt] font-bold transition duration-1000 outline-none cursor-pointer mb-5" />

          <div className="links mb-4 gap-4 text-[ghostwhite] flex justify-center items-center ">
            <p className=" ">Don't have account yet?</p>
            <button className="text-blue-500 hover:text-blue-600 transition duration-500 ease-in-out" onClick={handleSignUpClick} id="signUpButton">Sign Up</button>
        </div>

        <div className="links mb-4 gap-4 text-[#ffffff] flex justify-center items-center hover:text-black">  
          <button  onClick={handleGoogleLogin}
      className="flex items-center justify-center bg-black-200 text-white-800 border border-gray-300 px-4 py-2 rounded-lg shadow  hover:bg-teal-300 ">
      <FcGoogle className="mr-2 text-xl" />
      Sign In with Google
    </button>

    </div>

          </form> 
        ) : (

          <form className="w-auto" id="signUp">
            <h1 className="login-text  text-white border-b-2 border-white leading-[6vh] font-bold text-center flex justify-center items-center relative pt-[2vh]">Register
            </h1>
            
            <label>Email</label>
            <br></br>
            <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" name="username" className="login-box border border-gray-300 flex justify-center items-center rounded-[20px] p-2 pl-4 tracking-[1px] font-semibold m-1.5 text-base bg-transparent transition duration-1000 outline-none text-[ghostwhite]" required/>
            <br></br>

            <label>Password</label>
            <br></br>
            <input value={newpassword} onChange={(e)=>setnewpassword(e.target.value)} type="password" name="password" className="login-box border border-gray-300 flex justify-center items-center rounded-[20px] p-2 pl-4 tracking-[1px] font-semibold m-1.5 text-base bg-transparent transition duration-1000 outline-none text-[ghostwhite]" required />
            <br></br>

            <input  onClick={handleSignup} type="submit" value="REGISTER" className="login-btn w-[95%] flex justify-center items-center bg-[rgb(48,172,251)] text-white mt-1.5 rounded-[20px] border-none text-[15pt] font-bold transition duration-1000 outline-none cursor-pointer mb-5" />

          <div className="links mb-4 gap-4 text-[ghostwhite] flex justify-center items-center ">
            <p className=" ">Already Have Account ?</p>
            <button className="text-blue-500 hover:text-blue-600 transition duration-500 ease-in-out" onClick={handleSignInClick} id="signInButton">Sign In</button>
        </div>
          </form>

        )}
        </div>
      </div>
    </div>
  );
}


export default LoginForm;

