import mongoose, { Schema } from "mongoose";
import { IsalaryScale } from "./interface/salaryScale";

const salaryScaleSchema: Schema<IsalaryScale> = new Schema(
  {
    title: { type: String, required: true },
    employeeId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    components: [
      {
        componentId: {
          type: Schema.Types.ObjectId,
          ref: "SalaryComponent",
          required: true,
        },
        name: { type: String, required: true },
        amount: { type: Number, required: true },
      },
    ],
    description: { type: String, required: true },
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
