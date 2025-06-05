import express, { Request, Response, NextFunction } from "express";
import { ChurchController } from "@/controllers/church.controller";
import { uploadMulti } from "@/utils/multer";

const router = express.Router();

const asyncHandler =
  (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };

router.post(
  "/add",
  uploadMulti({ folder: "church" }),
  asyncHandler(ChurchController.create)
);

router.put(
  "/update/:id",
  uploadMulti({ folder: "church" }),
  asyncHandler(ChurchController.update)
);
router.get("/get", asyncHandler(ChurchController.getAll));
router.get("/get/:id", asyncHandler(ChurchController.getById));

router.delete("/delete/:id", asyncHandler(ChurchController.delete));
router.patch("/status/:id", asyncHandler(ChurchController.patchStatus));

export default router;
