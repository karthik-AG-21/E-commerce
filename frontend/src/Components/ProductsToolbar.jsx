function ProductToolbar({ clearFilter , totalProducts  }) {
    return (
        <div className="max-w-7xl mx-auto px-6 mt-8">

            <div className="flex justify-between items-center border-b  border-white/10 pb-4">
                <h2 className="text-zinc-400">Showing
                    <span className="text-white font-semibold ml-2">{totalProducts}</span>
                    Products</h2>

                <button
                    className=" px-5 py-2 rounded-xl border border-white/10 text-white
                     hover:border-indigo-500 bg-[#191A20] transition" onClick={clearFilter}>Clear Filters </button>

            </div>

        </div>
    );
}

export default ProductToolbar;