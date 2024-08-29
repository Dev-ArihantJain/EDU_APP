import {react,useState} from "react"
import {getAuth,signOut,onAuthStateChanged,GoogleAuthProvider,signInWithPopup,signInWithEmailAndPassword,createUserWithEmailAndPassword,} from "firebase/auth";
import {initializeApp} from "firebase/app";
import {getDatabase, ref, set ,get , child} from "firebase/database";
import 'dotenv/config';



import { createContext } from "react";
export const FirebaseContext = createContext()


  const FirebaseContextProvider = ({children}) => {

    const firebaseApiKey = process.env.REACT_APP_FIREBASE_API_KEY
    const firebaseauthdomain = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN
    const firebaseappid = process.env.REACT_APP_FIREBASE_APP_ID
    const firebasedburl = process.env.REACT_APP_FIREBASE_DB_URL
    
    const firebaseConfig = {
        apiKey: firebaseApiKey,
        authDomain: firebaseauthdomain,
        projectId: "edtech-a0327",
        storageBucket: "edtech-a0327.appspot.com",
        messagingSenderId: "305855127865",
        appId: firebaseappid,
        measurementId: "G-8DS7HTPW58",
        databaseURL: firebasedburl
      };
      
    const app = initializeApp(firebaseConfig);
    const db = getDatabase(app);
    const auth =getAuth(app);

    
    return (
        <FirebaseContext.Provider value={{auth,db}}>
            {children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseContextProvider