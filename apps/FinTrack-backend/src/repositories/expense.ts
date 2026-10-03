import { prisma } from "../lib/prisma.ts";
import type { Expense } from "@prisma/client";

class expenseRepo {
  async createExpense(expense: Expense): Promise<Expense> {
    return prisma.expense.create({ data: expense });
  }
  async findExpenseByid(id: string, userId: string): Promise<Expense | null> {
    return await prisma.expense.findUnique({
      where: { id: id, userId: userId },
    });
  }
  async updateExpense(
    id: string,
    expense: Expense,
    userId: string,
  ): Promise<Expense | null> {
    return await prisma.expense.update({
      where: { id: id, userId: userId },
      data: expense,
    });
  }

  async findAllExpense(
    query: any,
    page: number,
    limit: number,
  ): Promise<Expense[]> {
    return await prisma.expense.findMany({
      where: query,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async deleteExpense(id: string): Promise<Expense | null> {
    return await prisma.expense.delete({ where: { id: id } });
  }

  async countdata(query: any): Promise<number> {
    return await prisma.expense.count({
      where: query,
    });
  }
}

export default expenseRepo;
