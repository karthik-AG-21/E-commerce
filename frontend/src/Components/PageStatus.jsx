// components/PageStatus.jsx
// Reusable loading / error screens so every page looks the same.

export function Spinner({ size = 40, className = "" }) {
    return (
        <span
            role="status"
            aria-label="Loading"
            style={{ width: size, height: size }}
            className={`inline-block animate-spin rounded-full border-4 border-white/20 border-t-white motion-reduce:animate-none ${className}`}
        />
    );
}

export function PageLoader({ message = "Loading..." }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0F1420] px-4 text-white">
            <Spinner />
            <p className="text-sm sm:text-base">{message}</p>
        </div>
    );
}

export function PageError({
    message = "Something went wrong. Please try again.",
    onRetry,
}) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#0F1420] px-4 text-center text-red-400">
            <p className="text-sm sm:text-base">{message}</p>
            {onRetry && (
                <button
                    type="button"
                    onClick={onRetry}
                    className="rounded-md border border-red-400/50 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                >
                    Try again
                </button>
            )}
        </div>
    );
}