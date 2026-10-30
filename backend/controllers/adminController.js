import mongoose from "mongoose";
import Order from "../models/orderSchema.js";
import Product from "../models/productSchema.js";
import User from "../models/userSchema.js";


export const getAllUsers = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;

        const search = req.query.search || "";
        const filter = req.query.filter || "";
        const sort = req.query.sort || "newest-users";


        const query = { role: { $ne: "admin" } };

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        // Filter users
        if (filter === "active") {
            query.isBlocked = false;
        } else if (filter === "inactive") {
            query.isBlocked = true;
        }


        let sortOption = { createdAt: -1 };

        if (sort === "a-z") sortOption = { name: 1 };
        if (sort === "z-a") sortOption = { name: -1 };
        if (sort === "oldest-users") sortOption = { createdAt: 1 };

        
        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query).select("-password").sort(sortOption).skip((page - 1) * limit).limit(limit);

        const usersWithOrders = [];

        for (const user of users) {
            const orderCount = await Order.countDocuments({
                user: user._id,
            });

            usersWithOrders.push({
                ...user.toObject(),
                orders: orderCount,
            });
        }

        return res.status(200).json({
            success: true,
            data: usersWithOrders,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalUsers / limit),
                totalUsers,
                limit,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


export const blockUser = async (req, res) => {
    try {

        const { userId, status } = req.body;

        if (typeof status !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Status must be a boolean",
            });
        }

        const user = await User.findOneAndUpdate({ _id: userId, role: { $ne: "admin" }, }, { $set: { isBlocked: status }, },
            { returnDocument: "after" , runValidators: true, }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: status ? "User blocked successfully" : "User unblocked successfully",
            user,
        });
    } catch (error) {
        console.error("Update user status error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update user status",
        });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const search = req.query.search || "";
        const filter = req.query.filter || "";

        const query = { isDeleted: { $ne: true }, };

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { category: { $regex: search, $options: "i" } },
            ];
        }

        const sortOptions = {
            "high-low": { price: -1 },
            "low-high": { price: 1 },
            rating: { rating: -1 },
            stock: { stock: -1 },
        };

        const sortOption = sortOptions[filter] || { _id: -1 };

        const [products, totalProducts] = await Promise.all([
            Product.find(query).sort(sortOption).skip((page - 1) * limit).limit(limit),

            Product.countDocuments(query),
        ]);

        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalProducts / limit),
                totalProducts,
                limit,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const sku = `PROD-${Date.now()}`;

        const { title, description, category, price, stock,
            rating, brand, thumbnail, images } = req.body;

        
        if (!title?.trim() || !description?.trim() || !category?.trim() || !brand?.trim() || !sku?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category, brand, and SKU are required",
            });
        }


        if (price == null || !Number.isFinite(Number(price)) || Number(price) <= 0) {
            return res.status(400).json({
                success: false,
                message: "Price must be greater than 0",
            });
        }

        
        if (stock == null || !Number.isFinite(Number(stock)) || Number(stock) < 0 ) {
            return res.status(400).json({success: false, message: "Stock must be zero or greater", });
        }



        
        const product = await Product.create({
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            price: Number(price),
            stock: Number(stock),
            rating: Number(rating ?? 0),
            brand: brand.trim(),
            sku: sku,
            thumbnail,
            images: images ?? [],
        });

        return res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        console.error("Create product error:", error);

        // Mongoose validation
        if (error.name === "ValidationError") {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            description,
            category,
            brand,
            price,
            stock,
            rating,
            thumbnail,
            images,
        } = req.body;

        
        if (!id || !mongoose.isObjectIdOrHexString(id)) {
            return res.status(400).json({success: false, message: "Invalid product ID",});
        }

        
        const existingProduct = await Product.findById(id);

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        
        if (!title?.trim() || !description?.trim() || !category?.trim() || !brand?.trim()) {
            return res.status(400).json({
                success: false,
                message: "Title, description, category and brand are required",
            });
        }

        
        if ( price === undefined || price === null || price === "" || !Number.isFinite(Number(price)) || Number(price) <= 0) {

            return res.status(400).json({success: false, message: "Price must be greater than 0",});
        }

        // Validate stock
        if (stock === undefined || stock === null || stock === "" || !Number.isInteger(Number(stock)) || Number(stock) < 0 ) {

            return res.status(400).json({
                success: false,
                message: "Stock must be a non-negative integer",
            });
        }

        
        if ( rating !== undefined &&(!Number.isFinite(Number(rating)) || Number(rating) < 0 || Number(rating) > 5 )) {
            return res.status(400).json({
                success: false,
                message: "Rating must be between 0 and 5",
            });
        }

        
        const updateData = {
            title: title.trim(),
            description: description.trim(),
            category: category.trim(),
            brand: brand.trim(),
            price: Number(price),
            stock: Number(stock),
        };

        if (rating !== undefined) {
            updateData.rating = Number(rating);
        }

        if (thumbnail !== undefined) {
            updateData.thumbnail = thumbnail;
        }

        if (images !== undefined) {
            updateData.images = images;
        }

       
        const updatedProduct = await Product.findByIdAndUpdate(id,
            { $set: updateData },
            { returnDocument: "after", runValidators: true });

        return res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: updatedProduct,});

    } catch (error) {
        console.error("Update product error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update product",
            error: error.message,
        });
    }
};



export const softDeleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            { $set: { isDeleted: true } },
            { returnDocument: "after", runValidators: true });

        if (!product) {
            return res.status(404).json({success: false, message: "Product not found",});
        }

        return res.status(200).json({
            success: true, message: "Product moved to trash successfully", data: product,
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};



export const getTrashProducts = async (req, res) => {
    try {
        const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
        const limit = Math.max(1, Number.parseInt(req.query.limit, 10) || 8);
        const skip = (page - 1) * limit;

        const query = { isDeleted: true };

        const [products, totalProducts] = await Promise.all([
            Product.find(query).sort({ updatedAt: -1 }).skip(skip).limit(limit),

            Product.countDocuments(query),
        ]);

        return res.status(200).json({success: true, data: products,
            pagination: { 
                currentPage: page, 
                totalProducts,
                 totalPages: Math.ceil(totalProducts / limit), 
                 limit,
                },});

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
export const restoreTrashProducts = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            { isDeleted: false },
            { returnDocument: "after" }
        );

        if (!product) {
            return res.status(404).json({success: false,message: "Product not found"});
        }

        res.status(200).json({success: true,message: "Product restored successfully",product});

    } catch (error) {

        console.log(error);

        res.status(500).json({success: false, message: "Internal server error"});
    }
};


export const DeleteProduct = async (req, res) => {
    try {

        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id)

        if (!product) {
            return res.status(404).json({ success: false, message: "Product is not found" })
        }

        res.status(200).json({ success: true, message: "product deleted successfull" })

    } catch (error) {
        console.log(error)

        res.status(500).json({ success: false, message: "Internal server error" })
    }
}


export const getAllOrders = async (req, res) => {
    try {
        
        const params = {...req.query, ...req.body,};

        const page = Math.max(1, parseInt(params.page, 10) || 1);
        const limit = Math.min(100,Math.max(1, parseInt(params.limit, 10) || 8));

        const search = String(params.search || "").trim();
        const filter = String(params.filter || "").trim();

       
        const sortOptions = {
            newest: { orderedAt: -1, _id: -1 },
            oldest: { orderedAt: 1, _id: 1 },
            "low-high": { totalAmount: 1, _id: 1 },
            "high-low": { totalAmount: -1, _id: -1 },
        };

        
        const allowedStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        const query = {};

        if (allowedStatuses.includes(filter)) {
            query.status = filter;
        }

        
        const sort = sortOptions[filter] || sortOptions.newest;

        
        if (search) {
            const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

            const regex = new RegExp(escapedSearch, "i");

            query.$or = [
                { id: regex },
                { "address.name": regex },
                { paymentMethod: regex },
                { status: regex },
            ];
        }

        const skip = (page - 1) * limit;

        const [orders, totalOrders] = await Promise.all([
            Order.find(query).sort(sort).skip(skip).limit(limit).lean(),

            Order.countDocuments(query),
        ]);

        const totalPages = Math.ceil(totalOrders / limit);

        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: orders,
            pagination: {
                currentPage: page,
                limit,
                totalOrders,
                totalPages,
                hasNextPage: page < totalPages,
                hasPrevPage: page > 1,
            },
        });
    } catch (error) {
        console.error("GET ALL ORDERS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
        });
    }
};


export const updateOrderStatus = async (req, res) => {
    try {
        const { userId, orderId } = req.params;
        const { status } = req.body;

        const validStatuses = [
            "Pending",
            "Processing",
            "Shipped",
            "Delivered",
            "Cancelled",
        ];

        if (!validStatuses.includes(status)) {

            return res.status(400).json({success: false, message: "Invalid order status" });
        }

        const order = await Order.findOneAndUpdate(
            {_id: orderId,user: userId,},
            {$set: { status: status.toLowerCase() },},
            { returnDocuments: true,  runValidators: true  }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            data: order,
        });
    } catch (error) {
        console.error("UPDATE ORDER STATUS ERROR:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to update order status",
        });
    }
};