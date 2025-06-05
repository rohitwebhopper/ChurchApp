import express, { Request, Response } from "express";
import adminRoutes from "./admin";
import churchRoutes from "./church";

const router = express.Router();

router.use("/admin", adminRoutes);
router.use("/church", churchRoutes);

router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Api not found",
    data: null,
  });
});

export default router;
