"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const designation_1 = require("../controller/designation");
const validate_1 = __importDefault(require("../middleware/validate"));
const designation_2 = __importDefault(require("../validation/designation"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(designation_2.default), new designation_1.DesignationController().createDesignation);
router.get("/:id", new designation_1.DesignationController().getDesignationById);
router.get("/", new designation_1.DesignationController().getAllDesignations);
router.put("/update/:id", (0, validate_1.default)(designation_2.default), new designation_1.DesignationController().updateDesignation);
router.delete("/:id", new designation_1.DesignationController().deleteDesignation);
router.delete("/", new designation_1.DesignationController().deleteDesignations);
exports.default = router;
