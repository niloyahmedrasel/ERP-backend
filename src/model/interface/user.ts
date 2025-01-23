import { Document, Types } from "mongoose";

export interface IEmergencyContact {
  name: string; // Name of emergency contact
  relation: string; // Relationship to employee
  phone: string; // Phone number of emergency contact
  email: string; // Email address of emergency contact
}

export interface IEmploymentDetails {
  designationId: string; // References the Designations collection (ObjectId as string)
  departmentId: string; // References the Departments collection (ObjectId as string)
  employmentStatusId: string; // References Employment Statuses (ObjectId as string)
  dateOfJoining: Date; // Joining date
  dateOfExit?: Date; // Exit date, if applicable
  salaryScaleId: string; // References Salary Structures (ObjectId as string)
  shiftId: string; // References Office Shifts (ObjectId as string)
}

export interface IIdentification {
  nationalId: string; // National ID
  passportNumber: string; // Passport number
  taxId: string; // Taxpayer ID
}

export interface IAccountDetails {
  bankAccountName: string; // Account holder's name
  bankAccountNumber: string; // Account number
  bankName: string; // Bank name
  branchName: string; // Branch name
}

export interface IEmployee extends Document {
  _id: string; // Unique identifier for the user (ObjectId as string)
  firstName: string; // First name of the employee
  lastName: string; // Last name of the employee
  email: string; // Email address of the employee
  password: string; // Password
  phone: string; // Phone number of the employee
  dateOfBirth: Date; // Date of birth
  gender: string; // Gender (e.g., Male, Female, Non-Binary)
  address: string; // Residential address
  country: string;
  emergencyContact: IEmergencyContact; // Emergency contact details
  employmentDetails: IEmploymentDetails; // Job-specific information
  identification: IIdentification; // Government-issued IDs
  accountDetails: IAccountDetails; // Bank information for salary payment
  profilePicture: string; // Path to the profile picture
  status: string; // Current status (e.g., Active, Inactive)
  createdAt: Date; // Record creation timestamp
  updatedAt: Date; // Last update timestamp
}
