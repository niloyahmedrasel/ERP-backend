import { Request, Response } from "express";
import { IEmployee } from "../model/interface/user";
import { UserService } from "../service/user";
import bcrypt from "bcrypt";

const userService = new UserService();

export class UserController {
  
  // Create User
  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
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
      } = req.body;

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
        emergencyContact,
        employmentDetails,
        identification,
        accountDetails,
        profilePicture,
        status
      );

      res.status(201).json({
        message: "User created successfully",
        data: employee,
      });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  // Get User by ID
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const user = await userService.getUserById(userId);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  // Update User
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;  // Get the userId from request parameters
      const updatedUser = req.body;  // Get the updated data from request body

      const user = await userService.updateUser(userId, updatedUser);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User updated successfully",
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error updating user"
      });
    }
}


  // Delete User
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.params.id;
      const deletedUser = await userService.deleteUser(userId);
      if (!deletedUser) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      res.status(500).json({
        message: "Error deleting user"
      });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try{
      const { email, password } = req.body;
      const user = await userService.login(email, password);
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }
      res.status(200).json({ data: user });
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  }

  
}
