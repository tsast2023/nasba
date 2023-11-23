const express = require("express");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const { createCategory, updateCategory, deleteCategory, getaCategroy, getallCategroy } = require("../controller/categoryController");
const router = express.Router();


router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getaCategroy);
router.get("/", getallCategroy);

module.exports = router;