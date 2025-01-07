import { EmployeeRepository } from "../repository/user";
import {
  IEmployee,
  IAddress,
  IEmergencyContact,
  IEmploymentDetails,
  IIdentification,
  IAccountDetails,
} from "../model/interface/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const employeeRepository = new EmployeeRepository();

export class UserService {
 
  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    phone: string,
    dateOfBirth: Date,
    gender: string,
    address: IAddress,
    emergencyContact: IEmergencyContact,
    employmentDetails: IEmploymentDetails,
    identification: IIdentification,
    accountDetails: IAccountDetails,
    profilePicture: string,
    status: string
  ): Promise<IEmployee> {
    try {
      
      const employee = await employeeRepository.create({
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
      });

      return employee;
    } catch (error) {
      console.error("Error creating user: ", error);
      throw new Error("Error creating user: ");
    }
  }

  async getUserById(userId: string): Promise<IEmployee | null> {
    try {
    
      const user = await employeeRepository.findById(userId);
      return user;
    } catch (error) {
      throw new Error("Error fetching user: ");
    }
  }


  async updateUser(userId: string, updatedUserData: any): Promise<IEmployee | null> {
    try {
      
      const updatedUser = await employeeRepository.findOneAndUpdate(
        { _id: userId },  
        updatedUserData
      );
      return updatedUser;
    } catch (error) {
      throw new Error("Error updating user");
    }
}


  async deleteUser(userId: string): Promise<IEmployee | null> {
    try {
     
      const deletedUser = await employeeRepository.deleteById(userId);
      return deletedUser;
    } catch (error) {
      throw new Error("Error deleting user: ");
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
