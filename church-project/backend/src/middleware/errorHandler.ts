import { Request, Response, NextFunction } from "express";
import { sendError } from "./apiHandlerResponse";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const statusCode = err.status || 400;
  sendError(res, err.message || "Something went wrong", statusCode);
};
