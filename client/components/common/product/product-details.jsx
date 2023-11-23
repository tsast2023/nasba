import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { GlobalState } from "../../../contextM/GlobalState";

const ProductDetails = ({ product }) => {
  const state = useContext(GlobalState);
  const productDetail = state.productDetail;
  const {addtoCart , removeItemFromCart} = useContext(GlobalState)
  const [size , setSize] = useState();
  const [color, setColor] = useState();
  // const cart = state.cart
  const cart = JSON.parse(localStorage.getItem('cart'))
useEffect(()=>{
  console.log(productDetail)
})
const addtocartH = (newItem)=>{
  addtoCart({...newItem , color: color , size: size});
  console.log(cart)
  window.location.href = "/shop"
}
  return (
    <>
      <section className="shop__area pb-65">
        <div className="shop__top grey-bg-6 pt-100 pb-90">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6">
                <div className="product__modal-box d-flex">
                  <div className="product__modal-nav mr-20">
                    <nav>
                      <div
                        className="nav nav-tabs"
                        id="product-details"
                        role="tablist"
                      >
                        {productDetail?.product.images?.map((img, index) => (
                          <a
                            key={index}
                            className={`nav-item nav-link mb-20 ${
                              index === 0 ? "active" : ""
                            }`}
                            id={`nav-${index}-tab`}
                            data-bs-toggle="tab"
                            href={`#nav-${index}`}
                            role="tab"
                            aria-controls={`nav-${index}`}
                            aria-selected={index === 0 ? "true" : "false"}
                          >
                            <div className="product__nav-img w-img">
                              <img
                                src={`data:image/png;base64, ${productDetail.product.img}`}
                                alt="product-img"
                                key="main-img"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </nav>
                  </div>

                  <div
                    className="tab-content mb-20"
                    id="product-detailsContent"
                  >
                    {productDetail?.product.images?.map((img, index) => (
                      <div
                        key={index}
                        className={`tab-pane fade ${
                          index === 0 ? "show active" : ""
                        } `}
                        id={`nav-${index}`}
                        role="tabpanel"
                        aria-labelledby={`nav-${index}-tab`}
                      >
                        <div className="product__modal-img w-img">
                          <img
                            src={`data:image/png;base64, ${productDetail?.product.img || ""}`}
                            alt="product-img"
                            key="main-img"
                          />
                          {productDetail?.product.product_sale && (
                            <div className="product__sale ">
                              <span className="new">new</span>
                              <span className="percent">-16%</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="product__modal-content product__modal-content-2">
                  <h4>
                    <Link href={`/product-details/${product?.id}`}>
                      <a>{productDetail?.product.title}</a>
                    </Link>
                  </h4>

                  <div className="rating rating-shop mb-15">
                    <ul>
                    {Array.from(
                              { length: productDetail?.product.rating },
                              (_, index) => (
                                <li key={index}>
                                  <span>
                                    <i className="fas fa-star"></i>
                                  </span>
                                </li>
                              )
                            )}
                    </ul>
                    <span className="rating-no ml-10 rating-left">
                      {productDetail?.product.rating} rating(s)
                    </span>
                  </div>
                  <div className="product__price-2 mb-25">
                    <span>{productDetail?.product.price} TND</span>
                    {productDetail?.product.old_price && (
                      <span className="old-price">
                        {productDetail?.product.old_price} TND
                      </span>
                    )}
                  </div>
                  <div className="product__modal-des mb-30">
                    <p>{productDetail?.product.description}</p>
                  </div>
                  <div className="product__modal-form mb-30">
                    <form action="#">
                      <div className=" size mb-20">
                        <label>
                          Size <i className="fas fa-star-of-life"></i>
                        </label>
                        {/* <select name="size" onChange={e=>setSize(e.target.value)}>
                          <option>- Please select -</option>
                          {productDetail?.product.sizes?.map((size, index) => (
                            <option value={size}  key={index}>{size}</option>
                          ))}
                        </select> */}
                        <tr>
                        {productDetail?.product.sizes?.map((size, index) => (
                          <td style={{borderLeft: "1px solid black" ,borderRight: "1px solid black" , padding: "10px" }} key={index}>{size}</td> 
                        ))}
                        </tr>
                      </div>
                      <div className=" color mb-20">
                        <label>
                          Color <i className="fas fa-star-of-life"></i>
                        </label>
                        {/* <select name="color" onChange={e=>setColor(e.target.value)}>
                          <option>- Please select -</option>
                          {productDetail?.product.colors?.map((color, index) => (
                            <option value={color} key={index}>{color}</option>
                          ))}
                        </select> */}
                        <tr>
                        {productDetail?.product.colors?.map((color, index) => (
                          <td style={{borderLeft: "1px solid black" ,borderRight: "1px solid black" , padding: "10px" }} key={index}>{color}</td> 
                        ))}
                        </tr>
                      </div>
                      <div className="product__modal-required mb-5">
                        {/* <span>Repuired Fiields *</span> */}
                      </div>
                      <div className="pro-quan-area d-sm-flex align-items-center">
                        {/* <div className="product-quantity-title">
                          <label>Quantity</label>
                        </div> */}
                        {/* <div className="product-quantity mr-20 mb-20">
                          <div className="cart-plus-minus">
                            <input type="text" />
                            <div
                             
                              className="dec qtybutton"
                            >
                              -
                            </div>
                            <div
                             
                              className="inc qtybutton"
                            >
                              +
                            </div>
                          </div>
                        </div> */}
                        <div className="pro-cart-btn">
                          <a
                            
                            onClick={() => addtocartH(productDetail)}
                            className="add-cart-btn mb-20"
                          >
                            + Add to Cart
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="product__share">
                    <span>Share :</span>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="shop__bottom">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <div className="product__details-tab">
                  <div className="product__details-tab-nav text-center mb-45">
                    <nav>
                      <div
                        className="nav nav-tabs justify-content-start justify-content-sm-center"
                        id="pro-details"
                        role="tablist"
                      >
                        <a
                          className="nav-item nav-link active"
                          id="des-tab"
                          data-bs-toggle="tab"
                          href="#des"
                          role="tab"
                          aria-controls="des"
                          aria-selected="true"
                        >
                          Description
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="add-tab"
                          data-bs-toggle="tab"
                          href="#add"
                          role="tab"
                          aria-controls="add"
                          aria-selected="false"
                        >
                          Additional Information
                        </a>
                        <a
                          className="nav-item nav-link"
                          id="review-tab"
                          data-bs-toggle="tab"
                          href="#review"
                          role="tab"
                          aria-controls="review"
                          aria-selected="false"
                        >
                          Reviews
                        </a>
                      </div>
                    </nav>
                  </div>
                  <div className="tab-content" id="pro-detailsContent">
                    <div
                      className="tab-pane fade show active"
                      id="des"
                      role="tabpanel"
                    >
                      <div className="product__details-des">
                        <p>
                          Lorem Ipsum is simply dummy text of the printing and
                          typesetting industry. Lorem Ipsum has been the{" "}
                          {"industry's"} standard dummy text ever since the
                          1500s, when anunknown printer took a galley of type
                          and scrambled it to make a type specimen book. It has
                          survived not only five centuries, but also the leap
                          into electronic typesetting, remaining essentially
                          unchanged. It was popularised in the 1960s with the
                          release of Letraset sheets containing Lorem Ipsum
                          passages.
                        </p>

                        <div className="product__details-des-list mb-20">
                          <ul>
                            <li>
                              <span>
                                Claritas est etiam processus dynamicus.
                              </span>
                            </li>
                            <li>
                              <span>
                                Qui sequitur mutationem consuetudium lectorum.
                              </span>
                            </li>
                            <li>
                              <span>
                                Claritas est etiam processus dynamicus.
                              </span>
                            </li>
                            <li>
                              <span>
                                Qui sequitur mutationem consuetudium lectorum.
                              </span>
                            </li>
                            <li>
                              <span>
                                Claritas est etiam processus dynamicus.
                              </span>
                            </li>
                            <li>
                              <span>
                                Qui sequitur mutationem consuetudium lectorum.
                              </span>
                            </li>
                          </ul>
                        </div>
                        <p>
                          It has survived not only five centuries, but also the
                          leap into electronic typesetting, remaining
                          essentially unchanged. It was popularised in the 1960s
                          with the release.
                        </p>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="add" role="tabpanel">
                      <div className="product__details-add">
                        <ul>
                          <li>
                            <span>Weight</span>
                          </li>
                          <li>
                            <span>{productDetail?.product.weight} KG</span>
                          </li>
                          <li>
                            <span>Dimention</span>
                          </li>
                          <li>
                            <span>{productDetail?.product.dimension}</span>
                          </li>
                          <li>
                            <span>Size</span>
                          </li>
                          <li>
                            <span>{productDetail?.product.sizes}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="tab-pane fade" id="review" role="tabpanel">
                      <div className="product__details-review">
                        <div className="postbox__comments">
                          <div className="postbox__comment-title mb-30">
                            <h3>Reviews </h3>
                          </div>
                          <div className="latest-comments mb-30">
                            <ul>
                              {productDetail?.reviews?.map((review, index) => (
                                <li
                                  key={index}
                                  className={review.children ? "children" : ""}
                                >
                                  <div className="comments-box">
                                    <div className="comments-avatar">
                                      <img src={review.img} alt="" />
                                    </div>
                                    <div className="comments-text">
                                      <div className="avatar-name">
                                        <h5>{review.name}</h5>
                                        <span> - {review.time} </span>
                                        <a className="reply" href="#">
                                          Leave Reply
                                        </a>
                                      </div>
                                      <div className="user-rating">
                                        <ul>
                                          {Array.from(
                                            { length: productDetail.product.rating },
                                            (_, index) => (
                                              <li key={index}>
                                                <span>
                                                  <i className="fas fa-star"></i>
                                                </span>
                                              </li>
                                            )
                                          )}
                                        </ul>
                                        <span className="rating-no ml-10">
                                          {productDetail.product.rating} rating(s)
                                        </span>
                                      </div>
                                      <p>
                                        Many desktop publishing packages and web
                                        page editors now use Lorem Ipsum as
                                        their default model text, and a search
                                        for <span>“lorem ipsum”</span> will
                                        uncover many web sites still in their
                                        infancy. Various versions have evolved
                                        over the years, sometimes by accident,
                                        sometimes on purpose.
                                      </p>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="post-comments-form mb-100">
                          <div className="post-comments-title mb-30">
                            <h3>Your Review</h3>
                            <div className="post-rating">
                              <span>Your Rating :</span>
                              <ul>
                                <li>
                                  <a href="#">
                                    <i className="fal fa-star"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fal fa-star"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fal fa-star"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fal fa-star"></i>
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fal fa-star"></i>
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <form
                            id="contacts-form"
                            className="conatct-post-form"
                            action="#"
                          >
                            <div className="row">
                              <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="contact-icon p-relative contacts-name">
                                  <input type="text" placeholder="Name" />
                                </div>
                              </div>
                              <div className="col-xl-6 col-lg-6 col-md-6">
                                <div className="contact-icon p-relative contacts-name">
                                  <input type="email" placeholder="Email" />
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="contact-icon p-relative contacts-email">
                                  <input type="text" placeholder="Subject" />
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <div className="contact-icon p-relative contacts-message">
                                  <textarea
                                    name="comments"
                                    id="comments"
                                    cols="30"
                                    rows="10"
                                    placeholder="Comments"
                                  ></textarea>
                                </div>
                              </div>
                              <div className="col-xl-12">
                                <button
                                  className="os-btn os-btn-black"
                                  type="submit"
                                >
                                  Post comment
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
