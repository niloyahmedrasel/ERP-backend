"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayRollRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const payRoll_1 = __importDefault(require("../model/payRoll"));
class PayRollRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(payRoll_1.default);
    }
}
exports.PayRollRepository = PayRollRepository;
