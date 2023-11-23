import { useEffect, useState , useContext } from "react";
import ReactPaginate from "react-paginate";
import Link from "next/link";
import Pagination from "../pagination";
import axios from "axios";
import { GlobalState } from "../../../contextM/GlobalState";
import Swal from "sweetalert2";
import ModalPro from "../modal/pro-modal";
import Cookies from "js-cookie";
function ProductGrid({
  itemsPerPage,
  col = "col-xl-4 col-lg-4 col-md-6 col-sm-6 custom-col-10",
  items,
  setShowing,
}) {
  
  const state = useContext(GlobalState);
  const Produits = state.AllProducts;
  const {SetProductDetail} = useContext(GlobalState);
  const {addtoCart , removeItemFromCart} = useContext(GlobalState)
  const detailProduct = state.productDetail
  const cart = state.cart
  const { Pagination } = useContext(GlobalState);
  const pagess = state.pagess
  const token = Cookies.get("token")
  const AddtowishL = async(prodId) =>{
    console.log("id:",prodId);
  try{
      const res = await axios.post("http://localhost:5000/api/product/wishlist" , { prodId } ,{headers : {Authorization: `Bearer ${token}`}} )
      console.log("product wished added!!",res.data)
      let timerInterval;
  Swal.fire({
    title: "product wished added!!",
    html: "you can remove it from wishlist page",
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
  const addtocartH = (newItem)=>{
    addtoCart(newItem);
    console.log(cart);
  
  }
  const handleNextPage = () => {
    Pagination('next');
    console.log("pages",pagess) 
  };
  
  const handlePrevPage = () => {
    Pagination('prev');
    console.log("pages",pagess) 
  };
  

  

 

  return (
    <>
      {Produits &&
        Produits.map((product, index) => (
          <div key={index} className={col}>
            <div className="product__wrapper mb-60">
              <div className="product__thumb">
                <Link href={`/product-details/${product.id}`}>
                  <a onClick={()=>{SetProductDetail(product) ; console.log(detailProduct)}} className="w-img">
                    <img
                      src={`data:image/png;base64, ${product.product.img}`}
                      alt="product-img"
                      key="main-img"
                    />
                    {product.product.thumb_img && (
                      <img
                        className="product__thumb-2"
                        src={`data:image/png;base64, ${product.product.thumb_img}`}
                        alt="product-thumb-img"
                        key="thumb-img"
                      />
                    )}
                  </a>
                </Link>
                <div className="product__action transition-3">
                  <button
                  onClick={() => AddtowishL(product._id)}
                    data-bs-toggle="tooltip"
                    data-bs-placement="top"
                    title="Add to Wishlist"
                  >
                    <i className="fal fa-heart"></i>
                  </button>
                  <Link href={`/product-details/${product._id}`}>
                    <a onClick={()=>{SetProductDetail(product) ; console.log(detailProduct)}}
                      data-bs-toggle="tooltip"
                      data-bs-placement="top"
                      title="Details"
                    >
                      <i className="fal fa-link"></i>
                    </a>
                  </Link>
                  {/* <!-- Button trigger modal --> */}
                  {/* <ModalPro product={product} /> */}
                </div>

                {product.product__sale && (
                  <div className="product__sale">
                    {product.product__sale.map((item, index) => (
                      <span
                        key={index}
                        className={`${item === "new" ? "new" : "percent"}`}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              <div className="product__content p-relative">
                <div className="product__content-inner">
                  <h4>
                    <Link href={`/product-details/${product.id}`}>
                      <a>{product.product.title}</a>
                    </Link>
                  </h4>
                  <div className="product__price transition-3">
                    <span>{product.product.price} TND</span>
                    {product.old_price && (
                      <span className="old-price">
                        {product.product.old_price} TND
                      </span>
                    )}
                  </div>
                </div>
                <div className="add-cart p-absolute transition-3">
                  <button  onClick={() => addtocartH(product)}>+ Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
        ))}

      <div className="row mt-35">
        <div className="col-xl-12">
          <div>
          <div style={{display: "flex" , justifyContent : "space-between"}}>
            <button style={{padding: "5px 20px"}} onClick={handlePrevPage} >{'<< prev'}</button>
            <button style={{padding: "5px 20px"}} onClick={handleNextPage} >{"next >>"}</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductGrid;
