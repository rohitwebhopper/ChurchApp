import express, { Request, Response, NextFunction } from "express";
import { AdminController } from "@/controllers/admin.controller";
import { uploadSingle } from "@/utils/multer";

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post(
  "/add",
  uploadSingle("image", { folder: "admins" }),
  asyncHandler(AdminController.register)
);



export default router;
