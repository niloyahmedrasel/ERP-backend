"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskRepository = void 0;
const task_1 = __importDefault(require("../model/task"));
const baseRepository_1 = require("./baseRepository");
class TaskRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(task_1.default);
    }
}
exports.TaskRepository = TaskRepository;
