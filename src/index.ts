import express from "express";
import cors from "cors";
import cron from "node-cron";
import { dbConnect } from "./config/db";
import userRouter from "./routes/user";
import bankAccountRouter from "./routes/bankAccount";
import designationRouter from "./routes/designation";
import departmentRouter from "./routes/department";
import employmentStatusRouter from "./routes/employmentStatus";
import holidayRouter from "./routes/holiday";
import leaveTypeRouter from "./routes/leaveType";
import officeShiftRouter from "./routes/officeShift";
import salaryComponentRouter from "./routes/salaryComponent";
import salaryScaleRouter from "./routes/salaryScale";
import payRollRouter from "./routes/payRoll";
import transectionRouter from "./routes/transection";
import { PayrollService } from "./service/payRoll";
import projectRouter from "./routes/project";
import taskRouter from "./routes/task";
import ticketRouter from "./routes/ticket";
import authenticateToken from "./middleware/auth";

const app = express();
const port = 5500;

app.use(cors());
dbConnect();

console.log("hi")

app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/bankAccount", authenticateToken, bankAccountRouter);
app.use("/api/designation", authenticateToken, designationRouter);
app.use("/api/department", authenticateToken, departmentRouter);
app.use("/api/employmentStatus", authenticateToken, employmentStatusRouter);
app.use("/api/holiday", authenticateToken, holidayRouter);
app.use("/api/leaveType", authenticateToken, leaveTypeRouter);
app.use("/api/officeShift", authenticateToken, officeShiftRouter);
app.use("/api/salaryComponent", authenticateToken, salaryComponentRouter);
app.use("/api/salaryScale", authenticateToken, salaryScaleRouter);
app.use("/api/payRoll", authenticateToken, payRollRouter);
app.use("/api/transection", authenticateToken, transectionRouter);
app.use("/api/project", authenticateToken, projectRouter);
app.use("/api/task", authenticateToken, taskRouter);
app.use("/api/ticket", authenticateToken, ticketRouter);

cron.schedule(
  "0 0 1 * *",
  async () => {
    try {
      console.log("Running payroll generation job...");

      const payrollService = new PayrollService();
      await payrollService.generatePayrollForAllEmployees();
    } catch (error) {
      console.error("Error running payroll job:", error);
    }
  },
  {
    scheduled: true,
  }
);

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening on port ${port}`);
});
