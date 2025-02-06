// service/salaryScaleService.ts
import { SalaryScaleRepository } from "../repository/salaryScale";
import { IsalaryScale } from "../model/interface/salaryScale";
import { Types } from "mongoose";
import { SalaryComponentRepository } from "../repository/salaryComponent";
import { AppError } from "../utils/appError";

const salaryScaleRepository = new SalaryScaleRepository();
const salaryComponentRepository = new SalaryComponentRepository();

export class SalaryScaleService {
  async createsalaryScale(
    title: string,
    components: Array<{
      componentId: Types.ObjectId;
      name: string;
      type:string;
      amount: number;
    }>,
    description: string
  ): Promise<IsalaryScale> {
    let totalDeductions = 0;
    let totalEarnings = 0;
    let netSalary = 0;
      for(let i =0; i<components.length;i++) {
        const salaryComponent = await salaryComponentRepository.findById(components[i].componentId.toString());
        if(!salaryComponent) {
          throw new AppError("Salary component not found",200);
        }
        console.log(salaryComponent);
        components[i].name = salaryComponent.name;
        components[i].type = salaryComponent.type;
        if(components[i].type === "Deduction") {
          totalDeductions += components[i].amount;
        }
        if(components[i].type === "Earning") {
          totalEarnings += components[i].amount;
        }
        netSalary = totalEarnings - totalDeductions;
      }
      const salaryScale = await salaryScaleRepository.create({
        title,
        components,
        description,
      });
      if(salaryScale){
        salaryScale.totalDeductions = totalDeductions;
        salaryScale.totalEarnings = totalEarnings;
        salaryScale.netSalary = netSalary;
        await salaryScale.save();
      }
      return salaryScale;
  }

  async getsalaryScales(): Promise<IsalaryScale[]> {
    try {
      return await salaryScaleRepository.find({});
    } catch (error) {
      throw new Error("Error fetching salary structures");
    }
  }

  async getsalaryScaleById(id: string): Promise<IsalaryScale | null> {
    try {
      return await salaryScaleRepository.findById(id);
    } catch (error) {
      throw new Error("Error fetching salary structure by ID");
    }
  }

  async updatesalaryScale(
    id: string,
    title: string,
    components: Array<{
      componentId: Types.ObjectId;
      amount: number;
    }>,
    description: string
  ): Promise<IsalaryScale | null> {
    try {
      let totalDeductions = 0;
      let totalEarnings = 0;
      let netSalary = 0;
  
      const existingSalaryScale = await salaryScaleRepository.findOne({ _id: id });
      if (!existingSalaryScale) {
        throw new Error("Salary scale not found");
      }
  
      const updatedComponents = await Promise.all(components.map(async (component) => {
        const existingComponent = existingSalaryScale.components.find(c => c.componentId.toString() === component.componentId.toString());
  
        if (existingComponent) {
  
          const updatedComponent = {
            componentId: component.componentId,
            name: existingComponent.name,
            type: existingComponent.type,
            amount: component.amount
          };
  
          if (updatedComponent.type === "Deduction") {
            totalDeductions += updatedComponent.amount;
          }
          if (updatedComponent.type === "Earning") {
            totalEarnings += updatedComponent.amount;
          }
  
          return updatedComponent;
        } else {
          
          const componentData = await salaryComponentRepository.findOne({ _id: component.componentId });
  
          if (componentData) {
          
            const newComponent = {
              componentId: component.componentId,
              name: componentData.name,
              type: componentData.type,
              amount: component.amount
            };
  
        
            if (newComponent.type === "Deduction") {
              totalDeductions += newComponent.amount;
            }
            if (newComponent.type === "Earning") {
              totalEarnings += newComponent.amount;
            }
  
            return newComponent;
          } else {
            throw new Error(`Component with ID ${component.componentId} not found`);
          }
        }
      }));
  
   
      netSalary = totalEarnings - totalDeductions;
  
   
      const updatedSalaryScale = await salaryScaleRepository.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            title,
            description,
            components: updatedComponents, 
            totalDeductions,
            totalEarnings,
            netSalary
          }
        } as any
      );
  
      return updatedSalaryScale;
  
    } catch (error) {
      console.error("Error updating salary structure", error);
      throw new Error("Error updating salary structure");
    }
  }
  
  
  
  async deletesalaryScale(id: string): Promise<void> {
    try {
      await salaryScaleRepository.deleteById(id);
    } catch (error) {
      throw new Error("Error deleting salary structure");
    }
  }
}
