import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        // User who placed the order
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        // Products included in the order
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },

                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },

                // Price at the time the order was placed
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },
            },
        ],

        // Total amount of the order
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },

        // Delivery address
        address: {
            name: {
                type: String,
                required: true,
                trim: true,
            },

            phone: {
                type: String,
                required: true,
                trim: true,
            },

            street: {
                type: String,
                required: true,
                trim: true,
            },

            city: {
                type: String,
                required: true,
                trim: true,
            },

            state: {
                type: String,
                required: true,
                trim: true,
            },

            zipCode: {
                type: String,
                required: true,
                trim: true,
            },
        },

        // Payment method selected by the customer
        paymentMethod: {
            type: String,
            enum: ["COD", "UPI"],
            required: true,
        },

        // Order status
        status: {
            type: String,
            enum: [
                "pending",
                "processing",
                "shipped",
                "delivered",
                "cancelled",
            ],
            default: "pending",
        },

        // Payment status
        paymentStatus: {
            type: String,
            enum: ["pending", "paid", "failed", "refunded"],
            default: "pending",
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;