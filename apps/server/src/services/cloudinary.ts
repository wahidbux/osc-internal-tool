import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localPathOfFile: string): Promise<string> => {
  
  if (!localPathOfFile || typeof localPathOfFile !== "string") {
    throw new Error("No or Invalid file path provided for upload");
  }

  try {
    const response = await cloudinary.uploader.upload(localPathOfFile, {
      resource_type: "auto",
    });

    if (fs.existsSync(localPathOfFile)) {
      fs.unlinkSync(localPathOfFile);
    }

    return response.secure_url; // final url for return
  } catch (error) {
    if (fs.existsSync(localPathOfFile)) {
      fs.unlinkSync(localPathOfFile);
    }
    console.error("Cloudinary error:", error);
    throw error;
  }
};

export default uploadOnCloudinary;
