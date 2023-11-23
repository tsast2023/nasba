// models/reviewModel.js
const mongoose = require("mongoose");


const reviewSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
  productTitle: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
