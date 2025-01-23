import express from "express";
import cors from "cors";
import cron from "node-cron";
import path from "path";
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

app.use(express.json());

app.use("/upload", express.static(path.join(__dirname, "../public/upload")));

app.use("/api/users", userRouter);
app.use("/api/bank-accounts", authenticateToken, bankAccountRouter);
app.use("/api/designations", authenticateToken, designationRouter);
app.use("/api/departments", authenticateToken, departmentRouter);
app.use("/api/employment-statuses", authenticateToken, employmentStatusRouter);
app.use("/api/holidays", authenticateToken, holidayRouter);
app.use("/api/leave-types", authenticateToken, leaveTypeRouter);
app.use("/api/office-shifts", authenticateToken, officeShiftRouter);
app.use("/api/salary-components", authenticateToken, salaryComponentRouter);
app.use("/api/salary-scales", authenticateToken, salaryScaleRouter);
app.use("/api/payrolls", authenticateToken, payRollRouter);
app.use("/api/transections", authenticateToken, transectionRouter);
app.use("/api/projects", authenticateToken, projectRouter);
app.use("/api/tasks", authenticateToken, taskRouter);
app.use("/api/tickets", authenticateToken, ticketRouter);

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
