import mongoose, { Schema } from 'mongoose';
import { ISalaryComponent } from './interface/salaryComponent';

const salaryComponentSchema: Schema<ISalaryComponent> = new Schema(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    calculationMethod: { type: String, required: true },
    isTaxable: { type: Boolean, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const SalaryComponentModel = mongoose.model<ISalaryComponent>('SalaryComponent', salaryComponentSchema);
export default SalaryComponentModel;
