"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_1 = require("../repository/user");
const employeeRepository = new user_1.EmployeeRepository();
class UserService {
    // Create User
    createUser(firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact, employmentDetails, identification, accountDetails, profilePicture, status) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a new employee record in the repository
                const employee = yield employeeRepository.create({
                    firstName,
                    lastName,
                    email,
                    phone,
                    dateOfBirth,
                    gender,
                    address,
                    emergencyContact,
                    employmentDetails,
                    identification,
                    accountDetails,
                    profilePicture,
                    status,
                });
                return employee;
            }
            catch (error) {
                console.error("Error creating user: ", error);
                throw new Error("Error creating user: ");
            }
        });
    }
    // Get User by ID
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Fetch the user by ID
                const user = yield employeeRepository.findById(userId);
                return user;
            }
            catch (error) {
                throw new Error("Error fetching user: ");
            }
        });
    }
    // Update User
    updateUser(userId, updatedUserData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Update the user details based on the user ID, using _id as the filter
                const updatedUser = yield employeeRepository.findOneAndUpdate({ _id: userId }, // Correctly specify the filter object
                updatedUserData);
                return updatedUser;
            }
            catch (error) {
                throw new Error("Error updating user");
            }
        });
    }
    // Delete User
    deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Delete the user by their ID
                const deletedUser = yield employeeRepository.deleteById(userId);
                return deletedUser;
            }
            catch (error) {
                throw new Error("Error deleting user: ");
            }
        });
    }
}
exports.UserService = UserService;
