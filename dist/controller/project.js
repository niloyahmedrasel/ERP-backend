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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const project_1 = require("../service/project");
const projectService = new project_1.ProjectService();
class ProjectController {
    createProject(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, startDate, endDate, status, } = req.body;
                const response = yield projectService.createProject(name, description, startDate, endDate, status);
                res.status(200).json({ data: response });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
    createMileStone(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const projectId = req.params.projectId;
                const { title, dueDate } = req.body;
                console.log(projectId, title, dueDate, "-------------");
                const response = yield projectService.createMileStone(projectId, title, dueDate);
                res.status(200).json({ data: response });
            }
            catch (error) {
                res.status(500).json({ message: error });
            }
        });
    }
}
exports.ProjectController = ProjectController;
