import { Types, Document } from "mongoose";

export interface IPayroll extends Document {
  _id: Types.ObjectId;
  employeeId: Types.ObjectId;
  salaryScaleId: Types.ObjectId;
  paymentMonth: Date;
  componentsBreakdown: {
    componentId: Types.ObjectId;
    name: string;
    amount: number;
    type: string;
  }[];
  grossSalary: number;
  totalDeductions: number;
  netSalary: number;
  transactionId: Types.ObjectId;
  status: string;
}
