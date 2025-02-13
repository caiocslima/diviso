import { Request, Response } from "express";
import { ExpenseService } from "../services/expense.service";

const expenseService = new ExpenseService();

export const createExpense = async (req: Request, res: Response) => {
  try {
    const expense = await expenseService.createExpense(req.body);
    return res.status(201).json(expense);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const getExpensesByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const expenses = await expenseService.getExpensesByUser(userId);
    return res.status(200).json(expenses);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
