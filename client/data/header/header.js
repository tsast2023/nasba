import logo from "../../public/assets/img/logo/logo.png";

const extra_info = [
  {
    class: "my-account",
    title: "My Account",
    listItems: [
      {action : true ,  link: "/profile", title: "My Account" , link2:"/login" , title2: "My Account"},
      { link: "/wishlist", title: "Wishlist"},
      { link: "/cart", title: "Cart" },
      { link: "/checkout", title: "Checkout"},
      { link: "/register", title: "Create Account"},
      {action : true  , link: "/logout", title: "Logout" ,  link2:"/login" , title2: "login" ,auth : true },
    ],
  },
];

export { logo, extra_info };
