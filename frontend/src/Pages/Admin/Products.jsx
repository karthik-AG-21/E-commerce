
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import ProductForm from "../../Components/Admin/ProductForm";

import useAddProduct from "../../hooks/Admin/useAddProducts";
import useUpdateProduct from "../../hooks/Admin/useUpdateProducts";
import useDeleteProduct from "../../hooks/Admin/useDeleteProduct";
import useGetAllProducts from "../../hooks/Admin/useGetAllProducts";

import { toast } from "react-toastify";

function AdminProducts() {
    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    // Fetch products from backend
    const {
        data: response,
        isLoading: prodIsLoading,
        error: prodError,
    } = useGetAllProducts({
        page: currentPage,
        limit: 8,
        search,
        filter,
    });

    const products = response?.data ?? [];
    const totalPage = response?.pagination?.totalPages ?? 1;

    // Loading state
    if (prodIsLoading) {
        return (
            <div className="min-h-screen bg-[#0F1420] text-white p-10">
                Loading products...
            </div>
        );
    }

    // Error state
    if (prodError) {
        return (
            <div className="min-h-screen bg-[#0F1420] text-white p-10">
                Failed to load products.
                <p className="text-red-400 text-sm mt-2">
                    {prodError.message}
                </p>
            </div>
        );
    }

    // Search
    function handleSearch(e) {
        setSearch(e.target.value);
        setCurrentPage(1);
    }

    // Filter / sort
    function handleFilter(e) {
        setFilter(e.target.value);
        setCurrentPage(1);
    }

    // Open add form
    function handleAddProduct() {
        setEditingProduct(null);
        setShowForm(true);
    }

    // Open edit form
    function handleEditProduct(product) {
        setEditingProduct(product);
        setShowForm(true);
    }

    // Close form
    function handleCloseForm() {
        setShowForm(false);
        setEditingProduct(null);
    }

    // Add or edit product
    function handleProductSubmit(formData) {
        if (!formData.title?.trim()) {
            toast.error("Product name is required");
            return;
        }

        if (!formData.category?.trim()) {
            toast.error("Category is required");
            return;
        }

        if (
            formData.price === "" ||
            formData.price == null ||
            !Number.isFinite(Number(formData.price)) ||
            Number(formData.price) <= 0
        ) {
            toast.error("Price must be greater than 0");
            return;
        }

        if (
            formData.stock === "" ||
            formData.stock == null ||
            !Number.isFinite(Number(formData.stock)) ||
            Number(formData.stock) < 0
        ) {
            toast.error("Stock cannot be negative");
            return;
        }

        if (
            formData.rating === "" ||
            formData.rating == null ||
            !Number.isFinite(Number(formData.rating)) ||
            Number(formData.rating) < 0 ||
            Number(formData.rating) > 5
        ) {
            toast.error("Rating must be between 0 and 5");
            return;
        }

        const productData = {
            ...formData,
            title: formData.title.trim(),
            category: formData.category.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            rating: Number(formData.rating),
        };

        // Edit existing product
        if (editingProduct) {
            updateProduct.mutate(
                {
                    id: editingProduct._id,
                    product: productData,
                },
                {
                    onSuccess: () => {
                        handleCloseForm();
                    },
                }
            );

            return;
        }

        // Add new product
        addProduct.mutate(productData, {
            onSuccess: () => {
                handleCloseForm();
                setCurrentPage(1);
                setSearch("");
                setFilter("");
            },
        });
    }

    // Delete product
    function handleDelete(id) {
        if (!window.confirm("Are you sure you want to delete this product?")) {
            return;
        }

        deleteProduct.mutate(id);
    }

    const isSaving =
        addProduct.isPending || updateProduct.isPending;

    return (
        <div className="flex w-full min-h-screen bg-[#0F1420]">
            <SideBar />

            <main className="ml-64 bg-[#0F1420] min-h-screen w-full">
                <Header
                    page="products"
                    content="Dashboard/Products"
                />

                <div className="overflow-x-auto">
                    {/* Search, filter, and add button */}
                    <div className="flex flex-wrap justify-end items-center pr-5 gap-3 border-b-2 border-white/10 py-3">
                        <input
                            type="search"
                            placeholder="Search products..."
                            name="search"
                            className="py-2 px-3 text-white rounded border border-white/20 bg-transparent outline-none focus:border-indigo-500"
                            value={search}
                            onChange={handleSearch}
                        />

                        <div className="relative flex items-center">
                            <CiFilter className="absolute left-3 z-10 text-white pointer-events-none" />

                            <select
                                className="pl-9 pr-4 py-2 border border-white/20 rounded-md text-white bg-[#0F1420]"
                                value={filter}
                                onChange={handleFilter}
                            >
                                <option value="">Sort products</option>
                                <option value="low-high">
                                    Price: Low to High
                                </option>
                                <option value="high-low">
                                    Price: High to Low
                                </option>
                                <option value="rating">
                                    Rating: Highest
                                </option>
                                <option value="stock">
                                    Stock: Highest
                                </option>
                            </select>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="bg-white text-zinc-700 font-bold text-sm px-4 py-2 rounded hover:bg-indigo-600 hover:text-white transition"
                        >
                            + Add Product
                        </button>
                    </div>

                    {/* Add / edit form */}
                    {showForm && (
                        <ProductForm
                            product={editingProduct}
                            onClose={handleCloseForm}
                            onSubmit={handleProductSubmit}
                            isSubmitting={isSaving}
                        />
                    )}

                    {/* Products table */}
                    <table className="w-full min-w-[800px] text-white">
                        <thead>
                            <tr className="border-b border-white/10 text-zinc-400">
                                <th className="text-left p-3">ID</th>
                                <th className="text-left p-3">Product</th>
                                <th className="text-left p-3">Category</th>
                                <th className="text-left p-3">Price</th>
                                <th className="text-left p-3">Stock</th>
                                <th className="text-left p-3">Rating</th>
                                <th className="text-left p-3">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={7}
                                        className="text-center py-10 text-zinc-400"
                                    >
                                        No products found.
                                    </td>
                                </tr>
                            ) : (
                                products.map((item, index) => (
                                    <tr
                                        key={item._id}
                                        className="border-b border-white/5 hover:bg-white/5"
                                    >
                                        <td className="p-3">
                                            {(currentPage - 1) * 8 +
                                                index +
                                                1}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={
                                                        item.thumbnail ||
                                                        item.images?.[0]
                                                    }
                                                    alt={item.title}
                                                    className="w-10 h-10 object-contain bg-white rounded"
                                                />
                                                <span>{item.title}</span>
                                            </div>
                                        </td>

                                        <td className="p-3 capitalize">
                                            {item.category?.replace("-", " ")}
                                        </td>

                                        <td className="p-3">
                                            ${Number(item.price).toFixed(2)}
                                        </td>

                                        <td className="p-3">
                                            <span
                                                className={
                                                    item.stock <= 10
                                                        ? "text-red-400"
                                                        : "text-green-400"
                                                }
                                            >
                                                {item.stock}
                                            </span>
                                        </td>

                                        <td className="p-3">
                                            ⭐ {item.rating}
                                        </td>

                                        <td className="p-3">
                                            <div className="flex gap-4 items-center">
                                                <button
                                                    type="button"
                                                    title="Edit product"
                                                    onClick={() =>
                                                        handleEditProduct(item)
                                                    }
                                                    className="text-xl text-indigo-400 hover:text-indigo-300"
                                                >
                                                    <MdOutlineModeEdit />
                                                </button>

                                                <button
                                                    type="button"
                                                    title="Delete product"
                                                    disabled={deleteProduct.isPending}
                                                    onClick={() =>
                                                        handleDelete(item._id)
                                                    }
                                                    className="text-xl text-red-400 hover:text-red-300 disabled:opacity-50"
                                                >
                                                    <RiDeleteBin6Line />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-end items-center gap-3 p-4 text-white">
                        <button
                            type="button"
                            disabled={currentPage <= 1}
                            onClick={() =>
                                setCurrentPage((prev) => prev - 1)
                            }
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40"
                        >
                            Previous
                        </button>

                        <span>
                            Page {currentPage} of {totalPage}
                        </span>

                        <button
                            type="button"
                            disabled={currentPage >= totalPage}
                            onClick={() =>
                                setCurrentPage((prev) => prev + 1)
                            }
                            className="px-3 py-2 bg-white text-indigo-900 rounded disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default AdminProducts;
