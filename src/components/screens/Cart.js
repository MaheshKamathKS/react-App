import React, { useState } from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../ContextReducer';

export default function Cart() {
  const data = useCart();
  const dispatch = useDispatchCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckOut = async () => {
    console.log("Check Out button clicked");
    const userEmail = localStorage.getItem("userEmail");
    const response = await fetch("http://localhost:5001/api/orderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
    console.log("JSON RESPONSE:::::", response.status)
    if (response.status === 200) {
      dispatch({ type: "DROP" });
      setCheckoutSuccess(true);
    }
  }

  if (checkoutSuccess) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>Order submitted successfully!</div>
      </div>
    )
  }

  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'style={{ fontFamily: 'bold, sans-serif', color: "white", fontWeight: "bolder" }}>
        <img src="https://cdn.grofers.com/assets/ui/empty_states/emp_empty_cart.png" alt="..." style={{width:"215px",height:"188px"}}/><br/>
        Your cart is empty!</div>
      </div>
    )
  }

  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  return (
    <div style={{ backgroundColor: "black"}}>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-yellow fs-4'>
            <tr>
              <th scope='col'style={{ color: 'yellow' }}>#</th>
              <th scope='col'style={{ color: 'yellow' }}>Name</th>
              <th scope='col'style={{ color: 'yellow' }}>Quantity</th>
              <th scope='col'style={{ color: 'yellow' }}>Option</th>
              <th scope='col'style={{ color: 'yellow' }}>Amount</th>
              <th scope='col'style={{ color: 'yellow' }}></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index: index }) }}><Delete /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-primary mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  )
}
