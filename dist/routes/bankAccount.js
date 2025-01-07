"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bankAccount_1 = require("../controller/bankAccount");
const validate_1 = __importDefault(require("../middleware/validate"));
const bankAccount_2 = __importDefault(require("../validation/bankAccount"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(bankAccount_2.default), new bankAccount_1.BankAccountController().createAccount);
router.get("/:accountNumber", new bankAccount_1.BankAccountController().getAccount);
router.put("/update/:accountNumber", (0, validate_1.default)(bankAccount_2.default), new bankAccount_1.BankAccountController().updateAccount);
router.delete("/:accountNumber", new bankAccount_1.BankAccountController().deleteAccount);
exports.default = router;
