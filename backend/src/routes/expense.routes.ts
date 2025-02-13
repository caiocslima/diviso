import express from "express";
import { createExpense, getExpensesByUser } from "../controllers/expense.controller";

const router = express.Router();

router.post("/", createExpense as any);
router.get("/:userId", getExpensesByUser as any);

export default router;
