import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Header from "../Components/Header";
import useUpdatePassword from "../hooks/useUpdatePassword";
import { toast } from "react-toastify";

function ChangePassword() {
    const navigate = useNavigate();

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {mutate , isPending,  isSuccess, error: apiError} = useUpdatePassword();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError("");

        if (!currentPassword || !newPassword || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (newPassword.length < 6) {
            setError("New password must be at least 6 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("New passwords do not match.");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password.");
            return;
        }

        console.log(currentPassword , newPassword , "hell")
        mutate(
            {
                currentPassword,
                newPassword,
            },
            {
                onSuccess: () => {
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                    
                    toast.success("Password updated successfully!");
                    navigate("/profile")
                },
            }
        );
    };

    const passwordFields = [
        {
            label: "Current Password",
            value: currentPassword,
            setValue: setCurrentPassword,
            visible: showCurrentPassword,
            toggle: () =>
                setShowCurrentPassword((prev) => !prev),
            placeholder: "Enter current password",
            autoComplete: "current-password",
        },
        {
            label: "New Password",
            value: newPassword,
            setValue: setNewPassword,
            visible: showNewPassword,
            toggle: () =>
                setShowNewPassword((prev) => !prev),
            placeholder: "Enter new password",
            autoComplete: "new-password",
        },
        {
            label: "Confirm New Password",
            value: confirmPassword,
            setValue: setConfirmPassword,
            visible: showConfirmPassword,
            toggle: () =>
                setShowConfirmPassword((prev) => !prev),
            placeholder: "Confirm new password",
            autoComplete: "new-password",
        },
    ];

    return (
        <div className="min-h-screen bg-[#0B0B0F] text-white">
            <Header />

            <main className="max-w-xl mx-auto px-5 pt-32 pb-8">
                <button
                    type="button"
                    onClick={() => navigate("/profile")}
                    className="text-zinc-400 hover:text-white mb-4"
                >
                    ← Back to Profile
                </button>

                <div className="bg-[#191A20] border border-white/10 rounded-2xl p-6 md:p-8">
                    <span
                        className="inline-block px-4 py-2 rounded-full
                        bg-indigo-600/20 border border-indigo-500/30
                        text-indigo-300 text-sm font-semibold mb-4"
                    >
                        ACCOUNT SECURITY
                    </span>

                    <h1 className="text-3xl font-bold mb-2">
                        Change Password
                    </h1>

                    <p className="text-zinc-400 mb-8">
                        Update your password to keep your account secure.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {passwordFields.map((field) => (
                            <div key={field.label}>
                                <label className="block text-sm text-zinc-300 mb-2">
                                    {field.label}
                                </label>

                                <div className="relative">
                                    <input
                                        type={
                                            field.visible
                                                ? "text"
                                                : "password"
                                        }
                                        autoComplete={field.autoComplete}
                                        value={field.value}
                                        onChange={(e) =>
                                            field.setValue(e.target.value)
                                        }
                                        placeholder={field.placeholder}
                                        disabled={isPending}
                                        className="w-full bg-[#0B0B0F] border
                                        border-white/10 rounded-xl px-4 py-3
                                        pr-12 outline-none focus:border-indigo-500
                                        disabled:opacity-60"
                                    />

                                    <button
                                        type="button"
                                        onClick={field.toggle}
                                        aria-label={
                                            field.visible
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        className="absolute right-4 top-1/2
                                        -translate-y-1/2 text-zinc-400
                                        hover:text-indigo-400"
                                    >
                                        {field.visible
                                            ? <FaEyeSlash />
                                            : <FaEye />}
                                    </button>
                                </div>
                            </div>
                        ))}

                        {error && (
                            <p role="alert" className="text-red-400 text-sm">
                                {error}
                            </p>
                        )}

                        {apiError && (
                            <p role="alert" className="text-red-400 text-sm">
                                {apiError.response?.data?.message ||
                                    "Failed to update password. Please try again."}
                            </p>
                        )}

                        {/* {isSuccess && (
                            <p role="status" className="text-green-400 text-sm">
                                Password updated successfully!
                            </p>
                        )} */}

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-700
                            disabled:opacity-50 disabled:cursor-not-allowed
                            rounded-xl py-3 font-semibold transition"
                        >
                            {isPending
                                ? "Updating..."
                                : "Update Password"}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default ChangePassword;