import multer from "multer";

const errorHandler = (err, req, res, next) => {

    // Multer-specific errors
    if (err instanceof multer.MulterError) {

        if (err.code === "LIMIT_FILE_SIZE") {
            return res.status(413).json({
                success: false,
                message: "File size must not exceed 5 MB"
            });
        }

        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    // Custom fileFilter errors
    if (err.message === "Only JPEG, PNG and WEBP images are allowed") {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        message: "Internal server error"
    });
};

export default errorHandler;