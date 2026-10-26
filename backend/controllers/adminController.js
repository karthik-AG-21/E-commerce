
import User from "../models/User.js";

// GET /api/admin/users
export const getUsers = async (req, res) => {
    try {
        const {
            search = "",
            filter = "",
            page = 1,
            limit = 8,
        } = req.query;

        const pageNumber = Math.max(1, Number(page) || 1);
        const pageSize = Math.min(
            100,
            Math.max(1, Number(limit) || 8)
        );

        // Exclude admin accounts
        const query = {
            role: { $ne: "admin" },
        };

        // Search users by name
        if (search.trim()) {
            const escapedSearch = search.trim().replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
            );

            query.name = {
                $regex: escapedSearch,
                $options: "i",
            };
        }

        // Active / inactive filter
        if (filter === "active") {
            query.isBlocked = false;
        } else if (filter === "inactive") {
            query.isBlocked = true;
        }

        // Sorting
        const sortOptions = {
            "a-z": { name: 1, _id: 1 },
            "z-a": { name: -1, _id: 1 },
            "newest-users": { createdAt: -1, _id: -1 },
            "oldest-users": { createdAt: 1, _id: 1 },
        };

        const sort = sortOptions[filter] || {
            createdAt: -1,
            _id: -1,
        };

        // Count matching users before pagination
        const totalUsers = await User.countDocuments(query);

        const users = await User.find(query)
            .select("-password")
            .sort(sort)
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .lean();

        return res.status(200).json({
            success: true,
            users,
            pagination: {
                currentPage: pageNumber,
                totalPages: Math.ceil(totalUsers / pageSize),
                totalUsers,
                limit: pageSize,
            },
        });
    } catch (error) {
        console.error("Get users error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch users",
        });
    }
};



export const updateUserStatus = async (req, res) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;

        if (typeof status !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "Status must be a boolean",
            });
        }

        const user = await User.findOneAndUpdate(
            {
                _id: userId,
                role: { $ne: "admin" },
            },
            {
                $set: { isBlocked: status },
            },
            {
                new: true,
                runValidators: true,
            }
        ).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: status
                ? "User blocked successfully"
                : "User unblocked successfully",
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
