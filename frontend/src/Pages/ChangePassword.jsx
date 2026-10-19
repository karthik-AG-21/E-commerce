import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";

function ChangePassword() {
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (
            !currentPassword ||
            !newPassword ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        // Connect your change-password API here.
        console.log("Password form validated");
    };

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white">
            <Header />

            <main className="max-w-xl mx-auto px-5 pt-32 pb-8">
                <button
                    onClick={() => navigate("/profile")}
                    className="text-zinc-400 hover:text-white mb-4"
                >
                    ← Back to Profile
                </button>

                <div className="bg-[#191A20] border border-white/10
                    rounded-2xl p-6 md:p-8">

                    <span className="inline-block px-4 py-2 rounded-full
                        bg-indigo-600/20 border border-indigo-500/30
                        text-indigo-300 text-sm font-semibold mb-4">
                        ACCOUNT SECURITY
                    </span>

                    <h1 className="text-3xl font-bold mb-2">
                        Change Password
                    </h1>

                    <p className="text-zinc-400 mb-8">
                        Update your password to keep your account secure.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Current Password
                            </label>

                            <input
                                type="password"
                                autoComplete="current-password"
                                value={currentPassword}
                                onChange={(e) =>
                                    setCurrentPassword(e.target.value)
                                }
                                placeholder="Enter current password"
                                className="w-full bg-[#0B0B0F] border
                                    border-white/10 rounded-xl px-4 py-3
                                    outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                autoComplete="new-password"
                                value={newPassword}
                                onChange={(e) =>
                                    setNewPassword(e.target.value)
                                }
                                placeholder="Enter new password"
                                className="w-full bg-[#0B0B0F] border
                                    border-white/10 rounded-xl px-4 py-3
                                    outline-none focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-zinc-300 mb-2">
                                Confirm New Password
                            </label>

                            <input
                                type="password"
                                autoComplete="new-password"
                                value={confirmPassword}
                                onChange={(e) =>
                                    setConfirmPassword(e.target.value)
                                }
                                placeholder="Confirm new password"
                                className="w-full bg-[#0B0B0F] border
                                    border-white/10 rounded-xl px-4 py-3
                                    outline-none focus:border-indigo-500"
                            />
                        </div>

                        {error && (
                            <p className="text-red-400 text-sm">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-indigo-600 hover:bg-indigo-700
                                rounded-xl py-3 font-semibold transition"
                        >
                            Update Password
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ChangePassword;