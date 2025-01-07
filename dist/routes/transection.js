"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transection_1 = require("../controller/transection");
const validate_1 = __importDefault(require("../middleware/validate"));
const transection_2 = __importDefault(require("../validation/transection"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(transection_2.default), new transection_1.TransactionController().createTransaction);
router.get("/", new transection_1.TransactionController().getTransactions);
router.get("/:id", new transection_1.TransactionController().getTransactionById);
router.put("/update/:id", (0, validate_1.default)(transection_2.default), new transection_1.TransactionController().updateTransaction);
router.delete("/:id", new transection_1.TransactionController().deleteTransaction);
exports.default = router;
