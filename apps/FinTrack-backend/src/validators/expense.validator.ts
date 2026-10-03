import z from "zod";
export const expenseSchema = z.object({
  amount: z.coerce
    .number({ message: "Amount is required" })
    .min(1, { message: "Amount must be greater than 0" }),
  expenseType: z.enum([
    "Food",
    "Travel",
    "Shopping",
    "Bills",
    "Entertainment",
    "Healthcare",
    "Education",
    "Rent",
    "Salary",
    "Investment",
    "Fuel",
    "Insurance",
    "EMI",
    "Subscription",
    "Gift",
    "Personal_Care",
    "Office",
    "Other",
  ],{message:"Expense Type is required"}),
  paymentMethod: z.enum([
    "UPI",
    "Credit_Card",
    "Debit_Card",
    "Net_Banking",
    "Cash",
    "Gift_Card",
    "Other",
  ],{message:"Payment Method is required"}),
  date: z.coerce.date({ message: "Date is required" }), 
}); 
 