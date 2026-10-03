import { z } from "zod";
const bill = z.object({
  title: z.string({ message: "title is required" }),
  amount: z
    .number({ message: "amount is required" })
    .min(1, "Amount must be greater than 0"),
  spliteType: z.string({ message: "splite type is required" }),
  billDate: z.string({ message: "bill date is required" }),
  participents: z.array(
    z.object({
      owedAmount: z
        .number({ message: "owed amount is required" })
        .min(1, "owed amount must be greater than 0"),
      paidAmount: z
        .number({ message: "paid amount is required" })
        .min(0, "paid amount must be greater than or equal to 0"),
      status: z.string({ message: "status is required" }),
      name: z.string({ message: "name is required" }),
      email: z.string({ message: "email is required" }),
      mobile: z.number({ message: "mobile is required" }),
    }),
  ),
});
export default bill;
