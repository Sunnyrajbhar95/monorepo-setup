import type {
  CreateBillRequest,
  BillParticipentRequest,
} from "../types/bill.types.ts";
 import { prisma } from "@monorepo-setup/db/src/index.ts";
import type { Bill, BillParticipent } from "@monorepo-setup/db/src/index.ts";
class BillRepository {
  async createBill(data: CreateBillRequest): Promise<Bill> {
    return await prisma.bill.create({
      data: {
        ...data,
      },
    });
  }

  async createParticipent(
    data: BillParticipentRequest[],
  ): Promise<BillParticipent[]> {
    const response = await Promise.all(
      data.map((item) => prisma.billParticipent.create({ data: { ...item } })),
    );
    return response;
  }
} 

export default BillRepository;
