import { Request, Response } from "express";
import { sendError } from "@/middleware/apiHandlerResponse";
import { isValidEmail, isValidPhone, isValidName } from "@/utils/validator";

export function validateAdminRegistration(
  req: Request,
  res: Response
): boolean {
  const { name, email, phone, password, secretkey } = req.body;

  if (!name) {
    sendError(res, "Name is required");
    return false;
  }
  if (!isValidName(name)) {
    sendError(res, "Invalid name (min 2 characters)");
    return false;
  }

  if (!email) {
    sendError(res, "Email is required");
    return false;
  }
  if (!isValidEmail(email)) {
    sendError(res, "Invalid email format");
    return false;
  }

  if (!password) {
    sendError(res, "Password is required");
    return false;
  }
  if (password.length < 6) {
    sendError(res, "Password must be at least 6 characters");
    return false;
  }

  if (!secretkey || process.env.SECRET_KEY !== secretkey) {
    sendError(res, "Invalid secret key");
    return false;
  }

  return true;
}
