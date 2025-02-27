import mongoose, { Schema, Document } from "mongoose";
import { IPayroll } from "./interface/payRoll";

const payrollSchema: Schema<IPayroll> = new Schema(
  {
    employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    salaryScaleId: {
      type: Schema.Types.ObjectId,
      ref: "salaryScale",
      required: true,
    },
    paymentMonth: { type: Date, required: true },
    componentsBreakdown: [
      {
        componentId: {
          type: Schema.Types.ObjectId,
          ref: "SalaryComponent",
          required: true,
        },
        name: { type: String },
        amount: { type: Number },
        type: { type: String },
      },
    ],
    grossSalary: { type: Number, default: 0, required: true },
    totalDeductions: { type: Number, default: 0, required: true },
    netSalary: { type: Number, default: 0, required: true },
    transactionId: {
      type: Schema.Types.ObjectId,
      default: null,
      ref: "Transaction",
    },
    status: { type: String, default: "Unpaid", required: true },
  },
  {
    timestamps: true,
  }
);

const PayrollModel = mongoose.model<IPayroll & Document>(
  "Payroll",
  payrollSchema
);
export default PayrollModel;
