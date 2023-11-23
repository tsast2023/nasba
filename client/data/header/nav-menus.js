const nav_menus = [
  {
    link: "/",
    title: "Home",
    hasDropdown: false,
    megamenu: false,
    dropdownItems: [
      { link: "/", title: "Home Style 1" },
    
    ],
  },
  {
    link: "/profile",
    title: "Profile",
  },
  {
    link: "/shop",
    title: "Shop",
    hasDropdown: false,
    megamenu: false,
    dropdownItems: [
      {
        link: "/shop",
        title: "Shop Pages",
        dropdownMenu: [
          { link: "/shop", title: "Standard Shop Page" },
          { link: "/shop-right", title: "Shop Right Sidebar" },
          { link: "/shop-4-col", title: "Shop 4 Column" },
          { link: "/shop-3-col", title: "Shop 3 Column" },
          { link: "/shop", title: "Shop Page" },
          { link: "/shop", title: "Shop Page" },
          { link: "/shop", title: "Shop Infinity" },
        ],
      },
      {
        link: "/shop",
        title: "Products Pages",
        dropdownMenu: [
          { link: "/product-details", title: "Product Details" },
          { link: "/product-details", title: "Product Page V2" },
          { link: "/product-details", title: "Product Page V3" },
          { link: "/product-details", title: "Product Page V4" },
          { link: "/product-details", title: "Simple Product" },
          { link: "/product-details", title: "Variable Product" },
          { link: "/product-details", title: "External Product" },
        ],
      },
      {
        link: "/shop",
        title: "Other Shop Pages",
        dropdownMenu: [
          { link: "/wishlist", title: "Wishlist" },
          { link: "/cart", title: "Shopping Cart" },
          { link: "/checkout", title: "Checkout" },
          { link: "/register", title: "Register" },
          { link: "/login", title: "Login" },
        ],
      },
    ],
  },
  {
    link: "/wishlist",
    title: "Wishlist",
    hasDropdown: false,
    megamenu: false,
    dropdownItems: [
      { link: "/blog", title: "Blog" },
      { link: "/blog-left-sidebar", title: "Blog Left Sidebar" },
      { link: "/blog-no-sidebar", title: "Blog No Sidebar" },
      { link: "/blog-2-col", title: "Blog 2 Column" },
      { link: "/blog-2-col-mas", title: "Blog 2 Column Masonary" },
      { link: "/blog-3-col", title: "Blog 3 Column" },
      { link: "/blog-details", title: "Blog Details" },
    ],
  },
  {
    link: "/contact",
    title: "Contact",
  },
];

export default nav_menus;
