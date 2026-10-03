import asyncHandler from "../../utils/asyncHandler.ts";
import BillService from "../../services/billServices/billServices.ts";
import ApiResponse from "../../utils/apiResponse.ts";
import type { Request, Response } from "express";

class BillController {
  private billService: BillService;
  constructor() {
    this.billService = new BillService();
  }
  addBill = asyncHandler(async (req: Request, res: Response) => {
    console.log(req.body);
    const userId = req.user?.id;
    const data = req.body;
    const file = req.file;
    const response = await this.billService.createBillService(
      userId,
      data,
      file,
    );
    res
      .status(201)
      .json(new ApiResponse(200, "Bill created successfully", response));
  });
}

export default new BillController();
