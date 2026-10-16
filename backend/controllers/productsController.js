import Product from "../models/productSchema.js";


// Escape user input before using it in a regular expression
const escapeRegex = (value) =>
    value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export const getProducts = async (req, res) => {
    try {
        const {
            search = "",
            category = "all",
            brand = "all",
            sort = "newest",
            page = "1",
            limit = "12",
        } = req.query;

        // 1. Validate pagination
        const currentPage = Math.max(1, parseInt(page, 10) || 1);
        const pageSize = Math.min(
            50,
            Math.max(1, parseInt(limit, 10) || 12)
        );

        // 2. Build filters
        const filter = {};

        if (category !== "all" && category.trim()) {
            filter.category = category.trim();
        }

        if (brand !== "all" && brand.trim()) {
            filter.brand = {
                $regex: `^${escapeRegex(brand.trim())}$`,
                $options: "i",
            };
        }

        // Search product name, brand, and description
        if (search.trim()) {
            const searchRegex = {
                $regex: escapeRegex(search.trim()),
                $options: "i",
            };

            filter.$or = [
                { name: searchRegex },
                { brand: searchRegex },
                { description: searchRegex },
            ];
        }

        // 3. Sorting
        const sortOptions = {
            newest: { createdAt: -1, _id: -1 },
            "low-high": { price: 1, _id: 1 },
            "high-low": { price: -1, _id: -1 },
            rating: { rating: -1, _id: -1 },
        };

        const sortBy = sortOptions[sort] || sortOptions.newest;

        // 4. Fetch products and count matching results
        const [products, totalProducts] = await Promise.all([
            Product.find(filter)
                .sort(sortBy)
                .skip((currentPage - 1) * pageSize)
                .limit(pageSize)
                .lean(),

            Product.countDocuments(filter),
        ]);

        // 5. Send response
        const totalPages = Math.ceil(totalProducts / pageSize);

        return res.status(200).json({
            success: true,
            data: products,
            pagination: {
                currentPage,
                limit: pageSize,
                totalProducts,
                totalPages,
                hasNextPage: currentPage < totalPages,
                hasPrevPage: currentPage > 1 && totalProducts > 0,
            },
            message: "Products fetched successfully",
        });
    } catch (error) {
        console.error("Error fetching products:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getProductById = async (req, res) => {
    try {

        const id = String(req.params.id);

        if (!id) {
            return res.status(400).json({ success: false, message: "id is not defined" })
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ success: false, message: "data is not found" });
        }


        res.status(200).json({ success: true, data: product, message: "data fetched successfully" })


    } catch (error) {
        console.log(error);

        res.status(500).json({ success: false, message: "Internal server error" })
    }
};


