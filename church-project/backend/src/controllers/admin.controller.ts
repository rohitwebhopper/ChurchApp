import { Request, Response } from "express";
import { AdminUsecase } from "@/usecase/admin.usecase";
import { sendSuccess, sendError } from "@/middleware/apiHandlerResponse";
import { formatAdmin } from "@/formatter/admin.formatter";
import bcrypt from "bcryptjs";
import { Role } from "@prisma/client";
import {
  validateAdminRegistration,
  validateLogin,
} from "@/validation/admin.validation";

export const AdminController = {
  register: async (req: Request, res: Response): Promise<Response | void> => {
    try {
      const file = req.file;

      if (!validateAdminRegistration(req, res)) return;

      const { name, email, phone, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const bodyData = {
        name,
        email,
        phone,
        password: hashedPassword,
        image: file ? `src/uploads/admins/${file.filename}` : "",
        role: Role.SUPER_ADMIN,
      };

      const admin = await AdminUsecase.registerAdmin(bodyData);

      return sendSuccess(
        res,
        formatAdmin(admin),
        "Admin registered successfully"
      );
    } catch (err: any) {
      return sendError(res, err.message || "  Failed to register admin");
    }
  },

  login: async (req: Request, res: Response): Promise<Response | void> => {
    try {
      if (!validateLogin(req, res)) return;

      const { email, password } = req.body;

      const { token, admin } = await AdminUsecase.loginAdmin({
        email,
        password,
      });

      return sendSuccess(res, { token, admin }, "Login successful");
    } catch (err: any) {
      return sendError(res, err.message || "Failed to login");
    }
  },
};
