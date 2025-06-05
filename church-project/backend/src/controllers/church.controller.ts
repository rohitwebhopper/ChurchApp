import { Request, Response } from "express";
import { ChurchUseCase } from "@/usecase/church.usecase";
import { sendError, sendSuccess } from "@/middleware/apiHandlerResponse";
import { validateChurch } from "@/validation/church.validation";
import { ChurchDTO, ChurchUpdateDTO } from "@/interface/church.interface";
import { Status } from "@prisma/client";
import { formatChurch } from "@/formatter/church.formatter";

export const ChurchController = {
  async create(req: Request, res: Response) {
    try {
      const { data }: { data: ChurchDTO } = req.body;
      const files = req.files as {
        image?: Express.Multer.File[];
        agreement?: Express.Multer.File[];
      };

      if (!validateChurch(req, res)) return;

      const imagePath = files?.image?.[0]?.filename;
      const agreementPath = files?.agreement?.[0]?.filename;

      const bodyData: ChurchDTO = {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
        bank_name: req.body.bank_name,
        bank_acc_no: req.body.bank_acc_no,
        ifsc_code: req.body.ifsc_code,
        church_rules: req.body.church_rules,
        image: imagePath ? `src/uploads/church/${imagePath}` : "",
        agreement_url: agreementPath
          ? `src/uploads/church/${agreementPath}`
          : "",
      };

      const church = await ChurchUseCase.createChurch(bodyData);
      return sendSuccess(
        res,
        formatChurch(church),
        "Church created successfully"
      );
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const churches = await ChurchUseCase.getChurches();
      const formatChurches = churches.map((d) => formatChurch(d));
      return sendSuccess(res, formatChurches);
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const church = await ChurchUseCase.getChurchById(req.params.id);
      if (!church) {
        return sendError(res, "Church not found", 404);
      }
      return sendSuccess(res, formatChurch(church));
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },

  async update(req: Request, res: Response) {
    try {
      const data: Partial<ChurchDTO> = req.body;
      const files = req.files as {
        image?: Express.Multer.File[];
        agreement?: Express.Multer.File[];
      };

      if (!validateChurch(req, res)) return;

      const imagePath = files?.image?.[0]?.filename;
      const agreementPath = files?.agreement?.[0]?.filename;

      const bodyData: ChurchUpdateDTO = {
        ...data,
        ...(imagePath && { image: `src/uploads/church/${imagePath}` }),
        ...(agreementPath && {
          agreement_url: `src/uploads/church/${agreementPath}`,
        }),
      };

      const church = await ChurchUseCase.updateChurch(req.params.id, bodyData);

      if (!church) {
        return sendError(res, "Church not found", 404);
      }

      return sendSuccess(
        res,
        formatChurch(church),
        "Church updated successfully"
      );
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },
  async delete(req: Request, res: Response) {
    try {
      await ChurchUseCase.deleteChurch(req.params.id);
      return sendSuccess(res, null, "Church deleted successfully");
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },

  async patchStatus(req: Request, res: Response) {
    try {
      const { status }: { status: Status } = req.body;
      const updated = await ChurchUseCase.patchStatus(req.params.id, status);
      return sendSuccess(res, formatChurch(updated), "Church status updated");
    } catch (err) {
      return sendError(res, (err as Error).message);
    }
  },
};
