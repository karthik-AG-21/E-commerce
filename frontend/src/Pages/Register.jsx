import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    PackageCheck,
    Heart,
    BadgePercent,
    Zap,
    ShieldCheck,
    Truck,
} from "lucide-react";
import { registerSchema } from "../utils/RegisterValidation";
import { useRegister } from "../hooks/useRegister.js";

const benefits = [
    { name: "Track orders", icon: PackageCheck },
    { name: "Save wishlist", icon: Heart },
    { name: "Member deals", icon: BadgePercent },
    { name: "Fast checkout", icon: Zap },
];

const perks = [
    { text: "Fast, tracked delivery", icon: Truck },
    { text: "Official brand warranty", icon: ShieldCheck },
];

const fields = [
    { name: "name", label: "Full Name", type: "text", placeholder: "Enter your full name", icon: User },
    { name: "email", label: "Email Address", type: "email", placeholder: "Enter your email", icon: Mail },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password", icon: Lock },
    { name: "confirmPassword", label: "Confirm Password", type: "password", placeholder: "Confirm your password", icon: Lock },
];

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
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
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
        };

        registerMutation.mutate(user, {
            onSuccess: (newUser) => {
                const data = newUser.data;

                const userData = {
                    name: data?.name,
                    email: data?.email,
                    role: data?.role,
                    id: data?.id,
                };

                localStorage.setItem("userId", data?.id);
                localStorage.setItem("user", JSON.stringify(userData));

                toast.success(`Welcome ${userData.name}!`);
                navigate(data?.role === "customer" ? "/" : "/Dashboard");
            },

            onError: (error) => {
                const status = error.response?.status;
                const message = error.response?.data?.message;

                if (status === 409) {
                    setErrors({ email: ["Email already exists"] });
                } else {
                    toast.error(message || "Registration failed");
                }
            },
        });
    };

    return (
        <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center px-6 py-10">
            <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">

                <div className="hidden lg:flex flex-col justify-between bg-[#191A20] border border-white/10 rounded-3xl p-10">
                    <div>
                        <h2 className="text-3xl font-extrabold text-white leading-tight">
                            Join TechStore today
                        </h2>
                        <p className="text-zinc-400 mt-3">
                            One account for laptops, mobiles, tablets and accessories.
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-8">
                            {benefits.map(({ name, icon: Icon }) => (
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
                    noValidate
                    className="bg-[#191A20] border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col justify-center"
                >
                    <div className="mb-8">
                        <h1 className="text-3xl font-extrabold text-white">Create Account</h1>
                        <p className="text-zinc-400 mt-2">Join TechStore and start shopping today.</p>
                    </div>

                    {fields.map(({ name, label, type, placeholder, icon: Icon }) => {
                        const isPassword = type === "password";

                        return (
                            <div key={name} className="mb-5">
                                <label htmlFor={name} className="text-white text-sm">{label}</label>
                                <div className="relative mt-2">
                                    <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                                    <input
                                        id={name}
                                        type={isPassword && showPassword ? "text" : type}
                                        name={name}
                                        placeholder={placeholder}
                                        value={formData[name]}
                                        onChange={handleChange}
                                        autoComplete={
                                            name === "name" ? "name" :
                                            name === "email" ? "email" :"new-password"
                                        }
                                        className={`w-full rounded-xl bg-[#23242C] border pl-11 ${isPassword ? "pr-12" : "pr-4"} py-3
                                        text-white placeholder:text-zinc-500 outline-none transition
                                        focus:ring-2 ${errors[name]
                                                ? "border-red-500/60 focus:border-red-500 focus:ring-red-500/20"
                                                : "border-white/10 focus:border-indigo-500 focus:ring-indigo-500/30"
                                            }`}
                                    />
                                    {isPassword && (
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword((s) => !s)}
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    )}
                                </div>

                                {errors[name] && (
                                    <p className="text-red-500 text-sm mt-1">{errors[name][0]}</p>
                                )}
                            </div>
                        );
                    })}

                    <button
                        type="submit"
                        disabled={registerMutation.isPending}
                        className="w-full mt-1 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition
                        font-semibold text-white disabled:opacity-50"
                    >
                        {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                    </button>

                    <p className="text-center text-zinc-400 mt-6">
                        Already have an account?
                        <span
                            onClick={() => navigate("/login")}
                            className="ml-2 text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium"
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;