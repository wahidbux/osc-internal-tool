import fs from "fs";
import express, { type Request, type Response } from "express";
import upload from "../../services/multer";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../../services/cloudinary";
import path from "path";

export const uploadRouter = express.Router();

// for multiple files upto 10 change accordingly
interface MulterRequest extends Request {
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}

// make a upload dir in root if by chance it doesn't
const uploadFolder = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder, { recursive: true });
}

// upload file of any type
uploadRouter.post(
  "/upload",
  upload.array("files", 10), // change as pr wish
  async (req: MulterRequest, res: Response) => {
    try {
      // Flatten files to array if by chance multer returns object
      const files: Express.Multer.File[] = Array.isArray(req.files)
        ? req.files
        : Object.values(req.files ?? {}).flat();

      if (!files || files.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "No files has uploaded" });
      }

      const uploadedUrls = [];

      for (let file of files) {
        const url = await uploadOnCloudinary(file.buffer, file.originalname);
        uploadedUrls.push(url);
      }
      // return array of urls
      return res.status(200).json({ success: true, urls: uploadedUrls });
    } catch (error: any) {
      console.error("Upload cloudinary error:", error);
      return res
        .status(500)
        .json({ success: false, message: error.message || "Upload failed" });
    }
  },
);

uploadRouter.post("/delete/cloudinary", async (req: Request, res: Response) => {
  try {
    const { url } = req.body;

    if (!url) {
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });
    }

    const deleted = await deleteFromCloudinary(url); // either true or false

    return res
      .status(200)
      .json({
        success: deleted,
        message: deleted
          ? "File deleted successfully"
          : "File not found on Cloudinary",
      });
  } catch (error: any) {
    console.error("Cloudinary delete route error:", error);
    return res
      .status(500)
      .json({
        success: false,
        message: error.message || "Deletion failed from cloudinary",
      });
  }
});
