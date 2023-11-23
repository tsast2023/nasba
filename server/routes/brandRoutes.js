const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createBrand, updateBrand, deleteBrand, getaBrand, getallBrand } = require("../controller/brandController");
const router = express.Router();


router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getaBrand);
router.get("/", getallBrand);

module.exports = router;