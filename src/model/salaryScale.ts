import mongoose, { Schema } from "mongoose";
import { IsalaryScale } from "./interface/salaryScale";

const salaryScaleSchema: Schema<IsalaryScale> = new Schema(
  {
    title: { type: String, required: true },
    components: [
      {
        componentId: {
          type: Schema.Types.ObjectId,
          ref: "SalaryComponent",
          required: true,
        },
        name: { type: String },
        type: { type: String },
        amount: { type: Number },
      },
    ],
    description: { type: String, required: true },
    totalDeductions: { type: Number, default: 0, },
    totalEarnings: { type: Number, default: 0,},
    netSalary: { type: Number, default: 0,},
  },
  {
    timestamps: true,
  }
);

const salaryScaleModel = mongoose.model<IsalaryScale>(
  "salaryScale",
  salaryScaleSchema
);
export default salaryScaleModel;
