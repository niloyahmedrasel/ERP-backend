import { IEmployee } from "./interface/user";
import mongoose, { Schema, Document, Types } from "mongoose";

const employeeSchema: Schema<IEmployee> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    country: { 
      type: String,
      required: true 
    },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
      email: { type: String, required: true },
    },
    employmentDetails: {
      designationId: {
        type: Schema.Types.ObjectId,
        ref: "Designation",
        required: true,
      },
      departmentId: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
      },
      employmentStatusId: {
        type: Schema.Types.ObjectId,
        ref: "EmploymentStatus",
        required: true,
      },
      dateOfJoining: { type: Date, required: true },
      dateOfExit: { type: Date },
      salaryScaleId: {
        type: Schema.Types.ObjectId,
        ref: "salaryScale",
        required: true,
      },
      shiftId: { type: Schema.Types.ObjectId, ref: "officeShift", required: true },
    },
    identification: {
      nationalId: { type: String, required: true },
      passportNumber: { type: String, required: true },
      taxId: { type: String, required: true },
    },
    accountDetails: {
      bankAccountName: { type: String, required: true },
      bankAccountNumber: { type: String, required: true },
      bankName: { type: String, required: true },
      branchName: { type: String, required: true },
    },
    profilePicture: { type: String, required: true },
    status: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Create and export the model
const EmployeeModel = mongoose.model<IEmployee>("Employee", employeeSchema);
export default EmployeeModel;
