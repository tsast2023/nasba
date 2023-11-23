import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useCartInfo from "../../hooks/use-cart-info";
import { cartProducts } from "../../redux/features/cart-slice";

const countries = [
"Ariana",
"Beja",
"Ben Arous",
"Bizerte",
"Gabes",
"Gafsa",
"Jendouba",
"Kairouan",
"Kasserine",
"Kebili",
"Kef",
"Mahdia",
"Manouba",
"Medenine",
"Monastir",
"Nabeul",
"Sfax",
"Sidi Bouzid",
"Siliana",
"Sousse",
"Tataouine",
"Tozeur",
"Tunis",
"Zaghouan" ];
const payment_accordion = [
  {
    id: "headingOne",
    target: "collapseOne",
    title: " Direct Bank Transfer",
    desc: "Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.",
    show: true,
  },
  {
    id: "headingTwo",
    target: "collapseTwo",
    title: "Cheque Payment",
    desc: "Please send your cheque to Store Name, Store Street, Store Town, Store State / County, Store Postcode.",
  },
  {
    id: "headingThree",
    target: "collapseThree",
    title: "PayPal",
    desc: "Pay via PayPal; you can pay with your credit card if you don’t have a PayPal account.",
  },
];

const CheckoutArea = () => {
  const [createAccount, setCreateAccount] = useState(false);
  const [total , setTotal] = useState()
  const [order , setOrder] = useState({Country : "" , fname:"" , lname : "" , companyName : "" , StAdress : "" , Appartement: "" , town : "" , state: "" , zipCode : "" , emailAdress: "" , phone: "" , products: [{productName : "" ,quantity:"" ,color:"",size:"", subTotal:"" , id : ""}] , total:""})
  const [shipBox, setShipBox] = useState(false);
  const cartItems = JSON.parse(localStorage.getItem('finalcheckout')) || [];
  const submitHandler = (e) =>{
    e.preventDefault();
    console.log("order:",order)
    
    localStorage.removeItem('finalcheckout');
    localStorage.removeItem('cart');
    
    window.location.reload();
  }
 const  onChangeHandler = (e) =>{
  const updatedProduct = cartItems.map(item => ({
    
    productName: item.product.title,
    quantity: item.product.quantity,
    subTotal: item.prices ,
    color: item.color,
    size: item.size,
    id : item._id
  }));

   setOrder({...order , [e.target.name] : e.target.value , total:total , products : updatedProduct } )
   
   
 }
 useEffect(()=>{
  
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((product) => {
      totalPrice += product.prices;
    }
    );
   console.log(cartItems)
    setTotal(totalPrice);
  }
  calculateTotalPrice();
 } , [])


  return (
    <>
      <section className="checkout-area pb-70">
        <div className="container">
          <form onSubmit={submitHandler} action="#">
            <div className="row">
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Billing Details</h3>
                  <div className="row">
                    <div className="col-md-12">
                      <div className="country-select">
                        <label>
                        Gouvernorat <span className="required">*</span>
                        </label>
                        <select name="Country" onChange={e=>{setOrder({...order , Country : e.target.value})}}>
                          {countries.map((country, index) => (
                            <option   key={index} defaultValue={index}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    {/* <div className="col-md-12">
                      <div className="country-select">
                        <label>
                          Country <span className="required">*</span>
                        </label>
                        <select>
                          {countries.map((country, index) => (
                            <option key={index} defaultValue={index}>
                              {country}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div> */}

<div className="checkout-form-list">
          <label>
            First Name<span className="required">*</span>
          </label>
        <input name={"fname"} onChange={onChangeHandler} required type={"text"} placeholder={"First Name"} />
      </div>
    
    <div className="checkout-form-list">
          <label>
            Last Name<span className="required">*</span>
          </label>
        <input name={"lname"} onChange={onChangeHandler} required type={"text"} placeholder={"First Name"} />
      </div>
   
    <div className="checkout-form-list">
          <label>
            Company Name (Optional)
          </label>
        <input name={"companyNname"} onChange={onChangeHandler} required type={"text"} placeholder={"Compnay Name"} />
      </div>
    
      <div className="checkout-form-list">
          <label>
          Street Adress<span className="required">*</span>
          </label>
        <input name="StAdress" onChange={onChangeHandler} required type={"text"} placeholder={"Street Adress"} />
      </div>
      <div className="checkout-form-list">
          <label>
          Appartement<span className="required">*</span>
          </label>
        <input name={"Appartement"} onChange={onChangeHandler} required type={"text"} placeholder={"Appartement"} />
      </div>
      <div className="checkout-form-list">
          <label>
          City/Town<span className="required">*</span>
          </label>
        <input name="town" onChange={onChangeHandler} required type={"text"} placeholder={"City/Town"} />
      </div>
      <div className="checkout-form-list col-lg-6">
          <label>
          State/Country<span className="required">*</span>
          </label>
        <input name="state" onChange={onChangeHandler} required type={"text"} placeholder={"State/Country"} />
      </div>
      <div className="checkout-form-list col-lg-6">
          <label>
          State/Country<span className="required">*</span>
          </label>
        <input name="zipCode" onChange={onChangeHandler} required type={"text"} placeholder={"zipCode"} />
      </div>
      <div className="checkout-form-list">
          <label>
          Email Adress<span className="required">*</span>
          </label>
        <input name="emailAdress" onChange={onChangeHandler} required type={"email"} placeholder={"Email"} />
      </div>
      <div className="checkout-form-list">
          <label>
          Phone:<span className="required">*</span>
          </label>
        <input name="phone" onChange={onChangeHandler} required type={"text"} placeholder={"Phone"} />
      </div>

                    <div className="col-md-12">
                      <div className="checkout-form-list create-acc">
                        <input
                          onClick={() => setCreateAccount(!createAccount)}
                          id="cbox"
                          type="checkbox"
                        />
                        <label>Create an account?</label>
                      </div>
                      {createAccount && (
                        <div
                          id="cbox_info"
                          className="checkout-form-list create-account"
                        >
                          <p>
                            Create an account by entering the information below.
                            If you are a returning customer please login at the
                            top of the page.
                          </p>
                          <label>
                            Account password <span className="required">*</span>
                          </label>
                          <input type="password" placeholder="password" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="different-address">
                    <div className="ship-different-title">
                      <h3>
                        <label>Ship to a different address?</label>
                        <input
                          onClick={() => setShipBox(!shipBox)}
                          id="ship-box"
                          type="checkbox"
                        />
                      </h3>
                    </div>
                    {shipBox && (
                      <div id="ship-box-info">
                        <div className="row">
                          <div className="col-md-12">
                            <div className="country-select">
                              <label>
                                Country <span className="required">*</span>
                              </label>
                              <select>
                                {countries.map((country, index) => (
                                  <option key={index} defaultValue={index}>
                                    {country}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div className={"col-md-12"}>
      <div className="checkout-form-list">
          <label>
            First Name<span className="required">*</span>
          </label>
        <input name={"nameL"} onChange={onChangeHandler} required type={"text"} placeholder={"First Name"} />
      </div>
    </div>
                          <InputBox
                            col="col-md-6"
                            label={"Last Name"}
                            placeholder="Last Name"
                          />
                          <InputBox
                            required={false}
                            label={"Company Name"}
                            placeholder="Company Name"
                          />
                          <InputBox
                            label={"Street address"}
                            placeholder="Street address"
                          />
                          <InputBox
                            required={false}
                            placeholder="Apartment, suite, unit etc. (optional)"
                          />
                          <InputBox
                            label={"Town / City"}
                            placeholder="Town / City"
                          />
                          <InputBox
                            col="col-md-6"
                            label={"State / County"}
                            placeholder="State / County"
                          />
                          <InputBox
                            col="col-md-6"
                            label={"Postcode / Zip"}
                            placeholder="Postcode / Zip"
                          />
                          <InputBox
                            col="col-md-6"
                            type="email"
                            label={"Email Address"}
                            placeholder="Email Address"
                          />
                          <InputBox
                            col="col-md-6"
                            label={"Phone"}
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    )}
                    <div className="order-notes">
                      <div className="checkout-form-list">
                        <label>Order Notes</label>
                        <textarea
                          id="checkout-mess"
                          cols="30"
                          rows="10"
                          placeholder="Notes about your order, e.g. special notes for delivery."
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="your-order mb-30 ">
                  <h3>Your order</h3>
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Product</th>
                          
                          <th className="product-total">Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cartItems.map((item, index) => (
                          <tr key={index} className="cart_item">
                            <td className="product-name">
                              {item.product.title}{" "}
                              <strong className="product-quantity">
                                {" "}
                                × {item.product.quantity}
                              </strong>
                            </td>
                           
                            <td className="product-total">
                              <span className="amount">{item.prices} TND</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        
                        <tr className="order-total">
                          <th>Order Total</th>
                          
                          <td>
                            <strong>
                              <span className="amount">{total} TND</span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  <div className="payment-method">
                    {/* <div className="accordion" id="accordionExample">
                      {payment_accordion.map((item, index) => (
                        <div key={index} className="card">
                          <div className="card-header" id={item.id}>
                            <h5 className="mb-0">
                              <button
                                className={`btn-link ${
                                  item.show ? "" : "collapsed"
                                }`}
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target={`#${item.target}`}
                                aria-expanded="true"
                                aria-controls={`${item.target}`}
                              >
                                {item.title}
                              </button>
                            </h5>
                          </div>

                          <div
                            id={`${item.target}`}
                            className={`collapse ${item.show ? "show" : ""}`}
                            aria-labelledby={item.id}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="card-body">{item.desc}</div>
                          </div>
                        </div>
                      ))}
                    </div> */}
                    <div className="order-button-payment mt-20">
                      <button type="submit" className="os-btn os-btn-black">
                        Place order
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;

const InputBox = ({
  col = "col-md-12",
  required = true,
  label,
  type = "text",
  placeholder,
  nameL,
  setOrder,
  order
}) => {
  return (
    <div className={col}>
      <div className="checkout-form-list">
        {label && (
          <label>
            {label} {required && <span className="required">*</span>}
          </label>
        )}
        <input name={nameL} onChange={e=>setOrder({...order , [e.target.name] : e.target.value})} required={required} type={type} placeholder={placeholder} />
      </div>
    </div>
  );
};
