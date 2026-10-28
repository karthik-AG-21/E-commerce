
import { AlertDialog } from "radix-ui";

function ConfirmDialog({
    open,
    title,
    description,
    confirmText = "Confirm",
    notConfirmText = "Cancel",
    confirmButtonClass =
        "bg-indigo-600 hover:bg-indigo-500 focus:ring-indigo-400",
    onConfirm,
    onCancel,
}) {
    return (
        <AlertDialog.Root
            open={open}
            onOpenChange={(isOpen) => {
                if (!isOpen) onCancel?.();
            }}
        >
            <AlertDialog.Portal>
                {/* Overlay */}
                <AlertDialog.Overlay
                    className="
                        fixed inset-0 z-[100]
                        bg-black/60
                        backdrop-blur-[2px]
                    "
                />

                {/* Responsive modal */}
                <AlertDialog.Content
                    className="
                        fixed left-1/2 top-1/2 z-[101]
                        w-[calc(100%-2rem)] max-w-lg
                        max-h-[calc(100dvh-2rem)]
                        -translate-x-1/2 -translate-y-1/2
                        overflow-y-auto overscroll-contain
                        rounded-2xl
                        border border-white/10
                        bg-[#171E2D]
                        p-5
                        text-white
                        shadow-2xl
                        outline-none
                        sm:p-7
                        md:p-8
                    "
                >
                    <AlertDialog.Title
                        className="
                            break-words
                            text-xl font-semibold
                            leading-snug tracking-normal
                            sm:text-2xl
                        "
                    >
                        {title}
                    </AlertDialog.Title>

                    <AlertDialog.Description
                        className="
                            mt-3 break-words
                            text-sm leading-6 text-gray-400
                            sm:text-base
                        "
                    >
                        {description}
                    </AlertDialog.Description>

                    {/* Action buttons */}
                    <div
                        className="
                            mt-6 flex flex-col-reverse gap-3
                            sm:mt-8 sm:flex-row sm:justify-end
                        "
                    >
                        <AlertDialog.Cancel asChild>
                            <button
                                type="button"
                                onClick={onCancel}
                                className="
                                    min-h-11 w-full
                                    rounded-xl border border-white/10
                                    bg-white/5 px-5 py-3
                                    text-sm font-medium text-gray-300
                                    transition-colors
                                    hover:bg-white/10 hover:text-white
                                    focus-visible:outline-none
                                    focus-visible:ring-2
                                    focus-visible:ring-white/40
                                    sm:w-auto
                                "
                            >
                                {notConfirmText}
                            </button>
                        </AlertDialog.Cancel>

                        <button
                            type="button"
                            onClick={onConfirm}
                            className={`
                                min-h-11 w-full rounded-xl
                                px-5 py-3
                                text-sm font-semibold text-white
                                transition-colors
                                focus-visible:outline-none
                                focus-visible:ring-2
                                focus-visible:ring-offset-2
                                focus-visible:ring-offset-[#171E2D]
                                sm:w-auto
                                ${confirmButtonClass}
                            `}
                        >
                            {confirmText}
                        </button>
                    </div>
                </AlertDialog.Content>
            </AlertDialog.Portal>
        </AlertDialog.Root>
    );
}

export default ConfirmDialog;
