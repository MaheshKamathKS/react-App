import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useCart } from './ContextReducer';
import Modal from '../Modal';
import Cart from './screens/Cart';

export default function Navbar({ search, setSearch }) {
    const [cartView, setCartView] = useState(false);
    const data = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        navigate("/Login");
    }

    const loadCart = () => {
        setCartView(true);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-custom position-fixed" style={{ boxShadow: "0px 4px 20px black", position: "fixed", zIndex: "100", width: "100%", backgroundColor: "black" }}>
            <div className="container-fluid">
                <Link className="navbar-brand fs-1" to="/" style={{ fontFamily: 'Allan, sans-serif', color: "yellow", fontWeight: "bolder" }}>Nitte Foodz</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/" style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>Home</Link>
                        </li>
                        {(localStorage.getItem("authToken")) ?
                            <li className="nav-item">
                                <Link className="nav-link fs-5 mx-3 active" aria-current="page" to="/MyOrder" style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>My Orders</Link>
                            </li> : ""}
                        <li className='nav-item'>
                            <input className="form-control me-2 inp" type="search" placeholder="Search" aria-label="Search" style={{ backgroundColor: "white", padding: "22px", width: "600px", height: "15px", border: "none", outline: "none", borderRadius: "10px", fontFamily: "sans-serif" }} value={search} onChange={(e) => { setSearch(e.target.value) }} />
                        </li>
                    </ul>
                    {(!localStorage.getItem("authToken")) ?
                        <div className="d-flex">
                            <Link className="btn bg-white text-success mx-1 " to="/Login">Login</Link>
                            <Link className="btn bg-white text-success mx-1" to="/creatuser">Signup</Link>
                        </div> :
                        <div>
                            <div className="btn bg-white text-success mx-2 " onClick={loadCart}>
                                My Cart {"  "}
                                <Badge pill bg="danger">
                                    <ShoppingCartIcon />{data.length}
                                </Badge>
                            </div>
                            {cartView ? <Modal onClose={() => setCartView(false)}><Cart /></Modal> : null}
                            <button onClick={handleLogout} className="btn bg-white text-danger" >Logout</button>
                        </div>}
                </div>
            </div>
        </nav>
    );
}
