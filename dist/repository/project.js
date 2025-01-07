"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectRepository = void 0;
const Project_1 = __importDefault(require("../model/Project"));
const baseRepository_1 = require("./baseRepository");
class ProjectRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(Project_1.default);
    }
}
exports.ProjectRepository = ProjectRepository;
