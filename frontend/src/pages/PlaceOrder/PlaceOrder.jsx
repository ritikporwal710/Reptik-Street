import React, { useContext, useEffect, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { getTotalCartAmount, token, food_list, cartItems, url } =
    useContext(StoreContext);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;

    // console.log("name and value", name, value);
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = [];

    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: getTotalCartAmount() + 5,
    };

    // console.log("orderData", orderData);

    let response = await axios.post(url + "/api/order/place", orderData, {
      headers: { token },
    });

    // console.log("response_-------------> from API", response);

    if (response.data.success) {
      const { session_url } = response.data;
      window.location.replace(session_url);
    } else {
      console.log("error occured");
    }
    // console.log("orders list", orderItems);
  };
  // const onSubmitHandler = () => {};

  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/cart");
    } else if (getTotalCartAmount() === 0) {
      navigate("/cart");
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            required
            name="firstName"
            onChange={onChangeHandler}
            type="text"
            value={data.firstName}
            placeholder="First name"
          />
          <input
            required
            name="lastName"
            onChange={onChangeHandler}
            type="text"
            value={data.lastName}
            placeholder="Last name"
          />
        </div>
        <input
          required
          name="email"
          onChange={onChangeHandler}
          type="email value={data.email}"
          placeholder="Email address"
        />
        <input
          required
          name="street"
          onChange={onChangeHandler}
          type="text"
          value={data.street}
          placeholder="Address"
        />
        <div className="multi-fields">
          <input
            required
            name="city"
            onChange={onChangeHandler}
            type="text"
            value={data.city}
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onChangeHandler}
            type="text"
            value={data.state}
            placeholder="State"
          />
        </div>
        <div className="multi-fields">
          <input
            required
            name="zipcode"
            onChange={onChangeHandler}
            type="text"
            value={data.zipcode}
            placeholder="Pin code"
          />
          <input
            required
            name="country"
            onChange={onChangeHandler}
            type="text"
            value={data.country}
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          onChange={onChangeHandler}
          type="text"
          value={data.phone}
          placeholder="Phone"
        />
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount() === 0 ? 0 : 5}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <b>Total</b>
              <b>
                ${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 5}
              </b>
            </div>
          </div>
          <button type="submit">Proceed to Payment</button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
