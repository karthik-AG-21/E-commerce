import cloudinary from "../config/cloudinary.js";

const deleteFromCloudinary = async (public_id) => {

    const result = await cloudinary.uploader.destroy(public_id, {
        resource_type: "image"
    });

    return result;

};

export default deleteFromCloudinary;