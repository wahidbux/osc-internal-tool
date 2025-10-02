import multer from "multer";

const storage = multer.memoryStorage();

/**
 * File filter function to validate image MIME types
 * @param req - Express request object
 * @param file - Multer file object
 * @param cb - Callback function
 */
const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  // Accepted image MIME types
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        `Invalid file type. Only ${allowedMimeTypes.join(", ")} are allowed.`
      )
    );
  }
};

export const imageUpload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
  fileFilter: fileFilter,
});
