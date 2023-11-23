import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Slider from "react-slick";
import axios from "axios";
import Swal from "sweetalert2";
import ProductModal from "../modal/product-modal";
import { GlobalState } from "../../../contextM/GlobalState";
import { useState, useEffect , useContext } from "react";
import Cookies from "js-cookie";
// slider setting
const settings = {
  autoplay: true,
  autoplaySpeed: 10000,
  arrows: false,
  infinite: true,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
      },
    },
    {
      breakpoint: 992,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 576,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const BannerTwo = () => {
  const {SetProductDetail} = useContext(GlobalState);
  const {addtoCart} = useContext(GlobalState)
  const state = useContext(GlobalState);
  const detailProduct = state.productDetail;
  const token = Cookies.get("token")
  const [pro, setPro] = useState();
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/product");
      setPro(res.data);
      console.log("data from sales:", res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addtocartH = (newItem)=>{
    addtoCart(newItem);
  }
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
  useEffect(() => {
    getData();
    console.log("sallle");
    console.log(pro);
  }, []);
  return (
    <>
      <section className="sale__area pb-100">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="section__title-wrapper text-center mb-55">
                {/* <div className="section__title mb-10">
                  <h2>Top Products</h2>
                </div>
                <div className="section__sub-title">
                  <p>
                    Mirum est notare quam littera gothica quam nunc putamus
                    parum claram!
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-xl-12">
              <div className="sale__area-slider">
                <Slider {...settings}>
                  {pro?.slice(0, 6).map((item, index) => {
                    return (
                      <div key={index} className="sale__item">
                        <div className="product__wrapper mb-60">
                          <div className="product__thumb">
                            <Link href={`/product-details/${item.id}`}>
                              <a onClick={()=>{SetProductDetail(item) ; console.log(detailProduct)}} className="w-img">
                                <img src={`data:image/png;base64, ${item.product.img}`} />
                                <img
                                  className="product__thumb-2"
                                  src={`data:image/png;base64, ${item.product.img}`}
                                  alt="product-img"
                                />
                              </a>
                            </Link>
                            <div className="product__action transition-3">
                              <button
                                onClick={() => AddtowishL(item._id)}
                                data-bs-toggle="tooltip"
                                data-bs-placement="top"
                                title="Add to Wishlist"
                              >
                                <i className="fal fa-heart"></i>
                              </button>
                              <Link href={`/product-details/${item.id}`}>
                                <a
                                onClick={()=>{SetProductDetail(item) ; console.log(detailProduct)}}
                                  data-bs-toggle="tooltip"
                                  data-bs-placement="top"
                                  title="Details"
                                >
                                  <i className="fal fa-link"></i>
                                </a>
                              </Link>
                              {/* <!-- Button trigger modal --> */}
                              {/* <a
                                onClick={() =>
                                  AddtowishL(item._id)
                                }
                                href="#"
                                data-bs-toggle="modal"
                                data-bs-target="#productModalId"
                              >
                                <i className="fal fa-search"></i>
                              </a> */}
                            </div>
                            {item.product__sale && (
                              <div className="product__sale">
                                {item.product__sale.map((item, index) => (
                                  <span
                                    key={index}
                                    className={`${
                                      item === "new" ? "new" : "percent"
                                    }`}
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
                                <Link href={`/product-details/${item.id}`}>
                                  <a>{item.product.title}</a>
                                </Link>
                              </h4>
                              <div className="product__price transition-3">
                                <span>{item.product.price}.00 TND</span>
                                <span className="old-price">
                                  {item.product.old_price}.00 TND
                                </span>
                              </div>
                            </div>
                            <div className="add-cart p-absolute transition-3">
                              <button
                                onClick={() => addtocartH(item)}
                              >
                                + Add to Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* product modal start */}
      <ProductModal />
      {/* product modal end */}
    </>
  );
};

export default BannerTwo;
