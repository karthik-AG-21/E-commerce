


import Wishlist from "../models/wishlistSchema.js";
import mongoose from "mongoose";

export const getWishlist = async (req, res) => {
    try {
        const userId = req.user.id;

        const page = Math.max(1,parseInt(req.query.page, 10) || 1);

        const limit = Math.max(1,parseInt(req.query.limit, 10) || 5);

        const skip = (page - 1) * limit;

        const wishlist = await Wishlist.findOne({user: userId,}).populate("items.product");

        if (!wishlist) {
            return res.status(200).json({
                success: true,
                data: [],
                wishlistProductIds: [],
                pagination: {
                    currentPage: page,
                    limit,
                    totalItems: 0,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false,
                },
                message: "Wishlist is empty",
            });
        }

        const totalItems = wishlist.items.length;
        const totalPages = Math.ceil(totalItems / limit);

        
        const wishlistProductIds = wishlist.items.map((item) => {const product = item.product;
                return product?._id ? String(product._id) : product ? String(product) : null;
            }).filter(Boolean);

            console.log(wishlistProductIds, "ids")
       
        const paginatedItems = wishlist.items.slice(skip,skip + limit);

        return res.status(200).json({
            success: true,
            data: paginatedItems,
            wishlistProductIds,
            pagination: {
                currentPage: page,
                limit,
                totalItems,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
            message: "Wishlist fetched successfully",
        });
    } catch (error) {
        console.error("Get wishlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const addToWishlist = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.body;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const normalizedProductId = String(productId);

        let wishlist = await Wishlist.findOne({user: userId,});

        if (!wishlist) {
            wishlist = await Wishlist.create({user: userId , items: [{ product: productId }],});

            return res.status(201).json({
                success: true,
                data: wishlist,
                message: "Product added to wishlist",
            });
        }

        const exists = wishlist.items.some((item) =>String(item.product?._id ?? item.product) === normalizedProductId);

        if (exists) {
            return res.status(409).json({
                success: false,
                message: "Product already exists in wishlist",
            });
        }

        wishlist.items.push({product: productId,});

        await wishlist.save();

        return res.status(201).json({
            success: true,
            data: wishlist,
            message: "Product added to wishlist",
        });
    } catch (error) {
        console.error("Add wishlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const removeFromWishlist = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user.id;

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "Product ID is required",
            });
        }

        if (!mongoose.isValidObjectId(productId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid product ID",
            });
        }

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            {$pull: {items: { product: productId }, },},
            { returnDocument: "after" }
        );

        if (!wishlist) {
            return res.status(404).json({
                success: false,
                message: "Wishlist not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: wishlist,
            message: "Product removed from wishlist successfully",
        });
    } catch (error) {
        console.error("Remove wishlist error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
