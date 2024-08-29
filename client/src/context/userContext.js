import {react,useState,useEffect} from "react"
import {useContext, createContext } from "react"
import {onAuthStateChanged} from "firebase/auth";
import {getDatabase, ref, set ,get , child, onValue} from "firebase/database";
import { FirebaseContext } from "./firebaseContext";




export const UserContext = createContext()
const UserContextProvider = ({children}) => {
const usefirebase=useContext(FirebaseContext);

const auth = usefirebase.auth;
const db = usefirebase.db;

const [user,setUser] = useState(null)
const [userdata, setuserdata] = useState("hello");

 const fetchUserDetails =  async (userId) => {
        await get(child(ref(db),`users/${userId}`)).then(async (snapshot)=>{
         await setuserdata(snapshot.val());
        })
        .catch((error)=>{console.log(error)});
      };
      
      console.log(userdata);


    useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user)
      if (user) {
            setUser(user);
            fetchUserDetails(user.uid);
            onValue(ref(db,`users/${user.uid}`), (snapshot) => {
              console.log("dekh ",snapshot.val());
              setuserdata(snapshot.val());
             });
          } else {
            setUser(null);
          }
        });
      },[])


    return (
        <UserContext.Provider value={{user,setUser,userdata,setuserdata}}>
            {children}
        </UserContext.Provider>
    )
}
export default UserContextProvider
