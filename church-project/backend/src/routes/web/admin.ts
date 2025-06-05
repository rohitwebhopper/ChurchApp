import express, { Request, Response, NextFunction } from "express";
import { AdminController } from "@/controllers/admin.controller";
import { uploadMulti } from "@/utils/multer";

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post(
  "/add",
  uploadMulti({
    folder: "admins",
    allowedTypes: {
      image: ["image/jpeg", "image/png", "image/webp"],
    },
  }),
  asyncHandler(AdminController.register)
);

router.post("/login", asyncHandler(AdminController.login));

export default router;
