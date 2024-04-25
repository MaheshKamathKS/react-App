
import './App.css';
import Home from './components/screens/home';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  
} from "react-router-dom";
import Login from './components/screens/login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import SignUp from './components/screens/signUp.js';
import { CartProvider } from './components/ContextReducer.js';
import Cart from './components/screens/Cart.js';
import MyOrder from './components/screens/MyOrder.js';
import Aboutus from './components/Aboutus.js';
import ContactUsSection from './components/ContactUs.js';
import ContactUs from './components/ContactUs.js';

function App() {
  return (
    <CartProvider>
    <Router>
    <div >
      <Routes>
      <Route exact path="/" element={<Home/>}/>
      <Route exact path="/Login" element={<Login/>}/>
      <Route exact path="/creatuser" element={<SignUp/>}/>
      <Route exact path="/MyOrder" element={<MyOrder/>}/>
      <Route exact path="/Aboutus" element={<Aboutus/>}/>
      <Route exact path="/ContactUs" element={<ContactUs/>}/>
      </Routes>
    </div>
    </Router>
    </CartProvider>
  );
}

export default App;
