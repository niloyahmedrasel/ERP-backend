import express from "express";
import { ProjectController } from "../controller/project";
const router = express.Router();

router.post("/create", new ProjectController().createProject);
router.post("/milestone/:projectId", new ProjectController().createMileStone);
router.get("/", new ProjectController().getProjects);
router.get("/:projectId", new ProjectController().getSingleProject);
router.put("/update/:projectId", new ProjectController().updateProject);
router.delete("/delete/:projectId", new ProjectController().deleteProject);

export default router;