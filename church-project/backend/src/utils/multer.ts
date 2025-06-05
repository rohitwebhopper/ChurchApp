import multer from "multer";
import path from "path";
import fs from "fs";

interface MultiUploadOptions {
  folder: string;
  allowedTypes?: Record<string, string[]>;
}

export const uploadMulti = (options: MultiUploadOptions) => {
  const storage = multer.diskStorage({
    destination: (_req, file, cb) => {
      const folderPath = path.join(__dirname, "../uploads", options.folder);
      fs.mkdirSync(folderPath, { recursive: true });
      cb(null, folderPath);
    },
    filename: (_req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, `${name}-${uniqueSuffix}${ext}`);
    },
  });

  const fileFilter = (_req: any, file: Express.Multer.File, cb: any) => {
    const defaultAllowed = [
      "image/png",
      "image/jpeg",
      "image/webp",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedTypes =
      options.allowedTypes?.[file.fieldname] || defaultAllowed;

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error(`Invalid file type for ${file.fieldname}`), false);
    }
  };

  return multer({ storage, fileFilter }).fields([
    { name: "image", maxCount: 1 },
    { name: "agreement", maxCount: 1 },
  ]);
};

export const ExistingFile = (filePath: string | null) => {
  if (!filePath) return;

  const normalizedPath = filePath.replace(/^\/+/g, "").replace(/^src\//, "");
  const fullPath = path.join(process.cwd(), "src", normalizedPath);

  fs.unlink(fullPath, (err) => {
    if (err) {
      console.warn(`Failed to delete file (${fullPath}):`, err.message);
    } else {
      console.log(`Deleted file: ${fullPath}`);
    }
  });
};
