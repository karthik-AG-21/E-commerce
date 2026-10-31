import { useEffect, useMemo } from "react";

function ImagePreview({ selectedImage, existingImage }) {

    const previewUrl = useMemo(() => {
        if (!selectedImage) return existingImage || "";

        return URL.createObjectURL(selectedImage);
    }, [selectedImage, existingImage]);

    useEffect(() => {
        return () => {
            if (selectedImage && previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl, selectedImage]);

    if (!previewUrl) return null;

    return (
        <div className="mt-4">
            <p className="mb-2 text-sm text-slate-400">
                Image Preview
            </p>

            <img
                src={previewUrl}
                alt="Product preview"
                className="h-36 w-36 rounded-xl border border-white/10 bg-white object-contain p-2"
            />
        </div>
    );

}

export default ImagePreview;
