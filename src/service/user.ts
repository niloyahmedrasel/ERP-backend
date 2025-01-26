import { EmployeeRepository } from "../repository/user";
import {
  IEmployee,
  IEmergencyContact,
  IEmploymentDetails,
  IIdentification,
  IAccountDetails,
} from "../model/interface/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
const employeeRepository = new EmployeeRepository();

export class UserService {

  private async generateId(): Promise<string> {
    // Get the current year (last two digits)
    const currentYear = new Date().getFullYear() % 100;  // Get last two digits of the year (e.g., 2025 -> 25)

    // Find the highest ID from users in the current year (sorting by ID in descending order)
    const highestUser = (await employeeRepository.find({
      id: { $regex: `^${String(currentYear).padStart(2, '0')}` }  // Match IDs starting with the current year
    }))
    .sort((a, b) => b.id.localeCompare(a.id))  // Sort by ID in descending order to get the most recent
    .slice(0, 1)  // Limit to 1 to get only the highest ID
    .map(user => user.id);  // Only select the 'id' field for efficiency

    // If no user exists for the current year, start from 0001
    let newSequentialId = highestUser.length > 0 ? parseInt(highestUser[0].substring(2)) + 1 : 1;

    // Format the sequential ID as a 4-digit string
    const sequentialId = String(newSequentialId).padStart(4, '0');

    // Return the full ID: "YYSSSS" (e.g., "250001" for the first user in 2025)
    return `${String(currentYear).padStart(2, '0')}${sequentialId}`;
  }
 
  async createUser(
    fullName: string,
    email: string,
    password: string,
    phone: string,
    dateOfBirth: Date,
    gender: string,
    address: string,
    country:string,
    emergencyContact: IEmergencyContact,
    employmentDetails: IEmploymentDetails,
    identification: IIdentification,
    accountDetails: IAccountDetails,
    profilePicture: string,
    status: string
  ): Promise<IEmployee> {
    
      const id =await this.generateId();
      const employee = await employeeRepository.create({
        id,
        fullName,
        email,
        password,
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
        status,
      });

      if(!employee){
        throw new AppError("user not created", 400)
      }
      console.log("user----------------------", employee)
      return employee;
    
  }

  async getUserById(userId: string): Promise<IEmployee | null> {
    try {
    
      const user = await employeeRepository.findById(userId);
      return user;
    } catch (error) {
      throw new AppError("user not found",200);
    }
  }

  async getAllUsers(): Promise<IEmployee[]> {
     return await employeeRepository.find({});
  }

  async updateUser(userId: string, updatedUserData: any): Promise<IEmployee | null> {
    try {
      
      const updatedUser = await employeeRepository.findOneAndUpdate(
        { _id: userId },  
        updatedUserData
      );
      return updatedUser;
    } catch (error) {
      throw new AppError("user not updated", 400);
    }
}


  async deleteUser(userId: string): Promise<IEmployee | null> {
    try {
     
      const deletedUser = await employeeRepository.deleteById(userId);
      return deletedUser;
    } catch (error) {
      throw new AppError("user not found",200);
    }
  }

  async login(email: string, password: string) {
  
      const user = await employeeRepository.findOne({email:email});
      if (user && (await bcrypt.compare(password, user.password))) {

        const token = jwt.sign({ id: user._id }, "secret", {
          expiresIn: "1d",
        });
        return { user, token };
      }
      return null;
}

}
