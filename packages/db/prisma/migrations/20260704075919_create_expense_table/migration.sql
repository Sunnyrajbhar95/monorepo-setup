-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('Food', 'Travel', 'Shopping', 'Bills', 'Entertainment', 'Healthcare', 'Education', 'Rent', 'Salary', 'Investment', 'Fuel', 'Insurance', 'EMI', 'Subscription', 'Gift', 'Personal_Care', 'Office', 'Other');

-- CreateEnum
CREATE TYPE "PaymentMethod" AS ENUM ('UPI', 'Credit_Card', 'Debit_Card', 'Net_Banking', 'Cash', 'Gift_Card', 'Other');

-- CreateTable
CREATE TABLE "Expense" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "expenseType" "ExpenseType" NOT NULL,
    "otherExpenseType" TEXT,
    "notes" TEXT,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "otherPaymentMethod" TEXT,
    "reciept" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
