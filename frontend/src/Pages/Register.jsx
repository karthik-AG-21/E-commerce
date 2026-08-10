import { useState } from "react";
import video1 from "../assets/xiaomi.mp4";
import { useNavigate } from "react-router-dom";
import { registerSchema } from "../utils/RegisterValidation";
import { useRegister } from "../hooks/useRegister.js";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const registerMutation = useRegister();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));


        setErrors((prev) => ({
            ...prev,
            [e.target.name]: undefined,
        }));
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const result = registerSchema.safeParse(formData);

        if (!result.success) {

            setErrors(result.error.flatten().fieldErrors);

            return;

        }

        setErrors({});

        const user = {

            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: "customer",
            cart: [],
            wishlist: [],
            orders: [],
            address: [],
                
            

        };

        registerMutation.mutate(user, {

            onSuccess: (newUser) => {

                localStorage.setItem("userId", newUser.id);

                const userData = {role:newUser.role , name:newUser.name, email:newUser.email}

                localStorage.setItem("user",JSON.stringify(userData) )

                toast.success(`Welcome ${userData.name}!`);

                navigate("/");

            },

            onError: (error) => {

                if (error.message === "Email already exists") {

                    setErrors({

                        email: ["Email already exists"]

                    });

                } else {

                    alert("Registration failed");

                }

            }

        });

    };
   return (
    <div className="relative min-h-screen bg-[#0B0B0F] flex items-center justify-center overflow-hidden">

        

        <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full"></div>

        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>

        

        <form
            onSubmit={handleSubmit}
            className="relative z-10 w-full max-w-md bg-[#191A20] border border-white/10 rounded-3xl p-8 shadow-2xl">

            <div className="text-center mb-8">

                <h1 className="text-3xl font-bold text-white">
                    Create Account
                </h1>

                <p className="text-zinc-400 mt-2">
                    Join TechStore and start shopping today.
                </p>

            </div>

            {/* Name */}

            <div className="mb-5">

                <label className="text-white text-sm">
                    Full Name
                </label>

                <input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="
                    mt-2
                    w-full
                    rounded-xl
                    bg-[#23242C]
                    border
                    border-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-indigo-500
                    "/>

                {errors.name && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.name[0]}
                    </p>
                )}

            </div>

           
            <div className="mb-5">

                <label className="text-white text-sm">
                    Email Address
                </label>

                <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="
                    mt-2
                    w-full
                    rounded-xl
                    bg-[#23242C]
                    border
                    border-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-indigo-500
                    "/>

                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.email[0]}
                    </p>
                )}

            </div>


            <div className="mb-5">

                <label className="text-white text-sm">
                    Password
                </label>

                <input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                    className="
                    mt-2
                    w-full
                    rounded-xl
                    bg-[#23242C]
                    border
                    border-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-indigo-500
                    "/>

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.password[0]}
                    </p>
                )}

            </div>

           

            <div className="mb-6">

                <label className="text-white text-sm"> Confirm Password</label>

                <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="
                    mt-2
                    w-full
                    rounded-xl
                    bg-[#23242C]
                    border
                    border-white/10
                    px-4
                    py-3
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-indigo-500
                    "/>

                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword[0]}
                    </p>
                )}

            </div>

            

            <button
                type="submit"
                disabled={registerMutation.isPending}
                className="
                w-full
                py-3
                rounded-xl
                bg-indigo-600
                hover:bg-indigo-700
                transition
                font-semibold
                text-white
                disabled:opacity-50" >
                {registerMutation.isPending ? "Creating Account..." : "Create Account"}
            </button>


            <p className="text-center text-zinc-400 mt-6">

                Already have an account?

                <span
                    onClick={() => navigate("/login")}
                    className="ml-2 text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium">
                    Login
                </span>

            </p>

        </form>

    </div>
);
};

export default Register;