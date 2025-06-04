import express, { Request, Response, NextFunction } from "express";

const router = express.Router();




// 404 handler for unknown routes
router.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Api not found",
    data: null,
  });
});

export default router;
