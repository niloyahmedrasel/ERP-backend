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
exports.UserController = void 0;
const user_1 = require("../service/user");
const userService = new user_1.UserService();
class UserController {
    // Create User
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact, employmentDetails, identification, accountDetails, profilePicture, status, } = req.body;
                const employee = yield userService.createUser(firstName, lastName, email, phone, dateOfBirth, gender, address, emergencyContact, employmentDetails, identification, accountDetails, profilePicture, status);
                res.status(201).json({
                    message: "User created successfully",
                    data: employee,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Error creating user",
                });
            }
        });
    }
    // Get User by ID
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const user = yield userService.getUserById(userId);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({ data: user });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching user" });
            }
        });
    }
    // Update User
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id; // Get the userId from request parameters
                const updatedUser = req.body; // Get the updated data from request body
                const user = yield userService.updateUser(userId, updatedUser);
                if (!user) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({
                    message: "User updated successfully",
                    data: user,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Error updating user"
                });
            }
        });
    }
    // Delete User
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.params.id;
                const deletedUser = yield userService.deleteUser(userId);
                if (!deletedUser) {
                    res.status(404).json({ message: "User not found" });
                    return;
                }
                res.status(200).json({
                    message: "User deleted successfully",
                    data: deletedUser,
                });
            }
            catch (error) {
                res.status(500).json({
                    message: "Error deleting user"
                });
            }
        });
    }
}
exports.UserController = UserController;
