"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const employeeSchema = new mongoose_1.Schema({
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
        street: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    emergencyContact: {
        name: { type: String, required: true },
        relation: { type: String, required: true },
        phone: { type: String, required: true },
        email: { type: String, required: true },
    },
    employmentDetails: {
        designationId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Designation",
            required: true,
        },
        departmentId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Department",
            required: true,
        },
        employmentStatusId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "EmploymentStatus",
            required: true,
        },
        dateOfJoining: { type: Date, required: true },
        dateOfExit: { type: Date },
        salaryScaleId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "salaryScale",
            required: true,
        },
        shiftId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Shift", required: true },
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
        ifscCode: { type: String, required: true },
    },
    profilePicture: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
// Create and export the model
const EmployeeModel = mongoose_1.default.model("Employee", employeeSchema);
exports.default = EmployeeModel;
