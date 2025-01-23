import express from "express";
import { ProjectController } from "../controller/project";
import authenticateToken from "../middleware/auth";
const router = express.Router();

router.post("/",authenticateToken, new ProjectController().createProject);
router.post("/milestone/:projectId",authenticateToken, new ProjectController().createMileStone);
router.get("/",authenticateToken, new ProjectController().getProjects);
router.get("/:projectId",authenticateToken, new ProjectController().getSingleProject);
router.put("/:projectId",authenticateToken, new ProjectController().updateProject);
router.delete("/:projectId",authenticateToken, new ProjectController().deleteProject);

export default router;