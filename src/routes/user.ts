import express from "express";
const router = express.Router();
import { UserController } from "../controller/user";
import validate from "../middleware/validate";
import employeeValidationSchema from "../validation/user";
import authenticateToken from "../middleware/auth";
import upload from "../middleware/uploadMediaFiles";

// validate(employeeValidationSchema)
router.post("/create",upload.single("profilePicture"),  new UserController().createUser);
router.get("/:id",authenticateToken, new UserController().getUser);
router.get("/",authenticateToken, new UserController().getAllUsers);
router.put("/update/:id",upload.single("profilePicture"), authenticateToken, new UserController().updateUser);
router.delete("/:id",authenticateToken, new UserController().deleteUser);
router.post("/login", new UserController().login);

export default router;

