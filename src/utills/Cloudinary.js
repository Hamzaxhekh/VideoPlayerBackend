import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePathh) => {
  try {
    if (!localFilePathh) return null;
    const response = await cloudinary.uploader.upload(localFilePathh, {
      resource_type: "auto",
    });
    console.log("file is not uploaded on cloudinary", response.url);
    return response;
  } catch (err) {
    fs.unlinkSync(localFilePathh);
    return null;
  }
};

export { uploadOnCloudinary };
