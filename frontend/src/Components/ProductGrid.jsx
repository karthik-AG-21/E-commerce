import ProductCards from "./ProductCardinPage";

function ProductGrid({ products }) {
    return (
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 justify-items-center gap-5 px-4 py-8 min-[580px]:grid-cols-2 sm:px-6 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
                <div
                    key={product._id ?? product.id}
                    className="flex w-full min-w-0 justify-center"
                >
                    <ProductCards product={product} />
                </div>
            ))}
        </div>
    );
}

export default ProductGrid;