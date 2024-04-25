import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

const Card = (props) => {
  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  const handleAddToCart = async () => {
    let food = data.find((item) => item.id === props.foodItem._id);

    let finalPrice = qty * parseInt(options[size]);

    if (food && food.size === size) {
      await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size });
    }
  };

  const handleQtyChange = (e) => {
    setQty(parseInt(e.target.value));
  };

  return (
    <div className="card mt-3 crd bg-white" style={{border:"0.5px solid black", width: "18rem", maxHeight: "360px" , borderRadius: "10px"}}>
      <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "150px", objectFit: "fill",borderRadius: "10px 10px 0 0" }} />
      <div className="card-body bg-custom" style={{ borderRadius: "0 0 10px 10px" }}>
        <h5 className="card-title">{props.foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100 bg-custom rounded" onChange={handleQtyChange}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
          <select className="m-2 h-100  bg-custom rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5">₹{qty * parseInt(options[size])}/-</div>
          <hr></hr>
          <button className={"btn btn-primary justify-center ms-2 "} onClick={handleAddToCart}style={{borderRadius: "10px"}}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;