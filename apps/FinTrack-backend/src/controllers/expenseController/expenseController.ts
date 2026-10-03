import type { Request, Response } from "express";
import expenseService from "../../services/expenseServices/expenseService.ts";
import asyncHandler from "../../utils/asyncHandler.ts";
import apiResponse from "../../utils/apiResponse.ts";

class expenseController {
  private expenseService: expenseService;
  constructor() {
    this.expenseService = new expenseService();
  }
  createexpense = asyncHandler(async (req: Request, res: Response) => {
    const file = req.file as Express.Multer.File;
    const response = await this.expenseService.addExpense(
      req.body,
      req.user.id,
      file,
    );
    res
      .status(201)
      .json(new apiResponse(201, "Expense created successfully", response));
  });

  AllExpenses = asyncHandler(async (req: Request, res: Response) => {
    const userId = req.user.id;
    const response = await this.expenseService.fetchAllExpense(
      req.query,
      userId,
    );
    res
      .status(200)
      .json(new apiResponse(200, "Expense fetched successfully", response));
  });

  updateExpense = asyncHandler(async (req: Request, res: Response) => {
    const { id } = req.params;
    const file = req.file as Express.Multer.File;
    const userId = req.user.id;
    const response = await this.expenseService.updateExpense(
      id,
      req.body,
      file,
      userId,
    );
    res
      .status(200)
      .json(new apiResponse(200, "Expense updated successfully", response));
  });

  getAllExpense = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user.id as string;
    const response = await this.expenseService.getSingleExpense(id, userId);
    res
      .status(200)
      .json(new apiResponse(200, "Expense fetched successfully", response));
  });

  deleteExpense = asyncHandler(async (req: Request, res: Response) => {
    const id = req.params.id as string;
    const userId = req.user.id as string;
    const response = await this.expenseService.deleteExpense(id, userId);
    res
      .status(200)
      .json(new apiResponse(200, "Expense deleted successfully", response));
  });
}

export default expenseController;
