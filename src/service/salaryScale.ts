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
      amount: number;
    }>,
    description: string
  ): Promise<IsalaryScale> {
      for(let i =0; i<components.length;i++) {
        const salaryComponent = await salaryComponentRepository.findById(components[i].componentId.toString());
        if(!salaryComponent) {
          throw new AppError("Salary component not found",200);
        }
        console.log(salaryComponent);
        components[i].name = salaryComponent.name;
      }
      const salaryScale = await salaryScaleRepository.create({
        title,
        components,
        description,
      });
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
      name: string;
      amount: number;
    }>,
    description: string
  ): Promise<IsalaryScale | null> {
    try {
      const updatedsalaryScale = await salaryScaleRepository.findOneAndUpdate(
        { _id: id },
        { title, components, description }
      );
      return updatedsalaryScale;
    } catch (error) {
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
