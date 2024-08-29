import {initializeApp} from "firebase/app";
import 'dotenv/config';
// import { getAnalytics } from "firebase/analytics";

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

  export const app = initializeApp(firebaseConfig);
  // export const analytics = getAnalytics(app);