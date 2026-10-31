import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Laptop,
    Smartphone,
    Tablet,
    Headphones,
    Truck,
    ShieldCheck,
    CreditCard,
} from "lucide-react";
import { loginRequest } from "../service/authApi";

const categories = [
    { name: "Laptops", icon: Laptop },
    { name: "Mobiles", icon: Smartphone },
    { name: "Tablets", icon: Tablet },
    { name: "Accessories", icon: Headphones },
];

const perks = [
    { text: "Fast, tracked delivery", icon: Truck },
    { text: "Official brand warranty", icon: ShieldCheck },
    { text: "Secure payments", icon: CreditCard },
];

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setLoginError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setIsLoading(true);

        try {
            const data = await loginRequest(formData);
            const user = data.data;

            if (user?.role !== "admin" && user?.isBlocked) {
                toast.error("Your account is blocked");
                return;
            }

            const userDetails = {
                name: user?.name,
                email: user?.email,
                role: user?.role,
                id: user?.id,
            };

            localStorage.setItem("userId", user?.id);
            localStorage.setItem("user", JSON.stringify(userDetails));

            toast.success(`Welcome ${user?.name}!`);
            navigate(user?.role === "admin" ? "/Dashboard" : "/");
        } catch (error) {
            const message =
                error.response?.data?.message || "Login failed. Please try again.";
            setLoginError(message);
            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">

                <div className="hidden lg:flex flex-col justify-between bg-[#191A20] border border-white/10 rounded-3xl p-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white leading-tight">
                            Gear up with the latest tech
                        </h2>
                        <p className="text-zinc-400 mt-3">
                            Laptops, mobiles, tablets and accessories from trusted brands.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {categories.map(({ name, icon: Icon }) => (
                                <div
                                    key={name}
                                    className="bg-[#23242C] border border-white/10 rounded-2xl h-28 flex flex-col
                                    justify-center items-center gap-3 text-white transition-all duration-300
                                    hover:-translate-y-1 hover:border-indigo-500/40"
                                >
                                    <Icon className="w-7 h-7 text-indigo-400" />
                                    <p className="font-semibold">{name}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <ul className="mt-8 space-y-3">
                        {perks.map(({ text, icon: Icon }) => (
                            <li key={text} className="flex items-center gap-3 text-zinc-400 text-sm">
                                <Icon className="w-4 h-4 text-indigo-400" />
                                {text}
                            </li>
                        ))}
                    </ul>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="bg-[#191A20] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-center"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-white">Welcome Back</h1>
                        <p className="text-zinc-400 mt-2">Login to continue shopping at TechStore.</p>
                    </div>

                    <div className="mb-5">
                        <label htmlFor="email" className="text-white text-sm">Email Address</label>
                        <div className="relative mt-2">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                autoComplete="username"
                                required
                                className="w-full rounded-xl bg-[#23242C] border border-white/10 pl-11 pr-4 py-3
                                text-white placeholder:text-zinc-500 outline-none transition
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                            />
                        </div>
                    </div>

                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="text-white text-sm">Password</label>
                            {/* <span className="text-indigo-400 hover:text-indigo-300 text-sm cursor-pointer">
                                Forgot password?
                            </span> */}
                        </div>
                        <div className="relative mt-2">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                autoComplete="current-password"
                                required
                                className="w-full rounded-xl bg-[#23242C] border border-white/10 pl-11 pr-12 py-3
                                text-white placeholder:text-zinc-500 outline-none transition
                                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((s) => !s)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {loginError && (
                        <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition
                        font-semibold text-white disabled:opacity-50"
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    <div className="flex items-center gap-3 my-6 text-zinc-500 text-sm">
                        <span className="flex-1 h-px bg-white/10"></span>
                        or
                        <span className="flex-1 h-px bg-white/10"></span>
                    </div>

                    {/* <button
                        type="button"
                        className="w-full py-3 rounded-xl border border-white/10 bg-[#23242C] text-white
                        font-medium transition hover:border-indigo-500/40"
                    >
                        Continue with Google
                    </button> */}

                    <p className="text-center text-zinc-400 mt-6">
                        Don't have an account?
                        <span
                            onClick={() => navigate("/register")}
                            className="ml-2 text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium"
                        >
                            Register
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;