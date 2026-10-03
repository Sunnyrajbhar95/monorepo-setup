import express from "express";
import expensecontroller from "../../controllers/expenseController/expenseController.ts";
import userAuth from "../../middleware/AuthMiddleware.ts";
import { expenseSchema } from "../../validators/expense.validator.ts";
import validate from "../../middleware/validate.ts";
import uploads from "../../middleware/multer.ts";
const exp = new expensecontroller();

const expenseRouter = express.Router();

expenseRouter.post(
  "/add-expense",
  userAuth,
  uploads.single("receipt"),
  validate(expenseSchema),
  exp.createexpense,
);
expenseRouter.get("/all-expenses", userAuth, exp.AllExpenses);
expenseRouter.put(
  "/update-expense/:id",
  userAuth,
  uploads.single("receipt"),
  exp.updateExpense,
);
expenseRouter.get("/get-expense/:id", userAuth, exp.getAllExpense);
expenseRouter.delete("/delete-expense/:id", userAuth, exp.deleteExpense);

export default expenseRouter;
