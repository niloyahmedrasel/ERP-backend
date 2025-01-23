import express from "express";
import { DesignationController } from "../controller/designation";
import validate from "../middleware/validate";
import designationSchema from "../validation/designation";
import { valid } from "joi";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken, validate(designationSchema), new DesignationController().createDesignation);
router.get("/:id",authenticateToken, new DesignationController().getDesignationById);
router.get("/",authenticateToken, new DesignationController().getAllDesignations);
router.put("/:id",authenticateToken, validate(designationSchema), new DesignationController().updateDesignation);
router.delete("/:id",authenticateToken, new DesignationController().deleteDesignation);
router.delete("/",authenticateToken, new DesignationController().deleteDesignations);

export default router;