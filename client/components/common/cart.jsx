import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import useCartInfo from "../../hooks/use-cart-info";
import { remove_cart_product } from "../../redux/features/cart-slice";
import axios from "axios";
import { useState, useEffect , useContext } from "react";
import { GlobalState } from "../../contextM/GlobalState";
const Cart = () => {
  // const cart = useSelector((state) => state.cart.cartProducts);
  const dispatch = useDispatch();
  const { total } = useCartInfo();
  const state = useContext(GlobalState);
  const {clearCart} = useContext(GlobalState);
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
 const {removeItemFromCart} =  useContext(GlobalState)
 const listoftotals =  []
 const totalPriceQuantity = (item)=>{
  listoftotals.push(cartInfo[item._id] * item.product.price) 
  console.log(listoftotals)
  return cartInfo[item._id] * item.product.price;

} 
  

  return (
    <>
      <div className="mini-cart">
        {cart?.length === 0 && <h5>Your cart is empty</h5>}
        {cart?.length >= 1 && (
          <div className="mini-cart-inner">
            <ul
              className={`mini-cart-list ${
                cart.length > 2 ? "slider-height" : ""
              } 
          ${cart?.length > 1 ? "slider-height-2" : ""}`}
            >
              {cart?.map((item, index) => (
                <li key={index}>
                  <div className="cart-img f-left">
                    {item?.product && (
                      <Link href={`/product-details/${item?._id}`}>
                        <a>
                          {item?.product.img && (
                            <img
                              src={`data:image/png;base64, ${item.product.img}`}
                              alt={item.product.title}
                            />
                          )}
                        </a>
                      </Link>
                    )}
                  </div>
                  <div className="cart-content f-left text-start">
                    <h5>
                      <Link href={`/product-details/${item?._id}`}>
                        <a>{item?.product && item.product.title} </a>
                      </Link>
                    </h5>
                    <div className="cart-price">
                      {/* {item.product && (
                        <span className="ammount">
                          {item.product.quantity}{" "}
                          <i className="fal fa-times"></i>
                        </span>
                      )} */}
                      {item.product && (
                        <span className="price">{item.product.price} TND</span>
                      )}
                    </div>
                  </div>
                  <div className="del-icon f-right mt-30">
                    <button onClick={() => {removeItemFromCart(item._id); console.log(item._id)}}>
                      <i className="fal fa-times"></i>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            {/* <div className="total-price d-flex justify-content-between mb-30">
              <span>Subtotal:</span>
              <span>{} TND</span>
            </div> */}
            <div className="checkout-link">
              <Link href={"/cart"}>
                <a className="os-btn">view Cart</a>
              </Link>
              {/* <Link href={"/checkout"}>
                <a className="os-btn os-btn-black">Checkout</a>
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
