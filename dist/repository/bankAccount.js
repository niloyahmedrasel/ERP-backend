"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const bankAccount_1 = __importDefault(require("../model/bankAccount"));
class BankAccountRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(bankAccount_1.default);
    }
}
exports.BankAccountRepository = BankAccountRepository;
