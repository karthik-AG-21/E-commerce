
import { useState } from "react";
import Header from "../../Components/Admin/AdminHeader";
import SideBar from "../../Components/Admin/AdminSidebar";
import { LuPackage, LuTrash2, LuRotateCcw, } from "react-icons/lu";
import { toast } from "react-toastify";
import ConfirmDialog from "../../Components/Admin/ConfirmDialog";

import useGetTrashProducts from "../../hooks/Admin/useGetTrashProducts";
import useRestoreProduct from "../../hooks/Admin/useRestoreProduct";
import usePermanentDeleteProduct from "../../hooks/Admin/usePermanentDeleteProduct";

function AdminTrash() {
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const { data: response, isLoading, error, } = useGetTrashProducts({ page: currentPage, limit, });

    const products = response?.data ?? [];
    const totalPages = response?.pagination?.totalPages ?? 1;

    const restoreProduct = useRestoreProduct();
    const permanentDeleteProduct = usePermanentDeleteProduct();

    function handleRestore(id) {
        restoreProduct.mutate(id, {
            onSuccess: () => {
                toast.success("Product restored successfully");

                if (products.length === 1 && currentPage > 1) {
                    setCurrentPage((page) => page - 1);
                }
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to restore product"
                );
            },
        });
    }

    function handlePermanentDelete(id) {
        setSelectedProductId(id);
        setIsConfirmOpen(true);
    }

    function confirmPermanentDelete() {
        if (!selectedProductId) return;

        permanentDeleteProduct.mutate(selectedProductId, {
            onSuccess: () => {
                toast.success("Product permanently deleted");

                if (products.length === 1 && currentPage > 1) {
                    setCurrentPage((page) => page - 1);
                }

                setIsConfirmOpen(false);
                setSelectedProductId(null);
            },
            onError: (error) => {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to permanently delete product"
                );

                setIsConfirmOpen(false);
                setSelectedProductId(null);
            },
        });
    }

    function cancelPermanentDelete() {
        setIsConfirmOpen(false);
        setSelectedProductId(null);
    }

    
return (
    <div className="min-h-screen w-full overflow-x-clip bg-[#0F1420] text-white">
        <SideBar />

        <main className="min-h-screen min-w-0 w-full md:ml-64 md:w-[calc(100%-16rem)]">
            <Header
                page="Trash"
                content="Dashboard / Trash"
            />

            <div className="min-w-0 space-y-5 p-3 sm:p-5 lg:p-6">

                {/* Page heading */}
                <div className="flex items-center justify-between gap-3">
                    <div>
                        <h2 className="text-xl font-bold sm:text-2xl">
                            Deleted Products
                        </h2>
                        <p className="mt-1 text-sm text-slate-400">
                            Restore products or permanently remove them from your inventory.
                        </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10">
                        <LuTrash2 className="text-xl text-red-400" />
                    </div>
                </div>

                {/* Main card */}
                <section className="min-w-0 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#111827]">

                    {/* Card header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-4 py-4 sm:px-5">
                        <div>
                            <h3 className="font-semibold">Trash Bin</h3>
                            <p className="mt-1 text-xs text-slate-400 sm:text-sm">
                                Products in this list are no longer active.
                            </p>
                        </div>

                        <span className="rounded-full border border-red-400/15 bg-red-500/10 px-3 py-1 text-xs font-medium text-red-300">
                            {products.length} on this page
                        </span>
                    </div>

                    {/* Loading state */}
                    {isLoading ? (
                        <div className="px-4 py-16 text-center">
                            <div className="mx-auto mb-3 h-7 w-7 animate-spin rounded-full border-2 border-indigo-400/30 border-t-indigo-400" />
                            <p className="text-sm text-slate-400">
                                Loading deleted products...
                            </p>
                        </div>
                    ) : error ? (
                        /* Error state */
                        <div className="px-4 py-14 text-center">
                            <LuTrash2 className="mx-auto mb-3 text-3xl text-red-400" />
                            <p className="text-red-400">
                                Failed to load deleted products.
                            </p>
                            <p className="mt-2 break-words text-sm text-slate-500">
                                {error.message}
                            </p>
                        </div>
                    ) : (
                        <>
                            {/* Responsive table */}
                            <div className="w-full overflow-x-auto">
                                <table className="w-full min-w-[760px] text-left text-sm">

                                    <thead>
                                        <tr className="border-b border-white/[0.07] text-xs uppercase tracking-wider text-slate-500">
                                            <th className="px-5 py-4 font-medium">ID</th>
                                            <th className="px-5 py-4 font-medium">Product</th>
                                            <th className="px-5 py-4 font-medium">Category</th>
                                            <th className="px-5 py-4 font-medium">Price</th>
                                            <th className="px-5 py-4 font-medium">Stock</th>
                                            <th className="px-5 py-4 font-medium">Actions</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-white/[0.05]">
                                        {products.length === 0 ? (
                                            <tr>
                                                <td colSpan={6} className="px-5 py-16 text-center">
                                                    <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/[0.04]">
                                                        <LuPackage className="text-2xl text-slate-500" />
                                                    </div>
                                                    <p className="font-medium text-slate-300">
                                                        Trash is empty
                                                    </p>
                                                    <p className="mt-1 text-sm text-slate-500">
                                                        Deleted products will appear here.
                                                    </p>
                                                </td>
                                            </tr>
                                        ) : (
                                            products.map((product, index) => (
                                                <tr
                                                    key={product._id}
                                                    className="transition-colors hover:bg-white/[0.025]"
                                                >
                                                    <td className="px-5 py-4 text-slate-500">
                                                        {(currentPage - 1) * limit + index + 1}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex min-w-0 items-center gap-3">
                                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-white p-1.5">
                                                                <img
                                                                    src={product.thumbnail || product.images?.[0]}
                                                                    alt={product.title}
                                                                    loading="lazy"
                                                                    className="h-full w-full object-contain"
                                                                />
                                                            </div>

                                                            <span className="max-w-[220px] truncate font-medium text-slate-200">
                                                                {product.title}
                                                            </span>
                                                        </div>
                                                    </td>

                                                    <td className="px-5 py-4 capitalize text-slate-400">
                                                        {product.category?.replace("-", " ")}
                                                    </td>

                                                    <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-200">
                                                        ${Number(product.price).toFixed(2)}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                                            product.stock <= 10
                                                                ? "bg-red-500/10 text-red-400"
                                                                : "bg-emerald-500/10 text-emerald-400"
                                                        }`}>
                                                            {product.stock}
                                                        </span>
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-2">
                                                            <button
                                                                type="button"
                                                                title="Restore product"
                                                                disabled={
                                                                    restoreProduct.isPending ||
                                                                    permanentDeleteProduct.isPending
                                                                }
                                                                onClick={() => handleRestore(product._id)}
                                                                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 text-xs font-medium text-emerald-300 transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                                                            >
                                                                <LuRotateCcw className="text-base" />
                                                                Restore
                                                            </button>

                                                            <button
                                                                type="button"
                                                                title="Delete permanently"
                                                                disabled={
                                                                    restoreProduct.isPending ||
                                                                    permanentDeleteProduct.isPending
                                                                }
                                                                onClick={() => handlePermanentDelete(product._id)}
                                                                className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-red-400/20 bg-red-500/10 px-3 text-xs font-medium text-red-300 transition hover:bg-red-500/20 disabled:cursor-not-allowed disabled:opacity-40"
                                                            >
                                                                <LuTrash2 className="text-base" />
                                                                Delete
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
                            {products.length > 0 && (
                                <div className="flex flex-col gap-4 border-t border-white/[0.07] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                    <p className="text-sm text-slate-400">
                                        Page {currentPage} of {Math.max(totalPages, 1)}
                                    </p>

                                    <div className="flex items-center justify-between gap-3 sm:justify-end">
                                        <button
                                            type="button"
                                            disabled={currentPage <= 1}
                                            onClick={() => setCurrentPage((page) => page - 1)}
                                            className="min-h-10 rounded-lg border border-white/10 bg-white/[0.04] px-3 text-sm text-slate-200 transition hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Previous
                                        </button>

                                        <span className="whitespace-nowrap text-xs text-slate-400 sm:text-sm">
                                            {currentPage} / {Math.max(totalPages, 1)}
                                        </span>

                                        <button
                                            type="button"
                                            disabled={currentPage >= totalPages}
                                            onClick={() => setCurrentPage((page) => page + 1)}
                                            className="min-h-10 rounded-lg border border-indigo-500/30 bg-indigo-600 px-3 text-sm text-white transition hover:bg-indigo-500 disabled:cursor-not-allowed disabled:opacity-40"
                                        >
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </main>

        {/* Permanent delete confirmation */}
        <ConfirmDialog
            open={isConfirmOpen}
            title="Permanently delete product?"
            description="This product will be permanently removed and cannot be restored. Are you sure you want to continue?"
            confirmText="Delete Permanently"
            notConfirmText="Cancel"
            confirmButtonClass="bg-red-600 hover:bg-red-500 focus:ring-red-400"
            onConfirm={confirmPermanentDelete}
            onCancel={cancelPermanentDelete}
        />
    </div>
);

}

export default AdminTrash;

