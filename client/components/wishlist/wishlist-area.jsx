import Link from "next/link";
import React, { useContext } from "react";
import { GlobalState } from "../../contextM/GlobalState";
import axios from "axios";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
const WishlistArea = () => {
  const token = Cookies.get('token')
  const handleSubmit = (e) => e.preventDefault();
  const state = useContext(GlobalState);
  const wishlist1 = state.wishlist?.wishlist || [];
  console.log('the final wishlist:' , wishlist1)
 const removeProduct = async (prodId) =>{
  console.log(token)
  console.log(prodId)
  try{
    const res = await axios.delete(`http://localhost:5000/api/product/wishlist/delete/${prodId}` , { headers : {Authorization: `Bearer ${token}`}})
    console.log("delete productW:" , res.data)
    let timerInterval;
    Swal.fire({
      title: "product removed !!",
      timer: 5000,
      timerProgressBar: true,
      position: 'top-start',
      willClose: () => {
        clearInterval(timerInterval);
      }
    }).then((result) => {
      window.location.reload();
    });
  }catch(err){
    console.log(err)
  }
 }

  return (
    <>
      <section className="cart-area pt-100 pb-100">
        <div className="container">
          <div className="row">
            <div className="col-12">
              {wishlist1?.length === 0 && (
                <div className="text-center">
                  <h3>No wishlist product</h3>
                </div>
              )}
              {wishlist1?.length > 0 && (
                <form onSubmit={handleSubmit}>
                  <div className="table-content table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th className="product-thumbnail">Images</th>
                          <th className="cart-product-name">Product</th>
                          <th className="product-price">Unit Price</th>
                          <th className="product-quantity">Quantity</th>
                          <th className="product-subtotal">Total</th>
                          <th className="product-remove">Remove</th>
                        </tr>
                      </thead>
                      <tbody>
                        {wishlist1?.map((product, index) => (
                          <tr key={index}>
                            <td className="product-thumbnail">
                              <Link href={`/product-details/${product.id}`}>
                                <a>
                                  <img
                                    src={`data:image/png;base64, ${product.product.img}`}
                                    alt="product-img"
                                    key="main-img"
                                  />
                                </a>
                              </Link>
                            </td>
                            <td className="product-name">
                              <Link href={`/product-details/${product.id}`}>
                                <a>{product.product.title}</a>
                              </Link>
                            </td>
                            <td className="product-price">
                              <span className="amount">
                                {product.product.price} TND
                              </span>
                            </td>
                            <td className="product-quantity">
                            {product.product.quantity}
                            </td>
                            <td className="product-subtotal">
                              <span className="amount">
                                {product.product.price} TND
                              </span>
                            </td>
                            <td className="product-remove">
                              <button
                                onClick={() =>
                                 removeProduct(product._id)
                                }
                              >
                                <i className="fa fa-times"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default WishlistArea;
