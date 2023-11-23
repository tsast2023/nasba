const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  removeFromWishlist
} = require("../controller/productController");
const router = express.Router();
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const productController = require("../controller/productController");


router.post("/", authMiddleware, isAdmin, createProduct);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.get("/:id", getaProduct);
router.post("/wishlist", authMiddleware, addToWishlist);
router.delete("/wishlist/delete/:prodId", authMiddleware, removeFromWishlist);
router.get("/", getAllProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/products/monthly-sales", productController.getMonthlyProductSales);

module.exports = router;
