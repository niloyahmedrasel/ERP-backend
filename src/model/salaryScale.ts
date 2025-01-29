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
        amount: { type: Number },
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
