import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Header from "../Components/Header";
import { OrderSchema } from "../utils/OrderValidation";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { clearCart } from "../redux/cartSlice";

function Checkout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cartItems = useSelector((state) => state.cart.items ?? []);

    const {
        mutateAsync: placeOrder,
        isPending: isPlacingOrder,
    } = usePlaceOrder();

    const [details, setDetails] = useState({
        name: "",
        phone: "",
        street: "",
        city: "",
        state: "",
        zipCode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const isSubmitting = isPlacingOrder;

    // Support both { product, quantity } and direct product objects.
    const getProduct = (item) => item.product ?? item;

    // Calculate the displayed total.
    // The backend must independently calculate the actual order total.
    const totalPrice = cartItems.reduce((total, item) => {
        const product = getProduct(item);
        const price = Number(product.price) || 0;
        const quantity = Number(item.quantity) || 0;

        return total + price * quantity;
    }, 0);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setDetails((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (isSubmitting) return;

        if (cartItems.length === 0) {
            toast.error("Your cart is empty");
            return;
        }

        const validation = OrderSchema.safeParse(details);

        if (!validation.success) {
            toast.error(
                validation.error.issues[0]?.message ??
                "Please check your delivery details"
            );
            return;
        }

        try {
            // The backend identifies the user through authentication,
            // retrieves their cart, calculates prices, saves the order,
            // and clears the backend cart after successful creation.
            const orderResponse = await placeOrder({
                address: validation.data,
                paymentMethod,
            });

            if (!orderResponse?.success || !orderResponse?.data) {
                throw new Error(
                    orderResponse?.message || "Unable to create your order"
                );
            }

            const createdOrder = orderResponse.data;

            // Update the local Redux cart after backend success.
            dispatch(clearCart());

            toast.success("Order placed successfully!");

            // Navigate using the order saved by the backend.
            navigate("/orderSuccess", {
                state: {
                    order: createdOrder,
                },
            });
        } catch (error) {
            console.error(
                "Checkout failed:",
                error.response?.data ?? error.message
            );

            toast.error(
                error.response?.data?.message ??
                error.message ??
                "Unable to place your order"
            );
        }
    };

    const isCartEmpty = cartItems.length === 0;

    return (
        <div className="min-h-screen bg-[#0B0B0F] pt-24 pb-12 px-5 text-white">
            <Header />

            <main className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold">
                        Checkout
                    </h1>

                    <p className="text-zinc-400 mt-2">
                        Complete your delivery details and review your order.
                    </p>
                </div>

                {isCartEmpty ? (
                    <div className="bg-[#191A20] border border-white/10 rounded-2xl p-8 md:p-12 text-center">
                        <h2 className="text-2xl font-bold mb-3">
                            Your cart is empty
                        </h2>

                        <p className="text-zinc-400 mb-6">
                            Add some products before proceeding to checkout.
                        </p>

                        <button
                            type="button"
                            onClick={() => navigate("/")}
                            className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-semibold transition"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Delivery and payment form */}
                        <section className="bg-[#191A20] border border-white/10 rounded-2xl p-6 md:p-8">
                            <form onSubmit={handleSubmit}>
                                <h2 className="text-2xl font-semibold mb-6">
                                    Delivery Address
                                </h2>

                                <div className="space-y-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block mb-2 text-zinc-300"
                                        >
                                            Full Name
                                        </label>

                                        <input
                                            id="name"
                                            type="text"
                                            name="name"
                                            autoComplete="name"
                                            placeholder="Enter your full name"
                                            value={details.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="phone"
                                            className="block mb-2 text-zinc-300"
                                        >
                                            Phone Number
                                        </label>

                                        <input
                                            id="phone"
                                            type="tel"
                                            name="phone"
                                            autoComplete="tel"
                                            placeholder="Enter your phone number"
                                            value={details.phone}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="street"
                                            className="block mb-2 text-zinc-300"
                                        >
                                            Street Address
                                        </label>

                                        <input
                                            id="street"
                                            type="text"
                                            name="street"
                                            autoComplete="street-address"
                                            placeholder="Enter your street address"
                                            value={details.street}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label
                                                htmlFor="city"
                                                className="block mb-2 text-zinc-300"
                                            >
                                                City
                                            </label>

                                            <input
                                                id="city"
                                                type="text"
                                                name="city"
                                                autoComplete="address-level2"
                                                placeholder="City"
                                                value={details.city}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                            />
                                        </div>

                                        <div>
                                            <label
                                                htmlFor="state"
                                                className="block mb-2 text-zinc-300"
                                            >
                                                State
                                            </label>

                                            <input
                                                id="state"
                                                type="text"
                                                name="state"
                                                autoComplete="address-level1"
                                                placeholder="State"
                                                value={details.state}
                                                onChange={handleChange}
                                                required
                                                className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="zipCode"
                                            className="block mb-2 text-zinc-300"
                                        >
                                            ZIP / Postal Code
                                        </label>

                                        <input
                                            id="zipCode"
                                            type="text"
                                            name="zipCode"
                                            autoComplete="postal-code"
                                            placeholder="Enter postal code"
                                            value={details.zipCode}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-[#23242C] border border-white/10 rounded-lg p-3 outline-none focus:border-indigo-500"
                                        />
                                    </div>
                                </div>

                                <h2 className="text-2xl font-semibold mt-8 mb-4">
                                    Payment Method
                                </h2>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="flex items-center gap-3 bg-[#23242C] border border-white/10 rounded-lg p-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="COD"
                                            checked={paymentMethod === "COD"}
                                            onChange={(event) =>
                                                setPaymentMethod(
                                                    event.target.value
                                                )
                                            }
                                        />

                                        <span>Cash on Delivery</span>
                                    </label>

                                    <label className="flex items-center gap-3 bg-[#23242C] border border-white/10 rounded-lg p-4 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="UPI"
                                            checked={paymentMethod === "UPI"}
                                            onChange={(event) =>
                                                setPaymentMethod(
                                                    event.target.value
                                                )
                                            }
                                        />

                                        <span>UPI</span>
                                    </label>
                                </div>

                                {paymentMethod === "UPI" && (
                                    <p className="text-amber-300 text-sm mt-3">
                                        Online UPI payment must be completed
                                        through a payment provider. Selecting
                                        UPI here does not process a payment.
                                    </p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 mt-8 w-full rounded-xl font-semibold transition"
                                >
                                    {isSubmitting
                                        ? "Processing Order..."
                                        : "Place Order"}
                                </button>
                            </form>
                        </section>

                        {/* Order summary */}
                        <aside className="bg-[#191A20] border border-white/10 rounded-2xl p-6 md:p-8 h-fit">
                            <h2 className="text-2xl font-semibold mb-6">
                                Order Summary
                            </h2>

                            <div className="space-y-5">
                                {cartItems.map((item) => {
                                    const product = getProduct(item);
                                    const price =
                                        Number(product.price) || 0;
                                    const quantity =
                                        Number(item.quantity) || 0;

                                    const image =
                                        product.images?.[0] ??
                                        product.images?.[1] ??
                                        product.thumbnail ??
                                        "";

                                    return (
                                        <div
                                            key={product._id}
                                            className="flex gap-4 border-b border-white/10 pb-5"
                                        >
                                            <img
                                                src={image}
                                                alt={product.title ?? "Product"}
                                                className="w-20 h-20 rounded-lg object-cover bg-white"
                                            />

                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold break-words">
                                                    {product.title ?? "Product"}
                                                </h3>

                                                <p className="text-zinc-400 mt-2">
                                                    Quantity: {quantity}
                                                </p>

                                                <p className="text-zinc-400 mt-1">
                                                    Price: ₹{price.toFixed(2)}
                                                </p>

                                                <p className="text-indigo-400 font-semibold mt-2">
                                                    Subtotal: ₹
                                                    {(
                                                        price * quantity
                                                    ).toFixed(2)}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="mt-8 border-t border-white/10 pt-6 space-y-4">
                                <div className="flex justify-between gap-4">
                                    <span className="text-zinc-400">
                                        Subtotal
                                    </span>

                                    <span>₹{totalPrice.toFixed(2)}</span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-zinc-400">
                                        Shipping
                                    </span>

                                    <span className="text-green-400">
                                        Free
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4 text-xl font-bold border-t border-white/10 pt-4">
                                    <span>Total</span>

                                    <span className="text-indigo-400">
                                        ₹{totalPrice.toFixed(2)}
                                    </span>
                                </div>

                                <p className="text-xs text-zinc-500">
                                    Final prices and product availability will
                                    be validated by the server when your order
                                    is created.
                                </p>
                            </div>
                        </aside>
                    </div>
                )}
            </main>
        </div>
    );


}

export default Checkout;
