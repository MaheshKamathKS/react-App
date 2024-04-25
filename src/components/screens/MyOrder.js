import React, { useEffect, useState } from 'react';
import Navbar from '../navbar';

export default function MyOrder() {
    const [orderData, setOrderData] = useState([]);
    const [search, setSearch] = useState('');

    const fetchMyOrder = async () => {
        try {
            const response = await fetch("http://localhost:5001/api/myorderData", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: localStorage.getItem('userEmail')
                })
            });
            const data = await response.json();
            setOrderData(data);
        } catch (error) {
            console.error('Error fetching order data:', error);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div style={{ backgroundColor: "black"}}>
        <div><Navbar search={search} setSearch={setSearch} /></div>
            <div style={{ fontFamily: "Arial, sans-serif", color: "white", padding: "20px" }}>
                <h1 style={{ textAlign: "center" }}>My Orders</h1>
            </div>
            <div className='container'>
                <div className='row'>
                    {orderData.slice().reverse().map(order => (
                        <div key={order._id} className='col-12 col-md-6 col-lg-3'>
                            {order.order_data.map((orderItem, index) => (
                                <div key={index}>
                                    <div style={{ marginBottom: "10px", borderBottom: "1px solid white", paddingBottom: "10px" }}>Order Date: {orderItem[0].order_date}</div>
                                    {orderItem.slice(1).map(item => (
                                        <div key={item.id} style={{ marginBottom: "5px" }}>
                                            <div>Name: {item.name}</div>
                                            <div>Quantity: {item.qty}</div>
                                            <div>Size: {item.size}</div>
                                            <div>Price: ₹{item.price}/-</div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div style={{ backgroundColor: "black", color: "white", padding: "20px", textAlign: "center" }}>
                <h2>"Please ensure to place your orders for future dates. Thank you!"</h2>
            </div>
        </div>
    );
}
