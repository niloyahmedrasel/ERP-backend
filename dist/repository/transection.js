"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const transection_1 = __importDefault(require("../model/transection"));
class TransactionRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(transection_1.default);
    }
}
exports.TransactionRepository = TransactionRepository;
