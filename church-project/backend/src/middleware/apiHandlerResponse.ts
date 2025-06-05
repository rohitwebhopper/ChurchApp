import { Response } from "express";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  error?: string;
}

export const sendSuccess = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
) => {
  const response: ApiResponse<T> = {
    success: true,
    message,
    data,
  };
  return res.status(statusCode).json(response);
};

export const sendError = (
  res: Response,
  message = "Error",
  statusCode = 500
) => {
  const response: ApiResponse<null> = {
    success: false,
    message,
    data: null,
  };
  return res.status(statusCode).json(response);
};
