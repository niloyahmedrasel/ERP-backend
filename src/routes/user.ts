import express from "express";
const router = express.Router();
import { UserController } from "../controller/user";
import validate from "../middleware/validate";
import employeeValidationSchema from "../validation/user";
import authenticateToken from "../middleware/auth";

router.post("/create",validate(employeeValidationSchema), new UserController().createUser);
router.get("/:id",authenticateToken, new UserController().getUser);
router.get("/",authenticateToken, new UserController().getAllUsers);
router.put("/update/:id",authenticateToken,validate(employeeValidationSchema), new UserController().updateUser);
router.delete("/:id",authenticateToken, new UserController().deleteUser);
router.post("/login", new UserController().login);

export default router;
