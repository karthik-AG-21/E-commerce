
import { useState, useEffect } from "react";

function ProductForm({
    product,
    onClose,
    onSubmit,
    isSubmitting = false,
}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        brand: "",
        price: "",
        stock: "",
        rating: "",
        thumbnail: "",
    });

    useEffect(() => {
        setFormData({
            title: product?.title ?? "",
            description: product?.description ?? "",
            category: product?.category ?? "",
            brand: product?.brand ?? "",
            price: product?.price ?? "",
            stock: product?.stock ?? "",
            rating: product?.rating ?? "",
            thumbnail: product?.thumbnail ?? "",
        });
    }, [product]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        onSubmit(formData);
    }

    const inputClass = `
        block w-full min-w-0 rounded-xl
        border border-white/10 bg-[#0F1420]
        px-3 py-3 text-base text-white
        placeholder:text-zinc-500
        outline-none transition-colors
        focus:border-indigo-500
        focus:ring-2 focus:ring-indigo-500/20
        sm:px-4
    `;

    const labelClass =
        "mb-2 block text-sm font-medium text-zinc-300";

    return (
        <div className="w-full min-w-0 p-3 sm:p-5">
            <form
                onSubmit={handleSubmit}
                className="
                    mx-auto w-full min-w-0 max-w-4xl
                    rounded-2xl border border-white/10
                    bg-[#161C2A]
                    p-4 text-white shadow-lg
                    sm:p-6 lg:p-8
                "
            >
                <div className="mb-6">
                    <h2 className="text-xl font-semibold sm:text-2xl">
                        {product ? "Edit Product" : "Add New Product"}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-400">
                        {product
                            ? "Update the product details below."
                            : "Enter the details to add a new product."}
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-x-5 gap-y-5 md:grid-cols-2">
                    {/* Product Name */}
                    <div className="min-w-0">
                        <label htmlFor="title" className={labelClass}>
                            Product Name
                        </label>
                        <input
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter product name"
                            className={inputClass}
                            autoComplete="off"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="min-w-0">
                        <label htmlFor="description" className={labelClass}>
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            className={`${inputClass} min-h-28 resize-y`}
                            rows={3}
                            required
                        />
                    </div>

                    {/* Category */}
                    <div className="min-w-0">
                        <label htmlFor="category" className={labelClass}>
                            Category
                        </label>
                        <input
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Brand */}
                    <div className="min-w-0">
                        <label htmlFor="brand" className={labelClass}>
                            Brand
                        </label>
                        <input
                            id="brand"
                            name="brand"
                            value={formData.brand}
                            onChange={handleChange}
                            placeholder="Enter brand"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Price */}
                    <div className="min-w-0">
                        <label htmlFor="price" className={labelClass}>
                            Price
                        </label>
                        <input
                            id="price"
                            name="price"
                            type="number"
                            min="0.01"
                            step="0.01"
                            inputMode="decimal"
                            value={formData.price}
                            onChange={handleChange}
                            placeholder="Enter price"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Stock */}
                    <div className="min-w-0">
                        <label htmlFor="stock" className={labelClass}>
                            Stock
                        </label>
                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            min="0"
                            step="1"
                            inputMode="numeric"
                            value={formData.stock}
                            onChange={handleChange}
                            placeholder="Enter stock quantity"
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Rating */}
                    <div className="min-w-0">
                        <label htmlFor="rating" className={labelClass}>
                            Rating
                        </label>
                        <input
                            id="rating"
                            name="rating"
                            type="number"
                            step="0.1"
                            min="0"
                            max="5"
                            inputMode="decimal"
                            value={formData.rating}
                            onChange={handleChange}
                            placeholder="0 - 5"
                            className={inputClass}
                        />
                    </div>

                    {/* Thumbnail */}
                    <div className="min-w-0 md:col-span-2">
                        <label htmlFor="thumbnail" className={labelClass}>
                            Image URL
                        </label>
                        <input
                            id="thumbnail"
                            name="thumbnail"
                            type="url"
                            value={formData.thumbnail}
                            onChange={handleChange}
                            placeholder="https://example.com/image.jpg"
                            className={inputClass}
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="
                    mt-7 flex flex-col-reverse gap-3
                    border-t border-white/10 pt-5
                    sm:flex-row sm:justify-end
                ">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isSubmitting}
                        className="
                            min-h-12 w-full rounded-xl
                            bg-zinc-700 px-5 py-3
                            text-sm font-semibold text-white
                            transition-colors hover:bg-zinc-600
                            disabled:cursor-not-allowed disabled:opacity-50
                            sm:w-auto
                        "
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="
                            min-h-12 w-full rounded-xl
                            bg-indigo-600 px-5 py-3
                            text-sm font-semibold text-white
                            transition-colors hover:bg-indigo-500
                            focus-visible:outline-none
                            focus-visible:ring-2 focus-visible:ring-indigo-400
                            disabled:cursor-not-allowed disabled:opacity-50
                            sm:w-auto
                        "
                    >
                        {isSubmitting
                            ? "Saving..."
                            : product
                                ? "Update Product"
                                : "Add Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ProductForm;
