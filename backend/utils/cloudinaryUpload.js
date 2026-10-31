import cloudinary from "../config/cloudinary.js";

const uploadToCloudinary = (fileBuffer) => {

    return new Promise((resolve, reject) => {

        const uploadStream = cloudinary.uploader.upload_stream(
            {folder: "TechStore/products",resource_type: "image"},(error, result) => {

                if (error) {
                    return reject(error);
                }

                resolve(result);

            }
        );

        uploadStream.end(fileBuffer);

    });

};

export default uploadToCloudinary;