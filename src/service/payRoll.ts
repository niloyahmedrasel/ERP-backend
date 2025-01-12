import { PayRollRepository } from "../repository/payRoll";
import { IPayroll } from "../model/interface/payRoll";
import { Types } from "mongoose";
import { SalaryComponentRepository } from "../repository/salaryComponent";
import { SalaryScaleRepository } from "../repository/salaryScale";
import { EmployeeRepository } from "../repository/user";

const payrollRepository = new PayRollRepository();
const salaryComponentRepository = new SalaryComponentRepository();
const salaryScaleRepository = new SalaryScaleRepository();
const employeeRepository = new EmployeeRepository();

export class PayrollService {
  async createPayroll(
    employeeId: Types.ObjectId,
    salaryScaleId: Types.ObjectId,
    paymentMonth: Date,
    componentsBreakdown: any
  ): Promise<IPayroll> {
      const payrollData = {
        employeeId,
        salaryScaleId,
        paymentMonth,
        componentsBreakdown,
      };

      let grossSalary = 0;
      let totalDeductions = 0;
      let netSalary = 0;

      const employeesalaryScale = await salaryScaleRepository.findById(
        salaryScaleId.toString()
      );

      const employee = await employeeRepository.findById(employeeId.toString());

      console.log(employeesalaryScale);
      if (!employeesalaryScale) {
        throw new Error("Employee salary structure not found");
      }

      if (employeesalaryScale._id.toString() !== employee?.employmentDetails?.salaryScaleId.toString()) {
        throw new Error(
          "Employee salary structure does not belong to the employee"
        );
      }

      for (let i = 0; i < employeesalaryScale.components.length; i++) {
        const componentId = employeesalaryScale.components[i].componentId;
        console.log(componentId, "---kkkkkkkkkk-------------");

        const salaryComponent = await salaryComponentRepository.findById(
          componentId.toString()
        );

        if (!salaryComponent) {
          throw new Error("Salary component not found");
        }

        if (!componentsBreakdown[i]) {
          componentsBreakdown[i] = {};
          componentsBreakdown[i].componentId = salaryComponent._id;
          componentsBreakdown[i].name = employeesalaryScale.components[i].name;
          componentsBreakdown[i].amount =
            employeesalaryScale.components[i].amount;
          componentsBreakdown[i].type = salaryComponent.type;
        }

        if (salaryComponent.type === "Earning") {
          grossSalary += employeesalaryScale.components[i].amount;
        }
        if (salaryComponent.type === "Deduction") {
          totalDeductions += employeesalaryScale.components[i].amount;
        }

        netSalary = grossSalary - totalDeductions;

        console.log(grossSalary, totalDeductions, netSalary);
      }

      const employeePayRoll = await payrollRepository.findOne({
        employeeId: employeeId,
        paymentMonth: paymentMonth, 
      });

      const paymentMonthFormatted = new Date(paymentMonth).toISOString().slice(0, 7); 
      const employeePaymentMonthFormatted = employeePayRoll?.paymentMonth? new Date(employeePayRoll.paymentMonth).toISOString().slice(0, 7): undefined;

      if (paymentMonthFormatted === employeePaymentMonthFormatted) {
       throw new Error("Payroll for this month already exists");
      }

      const payroll = await payrollRepository.create(payrollData);

      if (payroll) {
        payroll.grossSalary = grossSalary;
        payroll.totalDeductions = totalDeductions;
        payroll.netSalary = netSalary;
        await payroll.save();
      }

      return payroll;
    
  }

  async getPayrolls(): Promise<IPayroll[]> {
   
      return await payrollRepository.find({});

  }

  async getPayrollById(id: string): Promise<IPayroll | null> {
    
      return await payrollRepository.findById(id);
    
  }

  async updatePayroll(
    id: string,
    employeeId: Types.ObjectId,
    salaryScaleId: Types.ObjectId,
    paymentMonth: Date,
    componentsBreakdown: any,
    deleteComponent: any,
    addComponent: any,
    editComponent: any
  ): Promise<IPayroll | null> {
    
      let grossSalary = 0;
      let totalDeductions = 0;
      let netSalary = 0;

      const payrollData = await payrollRepository.findById(id);
      console.log(payrollData, "---payrollData---");

      if (!payrollData) {
        throw new Error("Payroll not found");
      }

      console.log(deleteComponent, "---deleteComponent---");
      console.log(
        payrollData.componentsBreakdown,
        "---payrollData.componentsBreakdown---"
      );

      for (let i = 0; i < deleteComponent?.length; i++) {
        payrollData.componentsBreakdown =
          payrollData.componentsBreakdown.filter(
            (component: any) =>
              component.componentId.toString() !==
              deleteComponent[i]?.componentId?.toString()
          );
      }

      for (let i = 0; i < addComponent?.length; i++) {
        const salaryComponent = await salaryComponentRepository.findById(
          addComponent[i]?.componentId
        );
        const salaryScale = await salaryScaleRepository.findById(
          salaryScaleId.toString()
        );
        const salaryScaleComponent = salaryScale?.components.find(
          (component: any) =>
            component.componentId.toString() ===
            addComponent[i]?.componentId.toString()
        );

        if (!salaryComponent) {
          throw new Error("Salary component not found");
        }
        payrollData.componentsBreakdown.push({
          componentId: salaryComponent._id,
          name: salaryComponent.name,
          amount: salaryScaleComponent?.amount ?? 0,
          type: salaryComponent.type,
        });
      }

      for (let i = 0; i < editComponent?.length; i++) {
        const salaryComponent = await salaryComponentRepository.findById(
          editComponent[i]?.componentId
        );
        if (!salaryComponent) {
          throw new Error("Salary component not found");
        }
        payrollData.componentsBreakdown[i].componentId = salaryComponent._id;
        payrollData.componentsBreakdown[i].name = salaryComponent.name;
        payrollData.componentsBreakdown[i].amount = editComponent[i].amount;
        payrollData.componentsBreakdown[i].type = salaryComponent.type;
      }

      for (let j = 0; j < payrollData.componentsBreakdown.length; j++) {
        const component = payrollData.componentsBreakdown[j];

        if (component.type === "Earning") {
          grossSalary += component.amount;
        } else if (component.type === "Deduction") {
          totalDeductions += component.amount;
        }

        netSalary = grossSalary - totalDeductions;
      }

      payrollData.grossSalary = grossSalary;
      payrollData.totalDeductions = totalDeductions;
      payrollData.netSalary = netSalary;

      await payrollData.save();

      return payrollData;
  }

  async deletePayroll(id: string): Promise<Boolean | null> {
    
      const deleted = await payrollRepository.deleteById(id);

      return deleted?true:false;
      
  }

  async generatePayrollForAllEmployees() {
   
      const employees = await employeeRepository.find({});
      for (let employee of employees) {
        const salaryScale = await salaryScaleRepository.findOne({
          employeeId: employee._id,
        });

        if (!salaryScale) {
          console.log(`No salary structure found for employee ${employee._id}`);
          continue;
        }

        const paymentMonth = new Date();
        const componentsBreakdown: {
          componentId: Types.ObjectId;
          name: string;
          amount: number;
          type: string;
        }[] = [];

        await this.createPayroll(
          new Types.ObjectId(employee._id),
          salaryScale._id,
          paymentMonth,
          componentsBreakdown
        );
      }

      console.log("Payroll generation completed for all employees.");
  }
}
