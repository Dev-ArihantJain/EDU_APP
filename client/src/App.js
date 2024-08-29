import './output.css';
import {useContext, useEffect,useState} from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login_form.js';

//firebase
import {signOut} from "firebase/auth";

//components
import Navbar from './components/navbar.js';  
import About from './components/about.js';
import MainSection from './components/mainsection.js';
import Footer from './components/footer.js';
import ContactUs from './components/contactUs.js';
import Home from './components/home.js';
import BuyingPage from './components/buyingPage'; 
import Cart from './components/carts.js';

//context
import {UserContext} from './context/userContext.js';
import {FirebaseContext} from './context/firebaseContext.js';


function App() {
  const usefirebase = useContext(FirebaseContext);
  const users = useContext(UserContext);

  const db = usefirebase.db;
  const auth = usefirebase.auth;

  const [user, setUser] = useState(null);
  const [userdata, setuserdata] = useState("hello");

  
  useEffect(() => {
    setUser(users.user);
    setuserdata(users.userdata);
  },[users])

  if (user===null||undefined) {
    return <LoginForm/>;
  }
  
  return (

    <Router>
      <Navbar />
      <div className="App">
        {/* <Navbar /> */}
          <div style={{height:"64px"}}> </div>
        <Routes>

          <Route path="/" element={
                      <>
                  <section id="home">
                  <Home userdata={userdata} />
                </section>
                <section id="courses">
                  <MainSection />
                </section>
                <section id="about">
                  <About />
                </section>
                <section id="contact">
                  <ContactUs />
                </section>
                  </>
                  } />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<MainSection />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/buy" element={<BuyingPage />} />
          <Route path="/cart" element={<Cart cartItems={[{name: "Course 1", price: 9.99}, { name: "Course 2", price: 18}]} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
