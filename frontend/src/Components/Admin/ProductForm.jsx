import { useState } from "react";

function ProductForm({ product, onClose, onSubmit }) {

    const [formData, setFormData] = useState({
        title: product?.title || "",
        category: product?.category || "",
        price: product?.price || "",
        stock: product?.stock || "",
        rating: product?.rating || "",
        thumbnail: product?.thumbnail || "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    return (
    <div className="p-5">
        <form
            onSubmit={handleSubmit}
            className="bg-[#161C2A] border border-white/10 rounded-lg p-6 max-w-4xl mx-auto shadow-lg"
        >
            <h2 className="text-xl font-semibold text-white mb-6">
                {product ? "Edit Product" : "Add New Product"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                {/* Product Name */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Product Name
                    </label>

                    <input
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Category */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Category
                    </label>

                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter category"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Price */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Price
                    </label>

                    <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Enter price"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Stock */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Stock
                    </label>

                    <input
                        name="stock"
                        type="number"
                        value={formData.stock}
                        onChange={handleChange}
                        placeholder="Enter stock"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Rating */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Rating
                    </label>

                    <input
                        name="rating"
                        type="number"
                        step="0.1"
                        min="0"
                        max="5"
                        value={formData.rating}
                        onChange={handleChange}
                        placeholder="0 - 5"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10 text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {/* Image */}
                <div>
                    <label className="block text-sm text-zinc-300 mb-2">
                        Image URL
                    </label>

                    <input
                        name="thumbnail"
                        value={formData.thumbnail}
                        onChange={handleChange}
                        placeholder="enter the url"
                        className="w-full px-3 py-2 rounded-md bg-[#0F1420] border border-white/10
                         text-white placeholder-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 mt-7">

                <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2 rounded-md bg-zinc-700 text-white hover:bg-zinc-600 transition">
                    Cancel
                </button>

                <button
                    type="submit"
                    className="px-5 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition">
                    {product ? "Update Product" : "Add Product"}
                </button>

            </div>
        </form>
    </div>
);
}

export default ProductForm;