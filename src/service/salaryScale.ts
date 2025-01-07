// service/salaryScaleService.ts
import { SalaryScaleRepository } from "../repository/salaryScale";
import { IsalaryScale } from "../model/interface/salaryScale";
import { Types } from "mongoose";

const salaryScaleRepository = new SalaryScaleRepository();

export class SalaryScaleService {
  async createsalaryScale(
    title: string,
    employeeId: Types.ObjectId,
    components: Array<{
      componentId: Types.ObjectId;
      name: string;
      amount: number;
    }>,
    description: string
  ): Promise<IsalaryScale> {
    try {
      const salaryScale = await salaryScaleRepository.create({
        title,
        employeeId,
        components,
        description,
      });
      return salaryScale;
    } catch (error) {
      throw new Error("Error creating salary structure");
    }
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
    employeeId: Types.ObjectId,
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
        { title, employeeId, components, description }
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
