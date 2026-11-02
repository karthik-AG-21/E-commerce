import multer from "multer";

const errorHandler = (err, req, res, next) => {

    console.error("Error:", err.message);

    // Multer errors
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                success: false,
                message: "File size must not exceed 5 MB"
            });
        }

        if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({
                success: false,
                message: "Unexpected file field"
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Custom file validation errors
    if (err.message === "Only JPEG, PNG and WEBP images are allowed") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Other errors
    console.error("Stack:", err.stack);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default errorHandler;