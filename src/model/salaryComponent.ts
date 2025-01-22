import mongoose, { Schema } from 'mongoose';
import { ISalaryComponent } from './interface/salaryComponent';

const salaryComponentSchema: Schema<ISalaryComponent> = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ['Earning', 'Deduction'], required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SalaryComponentModel = mongoose.model<ISalaryComponent>('SalaryComponent', salaryComponentSchema);
export default SalaryComponentModel;
