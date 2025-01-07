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
exports.ProjectService = void 0;
const project_1 = require("../repository/project");
const projectRepository = new project_1.ProjectRepository();
class ProjectService {
    createProject(name, description, startDate, endDate, status) {
        return __awaiter(this, void 0, void 0, function* () {
            const project = {
                name,
                description,
                startDate,
                endDate,
                status
            };
            const result = yield projectRepository.create(project);
            if (!result)
                throw new Error("Project creation failed");
            return result;
        });
    }
    createMileStone(projectId, title, dueDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield projectRepository.findById(projectId);
            console.log("service", result);
            if (!result)
                throw new Error("Project not found");
            const milestone = yield projectRepository.findOneAndUpdate({ _id: projectId }, { $push: { milestone: { title, dueDate } } });
            if (!milestone)
                throw new Error("Milestone creation failed");
            return result;
        });
    }
}
exports.ProjectService = ProjectService;
