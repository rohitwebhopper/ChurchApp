import multer from "multer";
import path from "path";
import fs from "fs";

interface DynamicUploadOptions {
  folder: string;
}

export const uploadSingle = (
  fieldName: string,
  options: DynamicUploadOptions
) => {
  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      const uploadPath = path.join(__dirname, "../uploads", options.folder);
      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Only PNG and WebP images are allowed!"), false);
    }
  };

  return multer({ storage, fileFilter }).single(fieldName);
};

export const ExistingImage = (imagePath: string | null) => {
  if (!imagePath) return;

  const normalizedPath = imagePath.replace(/^\/+/, "").replace(/^src\//, "");

  const fullPath = path.join(process.cwd(), "src", normalizedPath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.warn(`Failed to delete old image (${fullPath}):`, err.message);
    } else {
      console.log(`Deleted old image: ${fullPath}`);
    }
  });
};
