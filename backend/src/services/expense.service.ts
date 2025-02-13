import prisma from "../config/db";

export class ExpenseService {
  async createExpense(data: any) {
    return await prisma.expense.create({
      data,
    });
  }

  async getExpensesByUser(userId: string) {
    return await prisma.expense.findMany({
      where: { userId },
      include: { category: true }
    });
  }
}
