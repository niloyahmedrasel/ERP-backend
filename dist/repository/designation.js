"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DesignationRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const designation_1 = __importDefault(require("../model/designation"));
class DesignationRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(designation_1.default);
    }
}
exports.DesignationRepository = DesignationRepository;
