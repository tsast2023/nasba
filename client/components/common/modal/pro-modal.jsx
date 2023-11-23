import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Link from "next/link";

function ModalPro(props) {
  const [show, setShow] = useState(false);
  const product = props.product;
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmit = (e) => e.preventDefault();

  const modalStyle = {
    maxWidth: "100%",
    margin: "auto",
  };

  return (
    <>
      <a onClick={handleShow} href="#">
        <i className="fal fa-search"></i>
      </a>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        style={modalStyle}
      >
        <Modal.Body>
          <>
            <div className="modal-content">
              <div className="product__modal-wrapper p-relative">
                <div className="product__modal-close p-absolute">
                  <button onClick={handleClose}>
                    <i className="fal fa-times"></i>
                  </button>
                </div>
                <div className="product__modal-inner">
                  <div className="row">
                    <div className="col-xl-5 col-lg-5 col-md-6 col-sm-12 col-12">
                      <div className="product__modal-box">
                        <div className="tab-content mb-20" id="nav-tabContent">
                          {product.product.images?.map((img, index) => (
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
                                  src={`data:image/png;base64, ${product.product.img}`}
                                  alt=""
                                />
                              </div>
                            </div>
                          ))}
                        </div>

                        <nav>
                          <div
                            className="nav nav-tabs justify-content-between"
                            id="nav-tab"
                            role="tablist"
                          >
                            {product.product.images?.map((img, index) => (
                              <a
                                key={index}
                                className={`nav-item nav-link ${
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
                                    src={`data:image/png;base64, ${product.product.img}`}
                                    alt=""
                                  />
                                </div>
                              </a>
                            ))}
                          </div>
                        </nav>
                      </div>
                    </div>
                    <div className="col-xl-7 col-lg-7 col-md-6 col-sm-12 col-12">
                      <div className="product__modal-content">
                        <h4>
                          <Link
                            href={`/product-details/${product?.product.id}`}
                          >
                            <a>{product.product.title}</a>
                          </Link>
                        </h4>
                        <div className="rating rating-shop mb-15">
                          <ul>
                            {Array.from(
                              { length: product.product.rating },
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
                            {product.product.rating} rating(s)
                          </span>
                        </div>
                        <div className="product__price-2 mb-25">
                          <span>{product.product.price} TND</span>
                          <span className="old-price">
                            {product.product.old_price} TND
                          </span>
                        </div>
                        <div className="product__modal-des mb-30">
                          <p>{product.product.description}</p>
                        </div>
                        <div className="product__modal-form">
                          <form onSubmit={handleSubmit}>
                            <div className="product__modal-input size mb-20">
                              <label>
                                Size <i className="fas fa-star-of-life"></i>
                              </label>
                              <select>
                                <option>- Please select -</option>
                                {product.product.sizes?.map((size, index) => (
                                  <option key={index}>{size}</option>
                                ))}
                              </select>
                            </div>
                            <div className="product__modal-input color mb-20">
                              <label>
                                Color <i className="fas fa-star-of-life"></i>
                              </label>
                              <select>
                                <option>- Please select -</option>
                                {product.product.colors?.map((color, index) => (
                                  <option key={index}>{color}</option>
                                ))}
                              </select>
                            </div>

                            <div className="pro-quan-area d-lg-flex align-items-center">
                              <div className="pro-cart-btn">
                                {/* <button
                                  onClick={() =>
                                    dispatch(cart_product(product))
                                  }
                                  className="os-btn os-btn-black os-btn-3 mr-10 text-center"
                                >
                                  + Add to Cart
                                </button> */}
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
          </>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalPro;
