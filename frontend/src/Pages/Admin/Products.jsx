
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import { MdOutlineModeEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiFilter } from "react-icons/ci";
import { useState } from "react";
import ProductForm from "../../Components/Admin/ProductForm";

import useAddProduct from "../../hooks/Admin/useAddProducts";
import useUpdateProduct from "../../hooks/Admin/useUpdateProducts";

import useGetAllProducts from "../../hooks/Admin/useGetAllProducts";

import { toast } from "react-toastify";
import useDeleteProduct from "../../hooks/Admin/useSoftDeleteProd";
import ConfirmDialog from "../../Components/Admin/ConfirmDialog";


function AdminProducts() {
    const addProduct = useAddProduct();
    const updateProduct = useUpdateProduct();
    const deleteProduct = useDeleteProduct();

    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Fetch products from backend
    const { data: response, isLoading: prodIsLoading, error: prodError,
    } = useGetAllProducts({ page: currentPage, limit: 8, search, filter, });

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

        if (formData.rating !== "" && (!Number.isFinite(Number(formData.rating))
            || Number(formData.rating) < 0 || Number(formData.rating) > 5)) {

            toast.error("Rating must be between 0 and 5");
            return;
        }

        if (!formData.description?.trim()) {
            toast.error("Product description is required");
            return;
        }

        if (!formData.brand?.trim()) {
            toast.error("Product brand is required");
            return;
        }


        const productData = {
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            category: formData.category.trim(),
            brand: formData.brand.trim(),
            price: Number(formData.price),
            stock: Number(formData.stock),
            rating: formData.rating === "" ? 0 : Number(formData.rating),
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
        setSelectedProductId(id);
        setIsConfirmOpen(true);
    }

    function confirmDelete() {
        if (!selectedProductId) return;

        deleteProduct.mutate(selectedProductId, {
            onSettled: () => {
                setIsConfirmOpen(false);
                setSelectedProductId(null);
            },
        });
    }

    function cancelDelete() {
        setIsConfirmOpen(false);
        setSelectedProductId(null);
    }


    const isSaving =
        addProduct.isPending || updateProduct.isPending;


    return (
        <div className="min-h-screen w-full overflow-x-clip bg-[#0F1420] text-white">
            <SideBar />

            <main className="min-h-screen min-w-0 w-full md:ml-64 md:w-[calc(100%-16rem)]">
                <Header
                    page="Products"
                    content="Dashboard / Products"
                />

                <div className="min-w-0 space-y-5 p-3 sm:p-5 lg:p-6">

                    {/* Page heading */}
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="text-xl font-bold sm:text-2xl">
                                Product Management
                            </h2>
                            <p className="mt-1 text-sm text-slate-400">
                                Manage your inventory, pricing and product details.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={handleAddProduct}
                            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
                        >
                            <span className="text-lg leading-none">+</span>
                            Add Product
                        </button>
                    </div>

                    {/* Search and filter */}
                    <section className="rounded-2xl border border-white/[0.07] bg-[#111827] p-3 sm:p-4">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(200px,1fr)_190px]">
                            <input
                                type="search"
                                name="search"
                                placeholder="Search products..."
                                aria-label="Search products"
                                value={search}
                                onChange={handleSearch}
                                className="h-10 min-w-0 rounded-lg border border-white/10 bg-[#0F1420] px-3 text-base text-white outline-none transition placeholder:text-slate-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20"
                            />

                            <div className="relative min-w-0">
                                <CiFilter className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />

                                <select
                                    value={filter}
                                    onChange={handleFilter}
                                    aria-label="Sort products"
                                    className="h-10 w-full appearance-none rounded-lg border border-white/10 bg-[#0F1420] pl-9 pr-3 text-sm text-white outline-none transition focus:border-indigo-500"
                                >
                                    <option value="">Sort products</option>
                                    <option value="low-high">Price: Low to High</option>
                                    <option value="high-low">Price: High to Low</option>
                                    <option value="rating">Rating: Highest</option>
                                    <option value="stock">Stock: Highest</option>
                                </select>
                            </div>
                        </div>
                    </section>

                    {/* Add / edit product form */}
                    {showForm && (
                        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 p-3 backdrop-blur-sm sm:p-6">
                            <div className="relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111827] shadow-2xl">

                                {/* Modal header */}
                                <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/10 bg-[#111827] px-4 py-4 sm:px-6">
                                    <div>
                                        <h2 className="text-lg font-semibold text-white sm:text-xl">
                                            {editingProduct ? "Edit Product" : "Add New Product"}
                                        </h2>
                                        <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                            Enter your product details below.
                                        </p>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={handleCloseForm}
                                        disabled={isSaving}
                                        aria-label="Close product form"
                                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
                                    >
                                        &times;
                                    </button>
                                </div>

                                {/* Form content */}
                                <div className="p-2 sm:p-4">
                                    <ProductForm
                                        product={editingProduct}
                                        onClose={handleCloseForm}
                                        onSubmit={handleProductSubmit}
                                        isSubmitting={isSaving}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products table */}
                    <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111827]">

                        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.07] px-4 py-4 sm:px-5">
                            <h3 className="font-semibold">All Products</h3>
                            <span className="text-xs text-slate-400 sm:text-sm">
                                {products.length} products on this page
                            </span>
                        </div>

                        <div className="w-full overflow-x-auto">
                            <table className="w-full min-w-[760px] text-left text-sm">

                                <thead>
                                    <tr className="border-b border-white/[0.07] text-xs uppercase tracking-wider text-slate-500">
                                        <th className="px-5 py-4 font-medium">ID</th>
                                        <th className="px-5 py-4 font-medium">Product</th>
                                        <th className="px-5 py-4 font-medium">Category</th>
                                        <th className="px-5 py-4 font-medium">Price</th>
                                        <th className="px-5 py-4 font-medium">Stock</th>
                                        <th className="px-5 py-4 font-medium">Rating</th>
                                        <th className="px-5 py-4 font-medium">Actions</th>
                                    </tr>
                                </thead>

                                <tbody className="divide-y divide-white/[0.05]">
                                    {products.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-5 py-14 text-center">
                                                <p className="text-slate-300">No products found</p>
                                                <p className="mt-1 text-sm text-slate-500">
                                                    Try another search or add a new product.
                                                </p>
                                            </td>
                                        </tr>
                                    ) : (
                                        products.map((item, index) => (
                                            <tr
                                                key={item._id}
                                                className="transition-colors hover:bg-white/[0.025]"
                                            >
                                                <td className="px-5 py-4 text-slate-400">
                                                    {(currentPage - 1) * 8 + index + 1}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex min-w-0 items-center gap-3">
                                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white p-1.5">
                                                            <img
                                                                src={item.thumbnail || item.images?.[0]}
                                                                alt={item.title}
                                                                loading="lazy"
                                                                className="h-full w-full object-contain"
                                                            />
                                                        </div>

                                                        <span className="max-w-[220px] truncate font-medium text-slate-200">
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4 capitalize text-slate-400">
                                                    {item.category?.replace("-", " ")}
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-200">
                                                    ${Number(item.price).toFixed(2)}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.stock <= 10
                                                            ? "bg-red-500/10 text-red-400"
                                                            : "bg-emerald-500/10 text-emerald-400"
                                                            }`}
                                                    >
                                                        {item.stock} in stock
                                                    </span>
                                                </td>

                                                <td className="whitespace-nowrap px-5 py-4 text-slate-300">
                                                    <span className="text-amber-400">★</span>{" "}
                                                    {item.rating ?? 0}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            type="button"
                                                            title="Edit product"
                                                            aria-label={`Edit ${item.title}`}
                                                            onClick={() => handleEditProduct(item)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-indigo-400/20 bg-indigo-500/10 text-lg text-indigo-300 transition hover:bg-indigo-500/20"
                                                        >
                                                            <MdOutlineModeEdit />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            title="Move to Trash"
                                                            aria-label={`Move ${item.title} to trash`}
                                                            disabled={deleteProduct.isPending}
                                                            onClick={() => handleDelete(item._id)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-400/20 bg-red-500/10 text-lg text-red-300 transition hover:bg-red-500/20 disabled:opacity-50"
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
                        </div>

                        {/* Pagination */}
                        <div className="flex flex-col gap-4 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">

                            <p className="text-sm text-slate-400">
                                Page {currentPage} of {Math.max(totalPage, 1)}
                            </p>

                            <div className="flex items-center justify-between gap-3 sm:justify-end">
                                <button
                                    type="button"
                                    disabled={currentPage <= 1}
                                    onClick={() => setCurrentPage((prev) => prev - 1)}
                                    className="min-h-10 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm font-medium text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Previous
                                </button>

                                <span className="whitespace-nowrap text-xs text-slate-400 sm:text-sm">
                                    {currentPage} / {Math.max(totalPage, 1)}
                                </span>

                                <button
                                    type="button"
                                    disabled={currentPage >= totalPage}
                                    onClick={() => setCurrentPage((prev) => prev + 1)}
                                    className="min-h-10 rounded-lg border border-indigo-500/30 bg-indigo-600 px-3 text-sm font-medium text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            {/* Delete confirmation dialog */}
            <ConfirmDialog
                open={isConfirmOpen}
                title="Move product to Trash?"
                description="You can restore this product later."
                confirmText="Move to Trash"
                notConfirmText="Cancel"
                confirmButtonClass="bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-400"
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
            />
        </div>
    );

}

export default AdminProducts;
