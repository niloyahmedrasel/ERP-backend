import { Request, Response } from "express";
import { IEmployee } from "../model/interface/user";
import { UserService } from "../service/user";
import bcrypt from "bcrypt";
import { AppError } from "../utils/appError";
import path from "path";

const userService = new UserService();

export class UserController {

  async createUser(req: Request, res: Response): Promise<any> {
    console.log(req.body);
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        dateOfBirth,
        gender,
        status,
        address,
        country
      } = req.body;
  
      const profilePicture = req.file && req.file.originalname;
  
      if (!profilePicture) {
        return res
          .status(400)
          .json({ errorCode: 1001, message: "Profile Picture is required." });
      }
  
      const emergencyContact = JSON.parse(req.body.emergencyContact || "{}");
      const employmentDetails = JSON.parse(req.body.employmentDetails || "{}");
      const identification = JSON.parse(req.body.identification || "{}");
      const accountDetails = JSON.parse(req.body.accountDetails || "{}");
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const employee: IEmployee = await userService.createUser(
        firstName,
        lastName,
        email,
        hashedPassword,
        phone,
        dateOfBirth,
        gender,
        address,
        country,
        emergencyContact,
        employmentDetails,
        identification,
        accountDetails,
        profilePicture,
        status
      );
  
      res.status(201).json({
        status: true,
        message: "User created successfully",
        data: employee,
      });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";
  
      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
  

  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({status: false, message: "User not found" });
        return;
      }
      res.status(200).json({status: true, message: "User fetched successfully", data: user });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json({status: true, message: "Users fetched successfully", data: users });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError? error.message: "An unexpected error occurred";
      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
  async updateUser(req: Request, res: Response): Promise<any> {
    try {
      const userId = req.params.id;
      const updatedUser = { ...req.body };

      if (updatedUser.emergencyContact) {
        try {
          updatedUser.emergencyContact = JSON.parse(updatedUser.emergencyContact);
        } catch (err) {
          return res.status(400).json({
            status: false,
            message: "Invalid JSON format for emergencyContact field.",
          });
        }
      }

      if (updatedUser.employmentDetails) {
        try {
          updatedUser.employmentDetails = JSON.parse(updatedUser.employmentDetails);
        } catch (err) {
          return res.status(400).json({
            status: false,
            message: "Invalid JSON format for employmentDetails field.",
          });
        }
      }

      if (updatedUser.identification) {
        try {
          updatedUser.identification = JSON.parse(updatedUser.identification);
        } catch (err) {
          return res.status(400).json({
            status: false,
            message: "Invalid JSON format for identification field.",
          });
        }
      }

      if (updatedUser.accountDetails) {
        try {
          updatedUser.accountDetails = JSON.parse(updatedUser.accountDetails);
        } catch (err) {
          return res.status(400).json({
            status: false,
            message: "Invalid JSON format for accountDetails field.",
          });
        }
      }

      if (req.file) {
        updatedUser.profilePicture = path.basename(req.file.path);
      }

      const user = await userService.updateUser(userId, updatedUser);
      if (!user) {
        res.status(404).json({status: false, message: "User not found" });
        return;
      }

      res.status(200).json({
        status: true,
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  // Delete User
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.deleteUser(userId);
      if (!deletedUser) {
        res.status(404).json({status: false, message: "User not found" });
        return;
      }

      res.status(200).json({
        status: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if (!user) {
        res.status(404).json({status: false, message: "User not found" });
        return;
      }
      res.status(200).json({ data: user });
    } catch (error) {
      console.log(error);
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
