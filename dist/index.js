"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_cron_1 = __importDefault(require("node-cron"));
const db_1 = require("./config/db");
const user_1 = __importDefault(require("./routes/user"));
const bankAccount_1 = __importDefault(require("./routes/bankAccount"));
const designation_1 = __importDefault(require("./routes/designation"));
const department_1 = __importDefault(require("./routes/department"));
const employmentStatus_1 = __importDefault(require("./routes/employmentStatus"));
const holiday_1 = __importDefault(require("./routes/holiday"));
const leaveType_1 = __importDefault(require("./routes/leaveType"));
const officeShift_1 = __importDefault(require("./routes/officeShift"));
const salaryComponent_1 = __importDefault(require("./routes/salaryComponent"));
const salaryScale_1 = __importDefault(require("./routes/salaryScale"));
const payRoll_1 = __importDefault(require("./routes/payRoll"));
const transection_1 = __importDefault(require("./routes/transection"));
const payRoll_2 = require("./service/payRoll");
const project_1 = __importDefault(require("./routes/project"));
const app = (0, express_1.default)();
const port = 5500;
app.use((0, cors_1.default)());
(0, db_1.dbConnect)();
app.use(express_1.default.json());
app.use("/api/user", user_1.default);
app.use("/api/bankAccount", bankAccount_1.default);
app.use("/api/designation", designation_1.default);
app.use("/api/department", department_1.default);
app.use("/api/employmentStatus", employmentStatus_1.default);
app.use("/api/holiday", holiday_1.default);
app.use("/api/leaveType", leaveType_1.default);
app.use("/api/officeShift", officeShift_1.default);
app.use("/api/salaryComponent", salaryComponent_1.default);
app.use("/api/salaryScale", salaryScale_1.default);
app.use("/api/payRoll", payRoll_1.default);
app.use("/api/transection", transection_1.default);
app.use("/api/project", project_1.default);
node_cron_1.default.schedule("0 0 1 * *", () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Running payroll generation job...");
        const payrollService = new payRoll_2.PayrollService();
        yield payrollService.generatePayrollForAllEmployees();
    }
    catch (error) {
        console.error("Error running payroll job:", error);
    }
}), {
    scheduled: true,
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
