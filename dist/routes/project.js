"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_1 = require("../controller/project");
const router = express_1.default.Router();
router.post("/create", new project_1.ProjectController().createProject);
router.post("/milestone/:projectId", new project_1.ProjectController().createMileStone);
exports.default = router;
