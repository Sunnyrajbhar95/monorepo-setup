import BillRepository from "../../repositories/bill.ts";
import apiError from "../../utils/apiError.ts";
import uploadCloudinary from "../cloudinary/cloudinary.ts";

class BillService {
  private billRepository: BillRepository;
  constructor() {
    this.billRepository = new BillRepository();
  }

  async createBillService(userId: string, data: any, file: any) {
    const { participents } = data;
    // this is the check the user is authorized or not
    if (!userId) {
      throw new apiError(401, "UnAuthorised access");
    }
    // this is the use used to upload the file
    var reciept = null;
    if (file) {
      const uploadedResponse = await uploadCloudinary(file.path);
      reciept = uploadedResponse.secure_url;
    }

    // this is used to the create the request payload
    const payload = {
      title: data.title,
      amount: data.amount,
      spliteType: data.spliteType,
      reciept: reciept,
      billDate: new Date(data.billDate),
      userId: userId,
      ...(data?.description && { description: data.description }),
    };
    // this is the use create the bill funtionality
    const bill = await this.billRepository.createBill(payload);
    if (!bill) {
      throw new apiError(500, "Failed to create bill");
    }

    const participentsPayload = participents.map((val: any) => {
      return {
        billId: bill?.id,
        userId: userId,
        owedAmount: val.owedAmount,
        paidAmount: val.paidAmount,
        name: val.name,
        email: val.email,
        mobile: val.mobile,
      };
    });

    const participentsResponse =
      await this.billRepository.createParticipent(participentsPayload);
    return { ...bill, participents: participentsResponse };
  }
}

export default BillService;
