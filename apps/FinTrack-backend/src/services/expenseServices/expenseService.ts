import { urlToHttpOptions } from "node:url";
import expenseRepo from "../../repositories/expense.ts";
import apiError from "../../utils/apiError.ts";
import type { Expense } from "@prisma/client";
import uploadCloudinary from "../cloudinary/cloudinary.ts";
import extractpublicid from "../../utils/extractPublicId.ts";
import cloudinary from "../../config/cloudinary.config.ts";
class expenseService {
  readonly expenseRepo: expenseRepo;
  constructor() {
    this.expenseRepo = new expenseRepo();
  }

  async addExpense(
    expensedata: Expense,
    id: string,
    file: Express.Multer.File,
  ): Promise<Expense | null> {
    if (!id) {
      throw new apiError(400, "User Id is required");
    }
    let receipt = null;
    if (file) {
      const response = await uploadCloudinary(file.path, "expenses");
      receipt = response.secure_url;
    }

    const expense = await this.expenseRepo.createExpense({
      ...expensedata,
      userId: id,
      amount: Number(expensedata.amount),
      date: new Date(expensedata.date),
      reciept: receipt,
    });
    return expense;
  }

  async fetchAllExpense(query: any, userId: string) {
    const { paymentMethod, expenseType, startDate, endDate, page, limit } =
      query;
    const pageNo = page || 1;
    const limitNo = limit || 10;
    const filter: any = {
      userId: userId,
    };
    if (paymentMethod) {
      filter.paymentMethod = paymentMethod;
    }

    if (expenseType) {
      filter.expenseType = expenseType;
    }
    if (startDate && endDate) {
      filter.date = {
        gte: new Date(startDate),
        lte: new Date(endDate),
      };
    }

    const countData = await this.expenseRepo.countdata(filter);
    const totalPages = Math.ceil(countData / Number(limitNo));

    const expenses = await this.expenseRepo.findAllExpense(
      filter,
      Number(pageNo),
      Number(limitNo),
    );
    const pagination = {
      page: Number(pageNo),
      limit: Number(limitNo),
      totalPages: totalPages,
      total: countData,
    };
    return { expenses, pagination };
  }

  async updateExpense(
    id: string,
    data: Expense,
    file: Express.Multer.File,
    userId: string,
  ): Promise<Expense | null> {
    if (!id) {
      throw new apiError(400, "id is required");
    }
    const response = await this.expenseRepo.findExpenseByid(id, userId);
    if (!response) {
      throw new apiError(404, "expense not found");
    }

    let receipt = null;
    if (file) {
      const response = await uploadCloudinary(file.path, "expenses");
      receipt = response.secure_url;
    }
    const payload: any = {};
    if (data?.amount) {
      payload.amount = Number(data.amount);
    }
    if (data?.expenseType) {
      payload.expenseType = data.expenseType;
    }
    if (data?.otherExpenseType) {
      payload.otherExpenseType = data.otherExpenseType;
    }
    if (data?.notes) {
      payload.notes = data.notes;
    }
    if (data?.paymentMethod) {
      payload.paymentMethod = data.paymentMethod;
    }
    if (data?.otherPaymentMethod) {
      payload.otherPaymentMethod = data.otherPaymentMethod;
    }
    if (receipt) {
      payload.reciept = receipt;
    }
    if (data?.date) {
      payload.date = new Date(data.date);
    }
    const updatedExpense = await this.expenseRepo.updateExpense(
      id,
      userId,
      payload,
    );
    if (response?.reciept && file) {
      const pubicId = extractpublicid.publicIdExtractor(response.reciept);
      await cloudinary.uploader.destroy(pubicId);
    }
    return updatedExpense;
  }

  async getSingleExpense(id: string, userId: string) {
    if (!id) {
      throw new apiError(400, "id is required");
    }
    const response = await this.expenseRepo.findExpenseByid(id, userId);
    if (!response) {
      throw new apiError(404, "expense not found");
    }
    return response;
  }

  async deleteExpense(id: string, userId: string) {
    if (!id) {
      throw new apiError(400, "id is required");
    }
    const response = await this.expenseRepo.findExpenseByid(id, userId);
    if (!response) {
      throw new apiError(404, "expense not found");
    }
    const deletedExpense = await this.expenseRepo.deleteExpense(id);
    return deletedExpense;
  }
}

export default expenseService;
