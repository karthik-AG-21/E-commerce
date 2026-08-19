
import { useDispatch, useSelector } from "react-redux";
import Header from "../Components/Header";
import { useState } from "react";
import { OrderSchema } from "../utils/OrderValidation";
import useAddAddress from "../hooks/useAddAddress";
import usePlaceOrder from "../hooks/usePlaceOrder";
import { useNavigate } from "react-router-dom";

import useClearCart from "../hooks/useClearCart";
import { clearCart } from "../redux/cartSlice";

function Checkout() {

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const [details, setDetails] = useState({ name: "", phone: "", street: "", city: "", state: "", zipCode: "", });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const cartItems = useSelector((state) => state.cart.items);

    const { mutate: saveAddress } = useAddAddress();
    const { mutate: placeOrder } = usePlaceOrder();
    const { mutate: clearTheCart } = useClearCart();

    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,0);

    const userId = localStorage.getItem("userId");

    console.log("userId is here", userId)
   

    function handleChange(e) {
        const { name, value } = e.target;
        setDetails((prev) => ({ ...prev, [name]: value }))
        
    }

    function handleSubmit(e) {
    e.preventDefault();

    const result = OrderSchema.safeParse(details);

    if (!result.success) {
        console.log(result.error);
        return;
    }

    saveAddress({userId,address: details,},
        {onSuccess: () => {
                placeOrder({ userId, cartItems, totalPrice, paymentMethod, address: details, },
                    { onSuccess: () => {
                            clearTheCart(userId, {onSuccess: () => {dispatch(clearCart());
                                    // Go to success page
                                    navigate("/orderSuccess", {
                                        state: {
                                            order: {
                                                items: cartItems,
                                                totalPrice,
                                                paymentMethod,
                                                address: details,
                                            }
                                        }
                                    });
                                },

                                onError: (err) => {
                                    console.log(
                                        "Failed to clear backend cart:",
                                        err
                                    );
                                }
                            });
                        },

                        onError: (err) => {
                            console.log("Failed to place order:", err);
                        },
                    }
                );
            },

            onError: (err) => {
                console.log("Failed to save address:", err);
            },
        }
    );
}

    return (
        <div className="min-h-screen pt-25 bg-[#0B0B0F] text-white py-10">

            <div className="max-w-7xl mx-auto">

                <Header />

                <h1 className="text-4xl font-bold mb-10">
                    Checkout
                </h1>


                <div className="grid md:grid-cols-2 gap-8">


                    {/* Address */}

                    <div className="bg-[#191A20] border border-white/10 rounded-2xl p-6">


                        <form onSubmit={handleSubmit}>


                            <h2 className="text-2xl font-semibold mb-6">Delivery Address</h2>


                            <div className="space-y-4">


                                <div>
                                    <label className="block mb-2 text-zinc-300">Name</label>

                                    <input type="text" placeholder="Enter your name"
                                    className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                    name="name" value={details.name} onChange={handleChange} required/>
                                </div>



                                <div>
                                    <label className="block mb-2 text-zinc-300">Phone  </label>

                                    <input type="tel"  placeholder="Enter your phone"
                                       className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                        name="phone" value={details.phone} onChange={handleChange}
                                        required  />    
                                </div>



                                <div>
                                    <label className="block mb-2 text-zinc-300">Street Address </label>

                                    <input type="text" placeholder="Street address"
                                        className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                        name="street" value={details.street} onChange={handleChange} required />
                                </div>




                                <div>

                                    <label className="block mb-2 text-zinc-300"> City </label>
                                   
                                   <input type="text" placeholder="City"
                                        className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                        name="city" value={details.city} onChange={handleChange} required />
                                </div>




                                <div>
                                    <label className="block mb-2 text-zinc-300"> State </label>
                                       
                                        <input type="text" placeholder="State"
                                        className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                        name="state" value={details.state} onChange={handleChange} required />
                                </div>




                                <div>
                                    <label className="block mb-2 text-zinc-300"> Zip Code</label>

                                     <input type="text" placeholder="Zip Code"
                                        className="w-full bg-[#23242C] rounded-lg p-3 outline-none"
                                        name="zipCode" value={details.zipCode} onChange={handleChange} required />
                                   
                                </div>



                            </div>




                            <h2 className="text-2xl font-semibold mt-8 mb-4">  Payment Method  </h2>
                               
                            <div className="flex gap-6">

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input  type="radio"  name="payment" value="COD" checked={paymentMethod === "COD"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}/>Cash On Delivery</label>

                                <label className="flex items-center gap-2 cursor-pointer">

                                    <input  type="radio"  name="payment" value="UPI" checked={paymentMethod === "UPI"}
                                    onChange={(e) => setPaymentMethod(e.target.value)}/>UPI</label>

                            </div>




                            <button type="submit" className=" bg-indigo-600  hover:bg-indigo-700
                                py-3 mt-8 w-full rounded-xl font-semibold transition"> Place Order
                            </button>

                        </form>

                    </div>

                    {/* Order Summary */}

                    <div className="bg-[#191A20] border border-white/10 rounded-2xl p-6">


                        <h2 className="text-2xl font-semibold mb-6"> Order Summary </h2>
                            
                        <div className="space-y-5">

                            {cartItems.map((item) => (

                                    <div key={item.id}
                                        className="flex gap-4 border-b border-white/10 pb-4">


                                        <img src={item.thumbnail} alt={item.title}
                                            className="w-20 h-20 rounded-lg object-cover bg-white" />

                                        <div className="flex-1">
                                            <h3 className="font-semibold"> {item.title} </h3>

                                            <p className="text-zinc-400">Qty : {item.quantity} </p>

                                            <p className="text-indigo-400 font-semibold"> 
                                                ₹ {item.price * item.quantity}  </p>
                                        </div>

                                    </div>
                                ))
                            }

                        </div>

                        <div className="mt-8 border-t border-white/10 pt-6 space-y-3">

                            <div className="flex justify-between">
                                <span> Subtotal</span>
                                <span> ₹ {totalPrice} </span>    
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping </span>
                                <span className="text-green-400">Free</span>
                            </div>

                            <div className="flex justify-between text-xl font-bold">
                                <span>Total </span>
                                <span>₹ {totalPrice}</span>
                            </div>

                        </div>


                    </div>



                </div>


            </div>


        </div>
    );
}

export default Checkout; 