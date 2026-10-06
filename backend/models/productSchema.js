import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },

    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    tags: {
      type: [String],
      default: [],
    },

    brand: {
      type: String,
      required: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
    },

    weight: {
      type: Number,
    },

    dimensions: {
      width: Number,
      height: Number,
      depth: Number,
    },

    warrantyInformation: {
      type: String,
    },

    shippingInformation: {
      type: String,
    },

    availabilityStatus: {
      type: String,
    },

    returnPolicy: {
      type: String,
    },

    minimumOrderQuantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    images: {
      type: [String],
      default: [],
    },

    thumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;