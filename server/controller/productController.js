const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");


class APIfeatures {
  constructor(query , queryString){
      this.query=query;
      this.queryString= queryString;
  }
  filtering(){
     const queryObj = {...this.queryString} //queryString = req.query
     const exludedFileds = ['page', 'sort' , 'limit']
     exludedFileds.forEach(el => delete(queryObj[el]))
     let queryStr = JSON.stringify(queryObj)
     queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g , match => '$' + match)
     this.query.find(JSON.parse(queryStr))
      return this ;
  }
  sorting(){
      if(this.queryString.sort){
          const sortBy = this.queryString.sort.split(',').join(' ')
          console.log(sortBy)
          this.query = this.query.sort(sortBy)
      }else{
          this.query = this.query.sort('-createdAt')
      }
      return this ; 
  }
  paginating(){ 
      const page = this.queryString.page * 1 || 1
      const limit = this.queryString.limit * 1 || 9
      const skip = (page-1) * limit
      this.query = this.query.skip(skip).limit(limit )
       return this ; 
  }
}
const createProduct = asyncHandler(async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Product

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const updateProduct = await Product.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          "product.img": req.body.product.img,
          "product.images": req.body.product.images,
          "product.thumb_img": req.body.product.thumb_img,
          "product.category": req.body.product.category,
          "product.title": req.body.product.title,
          "product.price": req.body.product.price,
          "product.old_price": req.body.product.old_price,
          "product.rating": req.body.product.rating,
          "product.description": req.body.product.description,
          "product.sizes": req.body.product.sizes,
          "product.colors": req.body.product.colors,
          "product.weight": req.body.product.weight,
          "product.dimension": req.body.product.dimension,
          "product.brand": req.body.product.brand,
          "product.quantity": req.body.product.quantity,
        },
      },
      { new: true }
    );
    console.log(updateProduct);
    res.json(updateProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// delete Product

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await Product.findOneAndDelete(
      { _id: id },
      { $set: req.body },
      { new: true }
    );
    res.json(deleteProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get A Product

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Get All Product

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }

    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json({message :"product already added"});
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});
const removeFromWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.params;
  try {
    const user = await User.findById(_id);
    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

    if (alreadyAdded) {
      const updatedUser = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );

      res.json(updatedUser);
    } else {
      res.status(400).json({ message: "Product not found in wishlist" });
    }
  } catch (error) {
    throw new Error(error);
  }
});



const getMonthlyProductSales = asyncHandler(async (req, res) => {
  try {
    const productSales = await Product.aggregate([
      {
        $unwind: "$sales",
      },
      {
        $group: {
          _id: {
            month: { $month: "$sales.date" },
            year: { $year: "$sales.date" },
          },
          totalSales: { $sum: "$sales.amount" },
        },
      },
    ]);

    res.json(productSales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error retrieving monthly product sales" });
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  getMonthlyProductSales,
  removeFromWishlist
};
