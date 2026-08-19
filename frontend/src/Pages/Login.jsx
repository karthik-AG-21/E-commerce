import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../service/authApi";
import { toast } from "react-toastify";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });

    const [loginError, setLoginError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
        setLoginError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setIsLoading(true);

        try {

            
            const user = await loginRequest(formData);

            const userDetails = { name:user.name , email:user.email, role:user.role, id:user.id }

            localStorage.setItem("userId", user.id);

            localStorage.setItem("user", JSON.stringify(userDetails) )


            

            if (user.role == "admin") {
                toast.success(`Welcome ${user.name}!`);
                navigate("/Dashboard")
            } else {
                if(!user.isBlocked){
                    toast.success(`Welcome ${user.name}!`);
                    navigate("/");
                }else{
                    toast.error(`Your Blocked`);
                }
                
            }

        } catch (error) {
            setLoginError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen bg-[#0B0B0F] flex items-center justify-center overflow-hidden">


            <div className="absolute top-10 left-10 w-72 h-72 bg-indigo-600/20 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/20 blur-[120px] rounded-full"></div>


            <form
                onSubmit={handleSubmit}
                className="relative z-10 w-full max-w-md bg-[#191A20] border
                 border-white/10 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                    <p className="text-zinc-400 mt-2">Login to continue shopping at TechStore.</p>
                </div>


                <div className="mb-5">
                    <label className="text-white text-sm">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl bg-[#23242C] border border-white/10 px-4 
                        py-3 text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500" />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="text-white text-sm">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-2 w-full rounded-xl bg-[#23242C] border border-white/10 px-4 py-3
                         text-white placeholder:text-zinc-500 outline-none focus:border-indigo-500"
                    />
                </div>

                {loginError && (
                    <p className="text-red-500 text-sm mb-4 text-center">{loginError}</p>
                )}


                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 
                    transition font-semibold text-white disabled:opacity-50">
                    {isLoading ? "Logging in..." : "Login"}
                </button>


                <p className="text-center text-zinc-400 mt-6">
                    Don't have an account? <span onClick={() => navigate("/register")}
                        className="ml-2 text-indigo-400 hover:text-indigo-300 cursor-pointer font-medium">
                        Register</span></p>
            </form>
        </div>
    );
}

export default Login;