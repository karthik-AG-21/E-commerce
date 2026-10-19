import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from "react-icons/fa";
import useUserProfile from "../hooks/useUserProfile";
import Header from "../Components/Header.jsx";
import Footer from "../Components/Footer.jsx";

function Profile() {
    const navigate = useNavigate();

    const { data, isLoading, isError } = useUserProfile();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
                <p className="text-indigo-400 text-lg">Loading profile...</p>
            </div>
        );
    }

    if (isError || !data?.success || !data?.data) {
        return (
            <div className="min-h-screen bg-[#0B0B0F] flex items-center justify-center">
                <p className="text-red-400">Failed to load profile.</p>
            </div>
        );
    }

    const user = data.data;

    return (
        <>
            <section className="min-h-screen bg-[#0B0B0F] py-28 px-6">
                <div className="max-w-5xl mx-auto">
                    <Header />

                    {/* Back button */}
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white transition mb-8"
                    >
                        <FaArrowLeft />
                        Back to Home
                    </button>

                    {/* Heading */}
                    <div className="mb-10">
                        <span className="inline-block px-4 py-2 rounded-full
                        bg-indigo-600/20 border border-indigo-500/30
                        text-indigo-300 text-sm font-semibold mb-4">
                            ACCOUNT SETTINGS
                        </span>

                        <h1 className="text-4xl font-extrabold text-white">
                            My Profile
                        </h1>

                        <p className="text-zinc-400 mt-2">
                            Manage your personal information and account security.
                        </p>
                    </div>

                    {/* Profile card */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* User summary */}
                        <div className="bg-white/5 border border-white/10
                        rounded-2xl p-8 flex flex-col items-center text-center">

                            <div className="w-24 h-24 rounded-full
                            bg-indigo-600/20 border border-indigo-500/40
                            flex items-center justify-center mb-5">

                                <span className="text-4xl font-bold text-indigo-400">
                                    {user.name?.[0]?.toUpperCase() || "U"}
                                </span>
                            </div>

                            <h2 className="text-xl font-bold text-white break-words">
                                {user.name}
                            </h2>

                            <p className="text-zinc-400 text-sm mt-2 break-all">
                                {user.email}
                            </p>

                            <div className="mt-6 px-4 py-2 rounded-full
                            bg-indigo-600/20 text-indigo-300 text-xs font-semibold">
                                TECHSTORE MEMBER
                            </div>
                        </div>

                        {/* Account details */}
                        <div className="md:col-span-2 bg-white/5 border border-white/10
                        rounded-2xl p-8">

                            <h2 className="text-xl font-bold text-white mb-6">
                                Personal Information
                            </h2>

                            <div className="space-y-5">

                                <div className="flex items-center gap-4 p-4 rounded-xl
                                bg-black/20 border border-white/5">

                                    <FaUser className="text-indigo-400 text-xl" />

                                    <div>
                                        <p className="text-zinc-500 text-sm">Full Name</p>
                                        <p className="text-white font-medium">
                                            {user.name || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 rounded-xl
                                bg-black/20 border border-white/5">

                                    <FaEnvelope className="text-indigo-400 text-xl" />

                                    <div>
                                        <p className="text-zinc-500 text-sm">Email Address</p>
                                        <p className="text-white font-medium break-all">
                                            {user.email || "Not provided"}
                                        </p>
                                    </div>
                                </div>

                            </div>

                            {/* Security section */}
                            <div className="border-t border-white/10 mt-8 pt-8">

                                <h2 className="text-xl font-bold text-white">
                                    Account Security
                                </h2>

                                <p className="text-zinc-400 text-sm mt-2 mb-5">
                                    Keep your account secure by updating your password regularly.
                                </p>

                                <button
                                    onClick={() => navigate("/change-password")}
                                    className="flex items-center justify-center gap-3
                                    px-6 py-3 rounded-xl bg-indigo-600 text-white
                                    font-semibold hover:bg-indigo-700
                                    transition-all duration-300"
                                >
                                    <FaLock />
                                    Change Password
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div>
            <Footer />
            </div>
        </>

    );
}

export default Profile;