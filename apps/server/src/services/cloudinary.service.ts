import { v2 as cloudinary } from "cloudinary";

/**
 * Cloudinary upload response interface
 */
interface CloudinaryUploadResponse {
  url: string;
  public_id: string;
}

/**
 * Cloudinary delete response interface
 */
interface CloudinaryDeleteResponse {
  result: string;
}

/**
 * Configure Cloudinary with environment variables
 */
cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  secure: true,
});

/**
 * Cloudinary service class for handling image upload and deletion operations
 */
class CloudinaryService {
  /**
   * Upload image buffer to Cloudinary
   * @param file - The multer file object containing buffer and mimetype
   * @param folderName - The folder name in Cloudinary to organize uploads
   * @returns Promise with Cloudinary upload response containing URL and public_id
   */
  async uploadToCloudinary(
    file: Express.Multer.File,
    folderName: string
  ): Promise<CloudinaryUploadResponse> {
    try {
      if (!file || !file.buffer) {
        throw new Error("File with buffer is required");
      }

      if (!folderName) {
        throw new Error("Folder name is required");
      }

      // Convert buffer to base64 with correct MIME type from multer
      const fileBase64 = file.buffer.toString("base64");
      const dataUri = `data:${file.mimetype};base64,${fileBase64}`;

      // Determine resource type based on MIME type
      let resourceType: "image" | "video" | "raw" = "image";
      if (file.mimetype.startsWith("video/")) {
        resourceType = "video";
      } else if (!file.mimetype.startsWith("image/")) {
        resourceType = "raw";
      }

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(dataUri, {
        folder: folderName,
        resource_type: resourceType,
      });

      if (!result || !result.secure_url) {
        throw new Error("Failed to get upload response from Cloudinary");
      }

      return {
        url: result.secure_url,
        public_id: result.public_id,
      };
    } catch (error: any) {
      console.log("Cloudinary upload error:", error);
      throw new Error(error.message || "Failed to upload image to Cloudinary");
    }
  }

  /**
   * Delete image from Cloudinary using public_id
   * @param publicId - The public_id of the image to delete from Cloudinary
   * @returns Promise with Cloudinary delete response
   */
  async deleteFromCloudinary(
    publicId: string
  ): Promise<CloudinaryDeleteResponse> {
    try {
      if (!publicId) {
        throw new Error("Public ID is required");
      }

      const result = await cloudinary.uploader.destroy(publicId, {
        resource_type: "image",
      });

      if (!result) {
        throw new Error("Failed to get delete response from Cloudinary");
      }

      return result;
    } catch (error: any) {
      console.log("Cloudinary delete error:", error);
      throw new Error(
        error.message || "Failed to delete image from Cloudinary"
      );
    }
  }
}

export default new CloudinaryService();
export { cloudinary };
export type { CloudinaryDeleteResponse, CloudinaryUploadResponse };
