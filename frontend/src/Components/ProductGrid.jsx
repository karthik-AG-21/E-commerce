import ProductCards from "./ProductCardinPage";

function ProductGrid({ products }) {
    return (
        <div className="grid grid-cols-2 md:grid-cols-4 place-items-center gap-4 py-12">
            {products.map((product) => (
                <ProductCards
                    key={product.id}
                    product={product}
                />
            ))}
        </div>
    );
}

export default ProductGrid;