import React , {createContext , useState , useEffect} from 'react'
import  axios, { all }  from 'axios'
import Cookies from "js-cookie"

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
  //states:
  const token = Cookies.get('token');
  const [allProducts , setAllProducts] = useState();
  const [wishlist , setWishlist] = useState();
  const [productDetail ,SetProductDetail] = useState();
  const [cart , setToCart] = useState([]);
  const [quantity , setQuantity] = useState(0)
  const [category , setCategory] = useState();
  const [sort , setSort] = useState("createdAt");
  const [page , setPage] = useState(1);
  const [ maxprice , setMaxPrice] = useState(0);

  useEffect(()=>{
  
    initializeCart();
    setQuantity((JSON.parse(localStorage.getItem('cart'))).length)
    const getData = async () => {
        try {
          const url = `http://localhost:5000/api/product?limit=6&page=${page}&sort=${sort}&product.price[gte]=${maxprice}`
          if(category){
            url += `&product.category=${category}`
          }
          const res = await axios.get(url);
          console.log(console.log("all products from context:" , res.data))
          setAllProducts(res.data);
          console.log(allProducts.length)
        } catch (error) {
          console.log(error);
        }
      };

      getData();
      initializeCart();
      
  if(token){
    const getWishlist = async () =>{
        console.log(token)
        const res = await axios.get("http://localhost:5000/api/user/wishlist",{headers : {Authorization: `Bearer ${token}`}});
        console.log("wishlist:",res.data)
        setWishlist(res.data)

      }
      getWishlist();
      }


  } , [token , sort  , category , maxprice , page ]);




  const initializeCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    if (!storedCart) {
      
      localStorage.setItem('cart', JSON.stringify([]));
    }
  };
  
 
  const addtocart = (product) => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = [...storedCart, product];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };
  
  
  const removeItemFromCart = (productId) => {
    const storedCart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = storedCart.filter(product => product._id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.location.reload();
  };
 
  const setProductDetailData = (data) => {
    SetProductDetail(data);
  };
  const clearCart = () => {
    localStorage.removeItem('cart'); 
    window.location.reload();
  };

  //filter , sorting and Pagination functions
  const Sorting= (sorting  ) =>{
    setSort(sorting);
  }
  const Categories = (Ctegories)=>{
    setCategory(Ctegories)
  }
  const maxPrice = (value)=>{
    setMaxPrice(value)
  }
  const Pagination = (action) => {
    if (action === 'next' && allProducts.length >= 6) {
      setPage(page + 1);
    } else if (action === 'prev' && page > 1) {
      setPage(page - 1);
    }
  };

  const state ={
    
    AllProducts : allProducts,
    wishlist :wishlist,
    productDetail : productDetail,
    cart : cart,
    quantity: quantity,
    price : maxprice,
    pagess : page
    
    



  }

  return(
    <GlobalState.Provider value={{ ...state, SetProductDetail: setProductDetailData , addtoCart : addtocart , removeItemFromCart : removeItemFromCart , initializeCart:initializeCart , clearCart: clearCart , Sorting : Sorting , Categories:Categories , maxPrice : maxPrice , Pagination : Pagination }}>
        {children}
    </GlobalState.Provider>
  )
}