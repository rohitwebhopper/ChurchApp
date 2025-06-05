import { ChurchDTO, ChurchUpdateDTO } from "@/interface/church.interface";
import { ChurchRepository } from "@/repositories/church.repository";
import { ExistingFile } from "@/utils/multer";
import { Status } from "@prisma/client";

const BASE_URL = process.env.BASE_URL;

export const ChurchUseCase = {
  async createChurch(data: ChurchDTO) {
    const unique = await ChurchRepository.findUnique(data.name);
    if (unique) {
      data.image !== null && ExistingFile(data.image);
      data.agreement_url !== null && ExistingFile(data.agreement_url);
      throw new Error("Admin allready exist");
    }
    return ChurchRepository.create(data);
  },
  async getChurches() {
    return ChurchRepository.findAll();
  },
  async getChurchById(id: string) {
    return ChurchRepository.findById(id);
  },
  async updateChurch(id: string, data: ChurchUpdateDTO) {
    return await ChurchRepository.update(id, data);
  },
  async deleteChurch(id: string) {
    const existingChurch = await ChurchRepository.findById(id);
    if (!existingChurch) {
      throw new Error("Church not found");
    }
    return await ChurchRepository.delete(id);
  },
  async patchStatus(id: string, status: Status) {
    return ChurchRepository.updateStatus(id, status);
  },
};
