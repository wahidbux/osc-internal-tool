import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// need to change it because change from disk to memory storage in multer
export const uploadOnCloudinary = async (
  buffer: Buffer,
  filename: string,
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const data = cloudinary.uploader.upload_stream(
      { resource_type: "auto", public_id: filename },
      (err, finalResult) => {
        if (err) return reject(err);
        resolve(finalResult?.secure_url as string);
      },
    );
    data.end(buffer);
  });
};

export const extractPublicId = (url: string): string => {
  try {
    const parts = url.split("/upload/");

    if (parts.length < 2) throw new Error("not a valid Cloudinary URL");

    const uploadAfter = parts[1]!;
    const withoutVersion = uploadAfter.replace(/^v\d+\//, "");
    const publicId =
      withoutVersion.substring(0, withoutVersion.lastIndexOf(".")) ||
      withoutVersion; // remove the extnsn

    return publicId;
  } catch (error) {
    throw new Error("Could not extract public_id from URL");
  }
};

export const deleteFromCloudinary = async (url: string): Promise<boolean> => {
  try {
    if (!url || typeof url !== "string")
      throw new Error("No Url given or Invalid Url");

    const publicId = extractPublicId(url);
    const final = await cloudinary.uploader.destroy(publicId, {
      resource_type: "auto",
    });

    return final.result === "ok" || final.result === "not found"; // multiple return types from cloudinary can include more if needed in future
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    throw error;
  }
};
