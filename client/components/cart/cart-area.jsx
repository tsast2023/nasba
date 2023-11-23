import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import { GlobalState } from "../../contextM/GlobalState";

const CartArea = () => {
  const [cartInfo , setCartInfo] = useState({});
  const listoftotals =  []
  const [sizes, setSizes] = useState({});
  const [colors , setColors] = useState({});
  const handleSubmit = (e) => e.preventDefault();
  const {clearCart} = useContext(GlobalState);
  const cart = JSON.parse(localStorage.getItem('cart'));
  const {removeItemFromCart} =  useContext(GlobalState)
  const handleChange = (e, productId) => {
  const newQuantity = parseInt(e.target.value);
  setCartInfo((prevCartInfo) => ({
    ...prevCartInfo,
    [productId]: newQuantity,
  }));
  console.log('the new cart: ' , cartInfo)
};
const handleQuantityDecrease = (productId) => {
  setCartInfo((prevCartInfo) => ({
    ...prevCartInfo,
    [productId]: (prevCartInfo[productId] || 0) - 1,
  }));
  console.log('the new cart:' , cartInfo)
};

const handleQuantityIncrease = (productId) => {
  setCartInfo((prevCartInfo) => ({
    ...prevCartInfo,
    [productId]: (prevCartInfo[productId] || 0) + 1,
  }));
  console.log('the new cart: ' , cartInfo)
};
  useEffect(()=>{
    console.log("cart:",JSON.parse(localStorage.getItem('cart')))
  })
  const totalPriceQuantity = (item)=>{
    listoftotals.push(cartInfo[item._id] * item.product.price) 
    console.log("list of totals:" , listoftotals)
    return cartInfo[item._id] * item.product.price;

  } 
    const cartTotalPrice = () =>{
    const tt = listoftotals.filter((value) => !isNaN(value)).reduce((acc, currentValue) => acc + currentValue, 0);
    
    cart.forEach((item, index) => {
      const productId = item._id;
      if (cartInfo[productId]) {
        item.product.quantity = cartInfo[productId];
        item.prices = listoftotals[index];
      }
      if(sizes[productId]){
        item.size = sizes[productId]
      }
      if(colors[productId]){
        item.color = colors[productId]
      }
    });
    console.log(cart)
    return tt;
  }

  const changeSizes = (productId , newSize)=>{
    setSizes((prevSizes) => ({
      ...prevSizes,
      [productId]: newSize,
    }));
    console.log(sizes)
  }
  const changeColors = (productId , newColor)=>{
    setColors((prevColors) => ({
      ...prevColors,
      [productId]: newColor,
    }));
    console.log(colors)
  }
  return (
    <>
      <section className="cart-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {cart.length === 0 && (
                <div className="text-center">
                  <h3>Your cart is empty</h3>
                  <Link href="/shop">
                    <button className="os-btn os-btn-2 mt-30">
                      Return to shop
                    </button>
                  </Link>
                </div>
              )}
              {cart.length > 0 && (
                <form onSubmit={handleSubmit}>
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Images</th>
                          <th className="cart-product-name">Product</th>
                          <th className="product-price">Unit Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th  className="product-quantity">taille</th>
                          <th  className="product-quantity">taille</th>
                          <th className="product-subtotal">Total</th>
                          <th className="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <Link href={`/product-details/${item._id}`}>
                                <a>
                                  <img
                                    src={`data:image/png;base64, ${item.product.img}`}
                                  />
                                </a>
                              </Link>
                            </td>
                            <td className="product-name">
                                <a>{item.product.title}</a><br/>
                                <a>{item.color}</a><br/>
                                <a>{item.size}</a>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                {item.product.price} TND
                              </span>
                            </td>
                            <td className="product-quantity">
                              <div className="cart-plus-minus">
                                <input
                                  type="text"
                                  onChange={(e) => handleChange(e, item._id)} 
                                  value={cartInfo[item._id] || 0} 
                                />
                                <div
                                  onClick={() =>
                                    handleQuantityDecrease(item._id)
                                  }
                                  className="dec qtybutton"
                                >
                                  -
                                </div>
                                <div
                                  onClick={() => handleQuantityIncrease(item._id) }
                                  className="inc qtybutton"
                                >
                                  +
                                </div>
                              </div>
                            </td>
                            {item.product.sizes ?(
                            <td className="product-price">
                            <select onChange={e=>changeSizes(item._id , e.target.value)} name="" id="">
                              <option value="">Select a size</option>
                              {item.product.sizes.map((size, index) => (
                                <option key={index} value={size}>{size}</option>
                              ))}
                            </select>
                          </td>
                          ) :(<td></td>)}
                            {item.product.colors ?(
                            <td className="product-price">
                            <select onChange={e=>changeColors(item._id , e.target.value)} name="" id="">
                              <option value="">Select a color</option>
                              {item.product.colors.map((color, index) => (
                                <option key={index} value={color}>{color}</option>
                              ))}
                            </select>
                          </td>
                          ) :(<td></td>)}
                            <td className="product-subtotal">
                              <span className="amount">
                                {totalPriceQuantity(item)} TND
                              </span>
                            </td>
                            <td
                              onClick={() => {removeItemFromCart(item._id); console.log(item._id)}
                                
                              }
                              className="product-remove"
                            >
                              <button>
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-12">
                      <div className="coupon-all">
                        <div className="coupon">
                          <input
                            
                            id="coupon_code"
                            className="input-text"
                            name="coupon_code"
                            placeholder="Coupon code"
                            type="text"
                          />
                          <button
                            className="os-btn os-btn-black"
                            name="apply_coupon"
                            type="submit"
                          >
                            Apply coupon
                          </button>
                        </div>
                        <div className="coupon2">
                          <button
                            onClick={() =>clearCart()}
                            className="os-btn os-btn-black"
                            name="update_cart"
                            type="button"
                          >
                            Clear cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-md-5 ms-auto">
                      <div className="cart-page-total">
                        <h2>Cart totals</h2>
                        <ul className="mb-20">
                          <li>
                            Total <span>{cartTotalPrice()} TND</span>
                          </li>
                        </ul>
                        <Link href={"/checkout"}>
                          <a onClick={localStorage.setItem('finalcheckout' , JSON.stringify(cart))} className="os-btn">Proceed to checkout</a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartArea;
