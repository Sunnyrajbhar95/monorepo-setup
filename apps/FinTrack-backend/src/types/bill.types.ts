type BillStatus = "ACTIVE" | "SETTLED" | "PARTIALLY_PAID";

export interface CreateBillRequest {
  userId: string;
  title: string;
  description?: string;
  amount: number;
  spliteType: string;
  status: BillStatus;
  reciept?: string;
  billDate: Date;
  
}


 type BillParticipentStatus = "PENDING" | "PAID" | "PARTIALLY_PAID";
 export interface  BillParticipentRequest {
    billId:string;
    userId:string;
    owedAmount:number
    paidAmount:number
    status:BillParticipentStatus
}



