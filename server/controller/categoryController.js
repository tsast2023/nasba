const Category = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

// Add New Category

const createCategory = asyncHandler(async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Category

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedCategory = await Category.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// Remove Category

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedCategory = await Category.findByIdAndDelete(id);
    res.json(deletedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a single Categroy

const getaCategroy = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getaCategroy = await Category.findById(id);
    res.json(getaCategroy);
  } catch (error) {
    throw new Error(error);
  }
});

// Get all Categroy

const getallCategroy = asyncHandler(async (req, res) => {
    try {
      const getallCategroy = await Category.find();
      res.json(getallCategroy);
    } catch (error) {
      throw new Error(error);
    }
  });

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getaCategroy,
  getallCategroy,
};
