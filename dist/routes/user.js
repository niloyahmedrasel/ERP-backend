"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const user_1 = require("../controller/user");
const validate_1 = __importDefault(require("../middleware/validate"));
const user_2 = __importDefault(require("../validation/user"));
router.post("/create", (0, validate_1.default)(user_2.default), new user_1.UserController().createUser);
router.get("/:id", new user_1.UserController().getUser);
router.put("/update/:id", (0, validate_1.default)(user_2.default), new user_1.UserController().updateUser);
router.delete("/:id", new user_1.UserController().deleteUser);
exports.default = router;
