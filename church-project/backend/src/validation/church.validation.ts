import { Request, Response } from "express";
import { sendError } from "@/middleware/apiHandlerResponse";
import { isValidEmail, isValidPhone, isValidName } from "@/utils/validator";

export function validateChurch(req: Request, res: Response): boolean {
  const { name, email, phone, address, bank_name, bank_acc_no, ifsc_code } =
    req.body;

  if (!name) {
    sendError(res, "Name is required");
    return false;
  }
  if (!isValidName(name)) {
    sendError(res, "Invalid name (min 2 characters)");
    return false;
  }

  if (!phone) {
    sendError(res, "Phone is required");
    return false;
  }
  if (!isValidPhone(phone)) {
    sendError(res, "InValid Phone Number");
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
  if (!address) {
    sendError(res, "Address is required");
    return false;
  }
  if (!bank_name) {
    sendError(res, "Bank name is required");
    return false;
  }
  if (!bank_acc_no) {
    sendError(res, "Bank account number is required");
    return false;
  }
  if (!ifsc_code) {
    sendError(res, "Swift code is required");
    return false;
  }

  return true;
}
