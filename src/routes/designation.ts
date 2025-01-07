import express from "express";
import { DesignationController } from "../controller/designation";
import validate from "../middleware/validate";
import designationSchema from "../validation/designation";
import { valid } from "joi";

const router = express.Router();

router.post("/create",validate(designationSchema), new DesignationController().createDesignation);
router.get("/:id", new DesignationController().getDesignationById);
router.get("/", new DesignationController().getAllDesignations);
router.put("/update/:id",validate(designationSchema), new DesignationController().updateDesignation);
router.delete("/:id", new DesignationController().deleteDesignation);
router.delete("/", new DesignationController().deleteDesignations);

export default router;