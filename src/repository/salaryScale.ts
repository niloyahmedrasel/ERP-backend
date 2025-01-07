import { baseRepository } from "./baseRepository";
import salaryScale from "../model/salaryScale";
import { IsalaryScale } from "../model/interface/salaryScale";

export class SalaryScaleRepository extends baseRepository<IsalaryScale> {
  constructor() {
    super(salaryScale);
  }
}
