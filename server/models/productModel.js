const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  trending: { type: Boolean, default: true },
  product: {
    img: { type: String, required: true },
    images: [{ src: { type: String, required: true } }],
    thumb_img: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    old_price: { type: Number, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    sizes: [{ type: String }],
    colors: [{ type: String }],
    weight: { type: Number },
    dimension: { type: String },
    brand: { type: String },
    quantity: { type: String },
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
